import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'nyaya_saved_bookmarks'

const BookmarkContext = createContext({
  bookmarks: [],
  isBookmarked: () => false,
  addBookmark: () => false,
  removeBookmark: () => {},
  toggleBookmark: () => false,
  clearBookmarks: () => {},
  count: 0,
})

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          return parsed
        }
      }
    } catch {
      // LocalStorage might be restricted or corrupted
    }
    return []
  })

  // Synchronize with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    } catch {
      // Ignore storage quota or security errors
    }
  }, [bookmarks])

  // Check if an item is already bookmarked
  const isBookmarked = useCallback(
    (id) => {
      if (!id) return false
      return bookmarks.some((b) => b.id === id)
    },
    [bookmarks]
  )

  // Add bookmark preventing duplicates
  const addBookmark = useCallback((item) => {
    if (!item || !item.id) return false
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id)) {
        return prev // Prevent duplicate
      }
      const newBookmark = {
        id: item.id,
        title: item.title || 'Untitled Legal Resource',
        category: item.category || 'General Legal Information',
        type: item.type || 'page',
        description: item.description || '',
        url: item.url || '/',
        savedAt: item.savedAt || new Date().toISOString(),
      }
      return [newBookmark, ...prev]
    })
    return true
  }, [])

  // Remove bookmark by id
  const removeBookmark = useCallback((id) => {
    if (!id) return
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  // Toggle bookmark
  const toggleBookmark = useCallback((item) => {
    if (!item || !item.id) return false
    let willSave = false
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id)
      if (exists) {
        willSave = false
        return prev.filter((b) => b.id !== item.id)
      } else {
        willSave = true
        const newBookmark = {
          id: item.id,
          title: item.title || 'Untitled Legal Resource',
          category: item.category || 'General Legal Information',
          type: item.type || 'page',
          description: item.description || '',
          url: item.url || '/',
          savedAt: new Date().toISOString(),
        }
        return [newBookmark, ...prev]
      }
    })
    return willSave
  }, [])

  // Clear all bookmarks
  const clearBookmarks = useCallback(() => {
    setBookmarks([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore
    }
  }, [])

  const value = React.useMemo(
    () => ({
      bookmarks,
      isBookmarked,
      addBookmark,
      removeBookmark,
      toggleBookmark,
      clearBookmarks,
      count: bookmarks.length,
    }),
    [bookmarks, isBookmarked, addBookmark, removeBookmark, toggleBookmark, clearBookmarks]
  )

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}
