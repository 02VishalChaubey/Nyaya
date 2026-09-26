import React from 'react'
import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Footer() {
  const { t, isHindi } = useLanguage()

  return (
    <footer className="border-t border-border bg-navy text-paper/85">
      <div className="container-content py-10 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Section 1: NYAYA */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 font-display text-lg font-semibold text-paper group">
              <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-navy-light border border-paper/15 text-brass-light group-hover:bg-navy-light/80 transition-colors">
                <Scale size={15} aria-hidden="true" />
              </span>
              <span>Nyaya</span>
            </Link>
            <p className="mt-2 text-xs font-sans font-medium text-brass-light/90">
              {t('nav.tagline', 'Indian Law, Explained Clearly.')}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-paper/60">
              {isHindi
                ? 'भारतीय वैधानिक कानूनों और संवैधानिक अधिकारों को पारदर्शी, बोधगम्य और सत्यापन योग्य बनाने के लिए समर्पित एक सार्वजनिक कानूनी सूचना मंच।'
                : 'A public legal-information platform dedicated to making statutory Indian law and constitutional rights transparent, legible, and verifiable.'}
            </p>
          </div>

          {/* Section 2: EXPLORE */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50">
              {isHindi ? 'खोजें (Explore)' : 'Explore'}
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/know-your-rights" className="text-paper/75 hover:text-brass-light transition-colors">
                  {t('nav.knowYourRights', 'Know Your Rights')}
                </Link>
              </li>
              <li>
                <Link to="/fundamental-rights" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'मौलिक अधिकार (Part III)' : 'Fundamental Rights'}
                </Link>
              </li>
              <li>
                <Link to="/laws" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'भारतीय कानून (Laws)' : 'Indian Laws'}
                </Link>
              </li>
              <li>
                <Link to="/legal-terms" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'कानूनी शब्दावली (Glossary)' : 'Legal Terms'}
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'कानूनी उपकरण (Tools)' : 'Legal Tools & Checklists'}
                </Link>
              </li>
              <li>
                <Link to="/workflow" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'एआई सूचना कार्यप्रवाह (AI Workflow)' : 'AI Legal Workflow'}
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'कानूनी खोज (Search)' : 'Search'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: LEARN */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50">
              {isHindi ? 'अधिनियम (Acts)' : 'Learn'}
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/laws/bns-2023" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'भारतीय न्याय संहिता (BNS)' : 'BNS (Bharatiya Nyaya Sanhita)'}
                </Link>
              </li>
              <li>
                <Link to="/laws/bnss-2023" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'नागरिक सुरक्षा संहिता (BNSS)' : 'BNSS (Nagarik Suraksha)'}
                </Link>
              </li>
              <li>
                <Link to="/fundamental-rights" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'संविधान का भाग III' : 'Constitution (Part III)'}
                </Link>
              </li>
              <li>
                <Link to="/case-law" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'न्यायिक निर्णय (Case Law)' : 'Case Law'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: ABOUT */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50">
              {isHindi ? 'संस्थागत (About)' : 'About'}
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/about" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'न्याय के बारे में' : 'About Nyaya'}
                </Link>
              </li>
              <li>
                <Link to="/how-nyaya-works" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'न्याय कैसे कार्य करता है' : 'How Nyaya Works'}
                </Link>
              </li>
              <li>
                <Link to="/sources-methodology" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'स्रोत एवं पद्धति' : 'Sources & Methodology'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 5: LEGAL */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50">
              {isHindi ? 'कानूनी सूचना (Legal)' : 'Legal'}
            </h3>
            <ul className="mt-3 space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/disclaimer" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'गोपनीयता नीति (Privacy)' : 'Privacy'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'नियम व शर्तें (Terms)' : 'Terms'}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-paper/75 hover:text-brass-light transition-colors">
                  {isHindi ? 'सुलभता (Accessibility)' : 'Accessibility'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact bottom bar */}
        <div className="mt-10 flex flex-col gap-2 border-t border-paper/10 pt-6 text-[11px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nyaya. {isHindi ? 'शैक्षणिक एवं सार्वजनिक कानूनी सूचना संसाधन।' : 'Educational & public legal information resource.'}</p>
          <p>{isHindi ? 'भारत सरकार या भारत के सर्वोच्च न्यायालय से संबद्ध नहीं है।' : 'Not affiliated with the Government of India or the Supreme Court of India.'}</p>
        </div>
      </div>
    </footer>
  )
}
