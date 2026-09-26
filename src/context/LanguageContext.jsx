import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getTranslation } from '../data/translations.js'

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: () => '',
  isHindi: false,
  tWithDual: (hi, en) => en,
})

const STORAGE_KEY = 'nyaya_lang'

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'hi' || stored === 'en') {
        return stored
      }
    } catch {
      // LocalStorage might be restricted
    }
    return 'en'
  })

  // Synchronize document language tag and localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
    }
  }, [language])

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'hi' || newLang === 'en') {
      setLanguageState(newLang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'en' ? 'hi' : 'en'))
  }, [])

  const t = useCallback(
    (keyPath, fallback = '') => {
      return getTranslation(language, keyPath, fallback)
    },
    [language]
  )

  const tWithDual = useCallback(
    (hiTerm, enTerm) => {
      if (language === 'hi') {
        return `${hiTerm} (${enTerm})`
      }
      return enTerm
    },
    [language]
  )

  const isHindi = language === 'hi'

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isHindi,
      tWithDual,
    }),
    [language, setLanguage, toggleLanguage, t, isHindi, tWithDual]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
