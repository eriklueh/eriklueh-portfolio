"use client";

import { motion } from "framer-motion";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarOverlay() {
  const { isExpanded, setIsExpanded } = useSidebar();

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-40 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExpanded ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsExpanded(false)}
      style={{ pointerEvents: isExpanded ? "auto" : "none" }}
    />
  );
}