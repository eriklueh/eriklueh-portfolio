import { create } from 'zustand'

interface SidebarState {
  isExpanded: boolean
  isMobile: boolean
  setIsExpanded: (isExpanded: boolean) => void
  setIsMobile: (isMobile: boolean) => void
  toggleSidebar: () => void
}

export const useSidebar = create<SidebarState>((set) => ({
  isExpanded: true,
  isMobile: false,
  setIsExpanded: (isExpanded) => set({ isExpanded }),
  setIsMobile: (isMobile) => set({ isMobile }),
  toggleSidebar: () => set((state) => ({
    isExpanded: !state.isExpanded,
    // On mobile, always collapse the sidebar when toggling closed
    ...(state.isMobile && state.isExpanded ? { isExpanded: false } : {})
  })),
}))