"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="flex items-center fixed bottom-4 right-4 p-2 rounded-full shadow-md 
             bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-blue-500" />
        )}
      </Button>
    </div>
  );
}
