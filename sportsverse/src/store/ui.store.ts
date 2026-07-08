import { create } from 'zustand'
import type { Sport, UserPreferences } from '@/types'

export type Theme = 'dark' | 'light'

interface UiState {
  // Theme
  theme: Theme
  setTheme: (theme: Theme) => void

  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Current sport
  currentSport: Sport
  setCurrentSport: (sport: Sport) => void

  // User preferences
  preferences: UserPreferences | null
  setPreferences: (prefs: UserPreferences) => void

  // Modals
  modals: Record<string, boolean>
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  toggleModal: (modalId: string) => void

  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void

  // Notifications
  showNotifications: boolean
  setShowNotifications: (show: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  // Sidebar
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // Current sport
  currentSport: 'cricket',
  setCurrentSport: (sport) => set({ currentSport: sport }),

  // Preferences
  preferences: null,
  setPreferences: (prefs) => set({ preferences: prefs }),

  // Modals
  modals: {},
  openModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: false },
    })),
  toggleModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] },
    })),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Notifications
  showNotifications: false,
  setShowNotifications: (show) => set({ showNotifications: show }),
}))
