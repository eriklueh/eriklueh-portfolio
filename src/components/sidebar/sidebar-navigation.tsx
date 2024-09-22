"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Home, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslations";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarNavigation() {
  const { isExpanded } = useSidebar();
  const [activeItem, setActiveItem] = useState("/");
  const { t } = useTranslation();

  const navItems = [
    { icon: Home, label: t("nav.home"), href: "/" },
    { icon: User, label: t("nav.about"), href: "/about" },
    { icon: Briefcase, label: t("nav.projects"), href: "/projects" },
    { icon: Mail, label: t("nav.contact"), href: "/contact" },
  ];

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul className={cn("space-y-2 mt-3", isExpanded ? "px-3" : "px-3")}>
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md transition-all duration-200",
                "hover:-translate-y-0.5 hover:bg-background hover:shadow-md",
                isExpanded
                  ? "justify-start space-x-3 px-3 py-2"
                  : "justify-center p-2",
                activeItem === item.href ? "bg-background shadow-md" : ""
              )}
              onClick={() => setActiveItem(item.href)}
            >
              <motion.div
                className="flex items-center"
                initial={false}
                animate={{
                  width: isExpanded ? "100%" : "auto",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    marginRight: isExpanded ? "12px" : "0px",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      "transition-colors duration-200",
                      activeItem === item.href ? "text-foreground" : "text-muted-foreground",
                      "group-hover:text-foreground"
                    )}
                  />
                </motion.div>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      className="text-sm text-foreground whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}