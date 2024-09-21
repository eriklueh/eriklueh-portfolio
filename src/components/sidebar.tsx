'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, ChevronDown, ChevronLeft, ChevronRight, Home, Linkedin, Mail, Twitter, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/common/mode-toggle'
import { cn } from '@/lib/utils'
import { useTranslation } from "@/hooks/useTranslations"
import { LanguageSwitcher } from "@/components/common/lenguage-switcher"

export function SidebarComponent() {
    const [isExpanded, setIsExpanded] = useState(true)
    const { theme } = useTheme()
    const { t } = useTranslation()

    const toggleSidebar = () => setIsExpanded(!isExpanded)

    const sidebarVariants = {
        expanded: { width: 256 },
        collapsed: { width: 64 }
    }

    const navItems = [
        { icon: Home, label: t('nav.home'), href: '/' },
        { icon: User, label: t('nav.about'), href: '/about' },
        { icon: Briefcase, label: t('nav.projects'), href: '/projects' },
        { icon: Mail, label: t('nav.contact'), href: '/contact' },
    ]

    const socialItems = [
        { icon: Twitter, label: 'Twitter', href: '#' },
        { icon: Linkedin, label: 'LinkedIn', href: '#' },
    ]

    return (
      <motion.aside
        className="flex flex-col h-screen bg-background border-r overflow-hidden"
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
          <div className="flex items-center justify-between p-4">
              <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                        <Image
                          src={theme === 'light' ? "/logo-light.png" : "/logo-dark.png"}
                          alt="Logo"
                          width={150}
                          height={30}
                        />
                    </motion.div>
                  )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="rounded-full hover:bg-accent transition-colors duration-200"
              >
                  {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
          </div>

          <nav className="flex-1 overflow-y-auto">
              <ul className="space-y-2 p-2">
                  {navItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href}
                              className={cn(
                                "flex items-center p-2 rounded-md hover:bg-accent transition-colors duration-200",
                                isExpanded ? "justify-start space-x-2" : "justify-center"
                              )}>
                            <item.icon size={20} />
                            <AnimatePresence>
                                {isExpanded && (
                                  <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                      {item.label}
                                  </motion.span>
                                )}
                            </AnimatePresence>
                        </Link>
                    </li>
                  ))}
              </ul>
          </nav>

          <div className="p-4 space-y-4">
              <div className={cn(
                "flex",
                isExpanded ? "justify-center space-x-2" : "flex-col items-center space-y-2"
              )}>
                  <ThemeToggle />
                  <LanguageSwitcher />
              </div>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="ghost"
                              className={`w-full ${isExpanded ? 'justify-between' : 'justify-center'} group`}>
                          <div className={`flex items-center ${isExpanded ? 'space-x-3' : ''}`}>
                              <Avatar className="h-8 w-8 transition-transform duration-200 group-hover:scale-110">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                                  <AvatarFallback>TN</AvatarFallback>
                              </Avatar>
                              <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      className="flex flex-col items-start"
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                        <span className="text-sm font-medium">{t('profile.name')}</span>
                                        <span className="text-xs text-muted-foreground">{t('profile.role')}</span>
                                    </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                          {isExpanded && <ChevronDown
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />}
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>{t('dropdown.profile')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('dropdown.settings')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('dropdown.logout')}</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>
              <div className={cn(
                "flex",
                isExpanded ? "justify-center space-x-2" : "flex-col items-center space-y-2"
              )}>
                  {socialItems.map((item, index) => (
                    <a key={index} href={item.href}
                       className="p-2 rounded-md hover:bg-accent transition-colors duration-200" title={item.label}>
                        <item.icon size={20} />
                    </a>
                  ))}
              </div>
          </div>
      </motion.aside>
    )
}