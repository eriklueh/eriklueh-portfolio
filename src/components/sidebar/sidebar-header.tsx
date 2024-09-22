"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarHeader() {
  const { isExpanded } = useSidebar();
  const [isHovering, setIsHovering] = useState(false);

  const handVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      }
    },
  };

  const waveAnimation = {
    rotate: [0, 14, -8, 14, -4, 10, 0],
    transition: {
      duration: 0.6,
      repeat: 1,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  };

  return (
    <div
      className={cn(
        "flex items-center",
        isExpanded ? "justify-start p-4" : "justify-center p-4",
      )}
    >
      <div
        className="flex items-center space-x-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Erik"
          />
          <AvatarFallback>E</AvatarFallback>
        </Avatar>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <span className="flex items-center text-lg font-semibold">
                Erik
                <AnimatePresence>
                  {isHovering && (
                    <motion.span
                      className="ml-2 inline-block"
                      variants={handVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <motion.span
                        animate={waveAnimation}
                        style={{ display: 'inline-block', originX: 0.7, originY: 0.7 }}
                      >
                        👋
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-xs text-muted-foreground">
                front_dev
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}