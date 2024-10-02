import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Book,
  Briefcase,
  Codesandbox,
  Home,
  Receipt,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";

export function SidebarNavigation() {
  const { isExpanded } = useSidebar();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "About", href: "/about" },
    { icon: Briefcase, label: "Projects", href: "/projects" },
    { icon: Receipt, label: "Pricing", href: "/pricing" },
    { icon: Codesandbox, label: "Sandbox", href: "/sandbox" },
    { icon: Book, label: "Blog", href: "/blog" },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
      <nav className="flex-1 overflow-y-auto">
        <ul className={cn("mt-3 space-y-2", isExpanded ? "px-3" : "px-3")}>
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
                        isActive(item.href) ? "bg-background shadow-md" : "",
                    )}
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
                              isActive(item.href)
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              "group-hover:text-foreground",
                          )}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {isExpanded && (
                          <motion.span
                              className={cn(
                                  "whitespace-nowrap text-sm font-bold",
                                  isActive(item.href)
                                      ? "text-primary"
                                      : "text-muted-foreground",
                              )}
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