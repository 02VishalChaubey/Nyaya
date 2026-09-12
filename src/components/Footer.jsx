import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-paper/80">
      <div className="container-content py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-semibold text-paper">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                <Scale size={15} aria-hidden="true" />
              </span>
              <span>Enmachi</span>
            </div>
            <p className="mt-1 text-xs font-sans font-medium text-cyan-400/90">न्याय • विधि • ज्ञान • The Wisdom of the Judge</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              A public-information platform for understanding Indian laws and
              fundamental rights in plain language.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/fundamental-rights" className="hover:text-brass-light">Fundamental Rights</Link></li>
              <li><Link to="/laws" className="hover:text-brass-light">Explore Laws</Link></li>
              <li><Link to="/legal-terms" className="hover:text-brass-light">Legal Terms</Link></li>
              <li><Link to="/search" className="hover:text-brass-light">Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/harmed" className="hover:text-brass-light">I Have Been Harmed</Link></li>
              <li><span className="text-paper/40">About (coming soon)</span></li>
              <li><span className="text-paper/40">Contact (coming soon)</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-paper/50">
              Important
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              This platform provides general legal information for educational
              purposes. It does not provide legal advice or determine the
              outcome of a legal case.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Enmachi. All content is for educational use.</p>
          <p>Not affiliated with the Government of India.</p>
        </div>
      </div>
    </footer>
  )
}
