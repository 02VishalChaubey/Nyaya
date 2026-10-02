import React from 'react'
import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Footer() {
  const { t, isHindi } = useLanguage()

  return (
    <footer className="border-t border-border/80 bg-navy text-paper/85">
      <div className="container-content py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Identity & Mission */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 font-display text-xl font-semibold text-paper group">
              <span className="flex h-8 w-8 items-center justify-center rounded-xs bg-paper/10 border border-paper/15 text-brass-light group-hover:bg-paper/20 transition-colors">
                <Scale size={16} aria-hidden="true" />
              </span>
              <span>Nyaya</span>
            </Link>

            <p className="text-xs font-sans font-medium text-brass-light">
              {t('nav.tagline', 'Indian Law, Explained Clearly.')}
            </p>

            <p className="text-xs leading-relaxed text-paper/65 max-w-md">
              {isHindi
                ? 'भारतीय वैधानिक कानूनों और संवैधानिक अधिकारों को पारदर्शी, बोधगम्य और सत्यापन योग्य बनाने के लिए समर्पित एक स्वतंत्र सार्वजनिक कानूनी सूचना मंच।'
                : 'An independent public legal-information platform dedicated to making statutory Indian law, constitutional rights, and procedural safeguards transparent and legible for every citizen.'}
            </p>

            <div className="pt-2 text-[11px] leading-relaxed text-paper/50 border-t border-paper/10 max-w-md">
              <span className="font-semibold text-paper/70 block mb-0.5">
                {isHindi ? 'विधिक अस्वीकरण:' : 'Statutory Notice:'}
              </span>
              {isHindi
                ? 'न्याय केवल सार्वजनिक शैक्षणिक उद्देश्यों के लिए है और पेशेवर विधिक परामर्श का विकल्प नहीं है।'
                : 'Educational public legal awareness only. Does not constitute legal advice or an advocate-client relationship.'}
            </div>
          </div>

          {/* Quick Editorial Directory */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50 mb-3">
              {isHindi ? 'कानूनी अनुक्रमणिका' : 'Legal Directory'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/know-your-rights" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {t('nav.knowYourRights', 'Know Your Rights')}
                </Link>
              </li>
              <li>
                <Link to="/fundamental-rights" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'मौलिक अधिकार (Part III)' : 'Fundamental Rights (Part III)'}
                </Link>
              </li>
              <li>
                <Link to="/laws/bns-2023" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'भारतीय न्याय संहिता (BNS 2023)' : 'BNS 2023 (Penal Code)'}
                </Link>
              </li>
              <li>
                <Link to="/laws/bnss-2023" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'नागरिक सुरक्षा संहिता (BNSS 2023)' : 'BNSS 2023 (Procedure)'}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'कानूनों की तुलना (IPC ↔ BNS)' : 'Compare Laws (IPC ↔ BNS)'}
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'कानूनी टूल्स व चेकलिस्ट' : 'Legal Tools & Checklists'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Transparency & Governance */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-paper/50 mb-3">
              {isHindi ? 'पारदर्शिता व नीति' : 'Transparency'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/sources-methodology" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'सत्यापन स्रोत एवं पद्धति' : 'Sources & Methodology'}
                </Link>
              </li>
              <li>
                <Link to="/how-nyaya-works" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'न्याय कैसे कार्य करता है' : 'How Nyaya Works'}
                </Link>
              </li>
              <li>
                <Link to="/case-law" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'सर्वोच्च न्यायालय निर्णय' : 'Supreme Court Case Law'}
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'अस्वीकरण (Disclaimer)' : 'Disclaimer'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-paper/75 hover:text-paper hover:underline transition-colors">
                  {isHindi ? 'सुलभता' : 'Accessibility Statement'}
                </Link>
              </li>
            </ul>

            <div className="mt-5 pt-3 border-t border-paper/10">
              <span className="text-[11px] font-mono text-paper/50 block mb-1.5">
                {isHindi ? 'भाषा चयन:' : 'Language:'}
              </span>
              <LanguageSwitcher size="sm" />
            </div>
          </div>
        </div>

        {/* Quiet bottom bar */}
        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-[11px] text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nyaya. {isHindi ? 'सार्वजनिक कानूनी सूचना मंच।' : 'Public legal-information resource.'}</p>
          <p>{isHindi ? 'भारत सरकार या भारत के सर्वोच्च न्यायालय से संबद्ध नहीं है।' : 'Not affiliated with the Government of India or the Supreme Court of India.'}</p>
        </div>
      </div>
    </footer>
  )
}
