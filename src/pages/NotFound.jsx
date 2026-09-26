import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Compass, BookOpen, ArrowLeftRight, Search, Shield } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function NotFound() {
  const { t, isHindi } = useLanguage()

  return (
    <div className="container-content py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">
          {isHindi ? '404 · वैधानिक अनुक्रमणिका' : '404 · Statutory Index'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy">
          {isHindi ? 'अनुरोधित पृष्ठ नहीं मिला' : 'The requested page could not be found'}
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink/75">
          {isHindi
            ? 'आपके द्वारा अनुरोधित कानूनी संदर्भ, धारा या पृष्ठ न्याय इंडेक्स में उपलब्ध नहीं है, अथवा वैधानिक संकलन के दौरान इसका स्थान परिवर्तित हो गया है।'
            : 'The legal reference, provision, or page you requested does not exist in the Nyaya index, or may have been relocated during statutory consolidation.'}
        </p>

        {/* Directory Navigation Options */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            to="/laws"
            className="flex items-start gap-3 p-4 rounded-sm border border-border bg-paper hover:border-navy/40 hover:bg-page transition-colors"
          >
            <BookOpen className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-navy block">
                {isHindi ? 'भारतीय कानून निर्देशिका' : 'Explore Indian Laws'}
              </span>
              <span className="text-xs text-ink/65 block mt-0.5">
                {isHindi
                  ? 'BNS, BNSS, और उपभोक्ता संरक्षण सहित केंद्रीय अधिनियम देखें।'
                  : 'Browse enacted central statutes including BNS, BNSS, and consumer protection.'}
              </span>
            </div>
          </Link>

          <Link
            to="/fundamental-rights"
            className="flex items-start gap-3 p-4 rounded-sm border border-border bg-paper hover:border-navy/40 hover:bg-page transition-colors"
          >
            <Compass className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-navy block">
                {isHindi ? 'मौलिक अधिकार (Part III)' : 'Fundamental Rights'}
              </span>
              <span className="text-xs text-ink/65 block mt-0.5">
                {isHindi
                  ? 'भारतीय संविधान के भाग III के अंतर्गत प्रदत्त मूल अधिकारों का अवलोकन।'
                  : 'Explore constitutional guarantees under Part III of the Constitution.'}
              </span>
            </div>
          </Link>

          <Link
            to="/compare"
            className="flex items-start gap-3 p-4 rounded-sm border border-border bg-paper hover:border-navy/40 hover:bg-page transition-colors"
          >
            <ArrowLeftRight className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-navy block">
                {isHindi ? 'कानूनों की तुलना (IPC ↔ BNS)' : 'Compare IPC ↔ BNS'}
              </span>
              <span className="text-xs text-ink/65 block mt-0.5">
                {isHindi
                  ? 'भारतीय दंड संहिता 1860 और भारतीय न्याय संहिता 2023 की तुलनात्मक तालिका।'
                  : 'Concordance table comparing the 1860 Penal Code to Bharatiya Nyaya Sanhita.'}
              </span>
            </div>
          </Link>

          <Link
            to="/search"
            className="flex items-start gap-3 p-4 rounded-sm border border-border bg-paper hover:border-navy/40 hover:bg-page transition-colors"
          >
            <Search className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-navy block">
                {isHindi ? 'कानूनी खोज इंजन' : 'Search Legal Index'}
              </span>
              <span className="text-xs text-ink/65 block mt-0.5">
                {isHindi
                  ? 'धाराएं, कानूनी शब्दावली, निर्णय और प्रक्रियात्मक गाइड खोजें।'
                  : 'Search sections, legal terms, landmark cases, and procedural guides.'}
              </span>
            </div>
          </Link>

          <Link
            to="/know-your-rights"
            className="flex items-start gap-3 p-4 rounded-sm border border-border bg-paper hover:border-navy/40 hover:bg-page transition-colors sm:col-span-2"
          >
            <Shield className="w-5 h-5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-navy block">
                {isHindi ? 'अपने अधिकार केंद्र (Rights Hub)' : 'Know Your Rights Hub'}
              </span>
              <span className="text-xs text-ink/65 block mt-0.5">
                {isHindi
                  ? 'पुलिस पूछताछ, उपभोक्ता खरीद, कार्यस्थल, किरायेदारी और डिजिटल सुरक्षा में व्यावहारिक अधिकार।'
                  : 'Practical everyday rights across police custody, consumer purchases, workplace dignity, tenancy, and digital safety.'}
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-xs font-semibold text-paper shadow-xs hover:bg-navy-light transition-colors"
          >
            <Home size={14} />
            <span>{isHindi ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Homepage'}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
