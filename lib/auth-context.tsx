"use client";

import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/users";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    email: string,
    password: string,
    keepLoggedIn: boolean
  ) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedKeepLoggedIn = localStorage.getItem("keepLoggedIn") === "true";

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setKeepLoggedIn(storedKeepLoggedIn);
    }

    setLoading(false);
  }, []);

  // Set up inactivity timer
  useEffect(() => {
    if (user && !keepLoggedIn) {
      resetInactivityTimer();

      const events = [
        "mousedown",
        "mousemove",
        "keypress",
        "scroll",
        "touchstart",
      ];

      const resetTimer = () => {
        resetInactivityTimer();
      };

      events.forEach((event) => {
        window.addEventListener(event, resetTimer);
      });

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }

        events.forEach((event) => {
          window.removeEventListener(event, resetTimer);
        });
      };
    }
  }, [user, keepLoggedIn]);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      if (!keepLoggedIn) {
        logout();
        toast({
          title: "Session expired",
          description: "You have been logged out due to inactivity",
        });
      }
    }, 60000);

  };

  const login = async (
    email: string,
    password: string,
    keepUserLoggedIn: boolean
  ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data?.success) {
        toast({
          title: "Login failed",
          description: data?.message || "Invalid email or password",
          variant: "destructive",
        });
        return;
      }
      const user = data?.data;
      setUser(user);
      setKeepLoggedIn(keepUserLoggedIn);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("keepLoggedIn", keepUserLoggedIn.toString());
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!data?.success) {
        toast({
          title: "Registration failed",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Registration successful",
        description: data.message,
      });

      router.push("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An unexpected error occurred",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });
      setUser(null);
      setKeepLoggedIn(false);
      localStorage.removeItem("user");
      localStorage.removeItem("keepLoggedIn");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
