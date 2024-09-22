"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()

    return (
      <motion.button
        className="rounded-md transition-all duration-200 p-2 z-10"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
          <Sun className="h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors duration-200 dark:hidden" />
          <Moon className="hidden h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors duration-200 dark:block" />
          <span className="sr-only">Toggle theme</span>
      </motion.button>
    )
}