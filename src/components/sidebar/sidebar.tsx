"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarHeader } from "./sidebar-header";
import { SidebarNavigation } from "./sidebar-navigation";
import { SidebarFooter } from "./sidebar-footer";
import { useEffect } from "react";
import { SidebarOverlay } from "./sidebar-overlay";

export function Sidebar() {
  const { isExpanded, isMobile, setIsMobile } = useSidebar();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 700);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  const sidebarVariants = {
    expanded: { width: isMobile ? "16rem" : "200px" },
    collapsed: { width: isMobile ? "0px" : "60px" },
  };

  return (
    <>
      {isMobile && <SidebarOverlay />}
      <motion.aside
        className={cn(
          "bg-sidebar-bg flex h-screen flex-col overflow-hidden dark:bg-dark-sidebar-bg ",
          isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"
        )}
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <SidebarHeader />
        <SidebarNavigation />
        <SidebarFooter />
      </motion.aside>
    </>
  );
}