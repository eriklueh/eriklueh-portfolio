"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { LanguageProvider } from "@/lib/lenguage-context";
import StyledToaster from "@/components/common/styled-toaster";
import { SidebarToggle } from "@/components/common/sidebar-toggle";
import { Sidebar } from "@/components/sidebar/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  const { isExpanded } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <html lang="es">
    <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <div className="flex h-screen bg-sidebar-bg dark:bg-background">
          <Sidebar />
          <motion.div
            className="flex flex-1 flex-col px-1"
            transition={{ duration: 0.3 }}
          >
            <div className="h-2" />
            <main className="relative flex-1 overflow-y-auto overflow-x-hidden rounded-3xl bg-background p-6 shadow-xl border-2">
              <SidebarToggle />
              {children}
            </main>
            <div className="h-2" />
          </motion.div>
        </div>
        <StyledToaster />
      </LanguageProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}