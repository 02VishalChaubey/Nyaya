import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BreadcrumbContext = createContext({
  customCrumbs: null,
  setCustomCrumbs: () => {},
  activeArticle: null,
  setActiveArticle: () => {},
  activeSection: null,
  setActiveSection: () => {},
  activeTerm: null,
  setActiveTerm: () => {},
})

export function BreadcrumbProvider({ children }) {
  const [customCrumbs, setCustomCrumbs] = useState(null)
  const [activeArticle, setActiveArticle] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  const [activeTerm, setActiveTerm] = useState(null)

  const location = useLocation()

  // Reset page-level state when the route pathname changes
  useEffect(() => {
    setCustomCrumbs(null)
    setActiveArticle(null)
    setActiveSection(null)
    setActiveTerm(null)
  }, [location.pathname])

  return (
    <BreadcrumbContext.Provider
      value={{
        customCrumbs,
        setCustomCrumbs,
        activeArticle,
        setActiveArticle,
        activeSection,
        setActiveSection,
        activeTerm,
        setActiveTerm,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  )
}

export function useBreadcrumbs(crumbs) {
  const { setCustomCrumbs } = useContext(BreadcrumbContext)

  useEffect(() => {
    if (crumbs) {
      setCustomCrumbs(crumbs)
    }
    return () => {
      setCustomCrumbs(null)
    }
  }, [JSON.stringify(crumbs), setCustomCrumbs])
}

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext)
}
