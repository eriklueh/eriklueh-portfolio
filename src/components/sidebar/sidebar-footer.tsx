"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Linkedin, Mail, Settings, Twitter } from "lucide-react";
import { ThemeToggle } from "@/components/common/mode-toggle";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/common/lenguage-switcher";
import { useSidebar } from "@/hooks/use-sidebar";

const socialItems = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/yourusername" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yourusername",
  },
  { icon: Mail, label: "Email", href: "mailto:your.email@example.com" },
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isMobile = useIsMobile();

  const iconAnimation = {
    rotate: [0, 180],
    transition: { duration: 0.3 },
  };

  const settingsContentVariants = {
    hidden: {
      opacity: 0,
      x: isExpanded ? 20 : 0,
      y: isExpanded ? 0 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const settingsButtonVariants = {
    normal: { x: 0 },
    moved: { x: -40 },
  };

  const socialIconsVariants = {
    normal: { y: 0 },
    moved: { y: isExpanded ? 0 : -64 },
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center",
        isExpanded ? "px-6 py-4" : "p-4",
      )}
    >
      <motion.div
        className="mb-4 flex"
        initial="normal"
        animate={isSettingsOpen && !isExpanded ? "moved" : "normal"}
        variants={socialIconsVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="flex"
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
                isExpanded ? "p-2" : "p-1.5",
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
      </motion.div>
      <div className="relative flex w-full justify-center">
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              className={cn(
                "absolute flex gap-1",
                isExpanded
                  ? isMobile
                    ? "left-[85px] top-0 flex-row"
                    : "left-[60px] top-0 flex-row"
                  : "bottom-full mb-2 flex-col items-center",
              )}
              variants={settingsContentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <ThemeToggle />
              <LanguageSwitcher />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          className="relative flex w-full justify-center"
          initial="normal"
          animate={isSettingsOpen && isExpanded ? "moved" : "normal"}
          variants={settingsButtonVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={cn(
              "rounded-md p-2 transition-all duration-200 hover:bg-background hover:shadow-md",
              isSettingsOpen && "bg-background shadow-md",
            )}
            aria-label="Toggle settings"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isSettingsOpen ? iconAnimation : { rotate: 0 }}
            >
              <Settings
                size={18}
                className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
