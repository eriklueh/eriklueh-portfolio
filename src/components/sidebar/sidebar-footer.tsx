"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/common/mode-toggle";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

const socialItems = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/eriklueh/",
  },
  { icon: Mail, label: "Email", href: "mailto:erikhire@nuvadi.com" },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

export function SidebarFooter() {
  const { isExpanded } = useSidebar();

  return (
      <div
          className={cn(
              "flex flex-col items-center",
              isExpanded ? "px-6 py-4" : "p-4"
          )}
      >
        <motion.div
            className="mb-4 flex"
            initial={false}
            animate={{
              flexDirection: isExpanded ? "row" : "column",
              alignItems: "center",
              gap: isExpanded ? "0.5rem" : "0.25rem",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {socialItems.map((item) => (
              <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                      "rounded-md transition-all duration-200 hover:bg-background hover:shadow-md",
                      isExpanded ? "p-2" : "p-1.5"
                  )}
                  title={item.label}
              >
                <item.icon
                    size={18}
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                />
              </motion.a>
          ))}
        </motion.div>
        <div className="flex justify-center w-full">
          <ThemeToggle />
        </div>
      </div>
  );
}