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
                <div className="flex h-screen bg-sidebar-bg dark:bg-dark-sidebar-bg">
                    <Sidebar />
                    <motion.div
                        className="flex flex-1 flex-col px-1"
                        transition={{ duration: 0.3 }}
                    >
                        <div className="h-2" />
                        <main className="relative flex-1 overflow-y-auto overflow-x-hidden rounded-3xl bg-background p-2 shadow-xl">
                            <div className="relative min-h-full">
                                <div
                                    className="absolute inset-0 rounded-3xl"
                                    style={{
                                        backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.2) 1.5px, transparent 1px)`,
                                        backgroundSize: "25px 25px",
                                        zIndex: 0,
                                    }}
                                    aria-hidden="true"
                                />
                                <div className="relative z-10">
                                    <div className="sticky top-0 z-20 mb-2">
                                        <SidebarToggle />
                                    </div>
                                    {children}
                                </div>
                            </div>
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