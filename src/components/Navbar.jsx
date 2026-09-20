import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Scale, Search } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fundamental-rights', label: 'Fundamental Rights' },
  { to: '/laws/bns-2023', label: 'BNS 2023' },
  { to: '/laws/bnss-2023', label: 'BNSS 2023' },
  { to: '/laws', label: 'Explore Laws' },
  { to: '/harmed', label: 'I Have Been Harmed' },
  { to: '/legal-terms', label: 'Legal Terms' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the viewport is resized back to desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const linkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-navy' : 'text-ink/65 hover:text-navy'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 font-display text-lg font-semibold text-navy group"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0A111E] text-cyan-400 border border-slate-700 shadow-xs group-hover:border-cyan-400/50 transition-colors">
            <Scale size={18} aria-hidden="true" className="text-cyan-400" />
          </span>
          <div className="flex flex-col">
            <span className="leading-tight font-bold tracking-tight text-navy">Enmachi</span>
            <span className="font-sans text-[10px] font-medium tracking-wide text-ink/60">न्याय • विधि • ज्ञान</span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 lg:flex"
        >
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-navy/70 hover:border-brass hover:text-navy transition-colors"
          >
            <Search size={17} />
          </NavLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-border bg-paper lg:hidden"
        >
          <div className="container-content flex flex-col gap-1 py-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-navy/5 text-navy' : 'text-ink/70 hover:bg-navy/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium text-ink/70 hover:bg-navy/5"
            >
              <Search size={16} /> Search
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
