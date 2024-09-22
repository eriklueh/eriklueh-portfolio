'use client'

import { i18n } from '@/lib/i18n-config'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { useLanguage } from "@/lib/lenguage-context"
import { motion } from "framer-motion"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="rounded-md transition-all duration-200 p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Globe className="h-[1.2rem] w-[1.2rem] text-muted-foreground hover:text-foreground transition-colors duration-200" />
          <span className="sr-only">Switch language</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => setLanguage(locale)}
            className={`${locale === language ? 'bg-accent' : ''} transition-colors hover:bg-accent`}
          >
            {locale === 'en' ? 'English' : 'Español'}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}