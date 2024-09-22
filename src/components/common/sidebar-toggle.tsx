'use client'

import { Button } from "@/components/ui/button"
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { useSidebar } from "@/hooks/use-sidebar"

export function SidebarToggle() {
  const { isExpanded, toggleSidebar } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="absolute top-2 left-2 z-10 rounded-full transition-colors duration-200 hover:bg-accent"
    >
      {isExpanded ? (
        <PanelLeftClose className="h-4 w-4" />
      ) : (
        <PanelLeftOpen className="h-4 w-4" />
      )}
    </Button>
  )
}