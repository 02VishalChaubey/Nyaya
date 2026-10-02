import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowRight,
  Scale,
  BookOpen,
  BookMarked,
  ShieldAlert,
  Shield,
  ShoppingBag,
  Briefcase,
  Home as HomeIcon,
  Compass,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import SearchBar from '../components/SearchBar.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchRights, fetchCategories } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'
import { categories as fallbackCategories } from '../data/categories.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Home() {
  const navigate = useNavigate()
  const { t, isHindi } = useLanguage()

  const {
    data: fundamentalRights,
    loading: rightsLoading,
    usingFallback: rightsFallback,
  } = useApi(fetchRights, [], fallbackRights)

  const {
    data: categories,
    loading: categoriesLoading,
    usingFallback: categoriesFallback,
  } = useApi(fetchCategories, [], fallbackCategories)

  const exampleSearches = isHindi
    ? ['किरायेदार अमानत (deposit)', 'गिरफ्तारी अधिकार', 'उपभोक्ता शिकायत', 'अनुच्छेद 21', 'ज़ीरो एफआईआर']
    : ['tenant deposit', 'arrest rights', 'consumer complaint', 'Article 21', 'Zero FIR']

  const coreSections = [
    {
      number: '01',
      title: isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights',
      description: isHindi
        ? 'पुलिस पूछताछ, कार्यस्थल, किरायेदारी और उपभोक्ता मामलों में वैधानिक नागरिक अधिकार।'
        : 'Codified citizen protections across police encounters, workplace, tenancy, and consumer disputes.',
      domain: isHindi ? 'दैनिक अधिकार निर्देशिका' : 'Everyday Protections',
      to: '/know-your-rights',
      icon: Shield,
    },
    {
      number: '02',
      title: isHindi ? 'मौलिक अधिकार (Part III)' : 'Fundamental Rights',
      description: isHindi
        ? 'भारत के संविधान द्वारा प्रत्येक नागरिक को प्रदत्त मूल संवैधानिक स्वतंत्रताएं।'
        : 'Constitutional freedoms and enforceable guarantees under Articles 12 to 35.',
      domain: isHindi ? 'भारत का संविधान' : 'Constitution of India',
      to: '/fundamental-rights',
      icon: Scale,
    },
    {
      number: '03',
      title: isHindi ? 'भारतीय कानून व संहिताएं' : 'Indian Laws & Statutes',
      description: isHindi
        ? 'भारतीय न्याय संहिता (BNS), नागरिक सुरक्षा संहिता (BNSS) और संसदीय अधिनियमों का विश्लेषण।'
        : 'Explore BNS 2023, BNSS 2023, Consumer Protection Act, and central parliamentary statutes.',
      domain: isHindi ? 'संसदीय अधिनियम' : 'Central Statutes',
      to: '/laws',
      icon: BookOpen,
    },
    {
      number: '04',
      title: isHindi ? 'क्या घटना घटी? (Situation Guide)' : 'What Happened?',
      description: isHindi
        ? 'अपनी समस्या सामान्य बोलचाल के शब्दों में बताएं और लागू कानून एवं कानूनी उपचार समझें।'
        : 'Describe a situation in your own plain words to discover applicable sections, rights, and next steps.',
      domain: isHindi ? 'नागरिक मार्गदर्शन' : 'Guided Redressal',
      to: '/harmed',
      icon: ShieldAlert,
    },
    {
      number: '05',
      title: isHindi ? 'कानूनी शब्दावली' : 'Legal Terms & Concepts',
      description: isHindi
        ? 'जमानत, संज्ञेय अपराध, रिमांड और बंदी प्रत्यक्षीकरण जैसे कानूनी शब्दों की सरल व्याख्या।'
        : 'Clear, plain-language definitions for bail, remand, cognizable offences, and legal jargon.',
      domain: isHindi ? 'शब्दावली संदर्भ' : 'Plain Definitions',
      to: '/legal-terms',
      icon: BookMarked,
    },
    {
      number: '06',
      title: isHindi ? 'कानूनी उपकरण व चेकलिस्ट' : 'Legal Tools & Checklists',
      description: isHindi
        ? 'दस्तावेज़ चेकलिस्ट, औपचारिक शिकायत तैयारी मार्गदर्शिका और धारा नेविगेटर।'
        : 'Step-by-step fact organization checklists, complaint drafting guides, and statutory finders.',
      domain: isHindi ? 'तैयारी उपकरण' : 'Practical Tools',
      to: '/tools',
      icon: Compass,
    },
    {
      number: '07',
      title: isHindi ? 'एआई सूचना कार्यप्रवाह' : 'AI Legal Workflow',
      description: isHindi
        ? 'सत्यापित केंद्रीय संहिताओं और कानूनी स्रोतों पर आधारित 7-चरणीय नियंत्रित विश्लेषण।'
        : 'Controlled legal question analysis strictly anchored to verified statutory codes and citations.',
      domain: isHindi ? 'नियंत्रित सूचना कार्यप्रवाह' : 'Structured Analysis',
      to: '/workflow',
      icon: Sparkles,
    },
  ]

  const howItWorksItems = [
    {
      step: '01',
      title: isHindi ? 'बताएं' : 'Describe',
      description: isHindi
        ? 'अपनी समस्या अपने सामान्य शब्दों में बताएं — किसी कानूनी शब्दावली की आवश्यकता नहीं है।'
        : 'Explain what happened in ordinary words — no technical legal vocabulary required.',
    },
    {
      step: '02',
      title: isHindi ? 'खोजें' : 'Match',
      description: isHindi
        ? 'न्याय आपकी स्थिति को प्रासंगिक वैधानिक धाराओं, प्रक्रियाओं और संवैधानिक अधिकारों से जोड़ता है।'
        : 'Nyaya matches the facts against codified statutes, sections, and constitutional guarantees.',
    },
    {
      step: '03',
      title: isHindi ? 'समझें' : 'Understand',
      description: isHindi
        ? 'सरल भाषा में समझें कि आपकी स्थिति में कौन सा कानून लागू होता है और क्या अधिकार हैं।'
        : 'Read a clear explanation of applicable laws, immediate options, and practical rights.',
    },
    {
      step: '04',
      title: isHindi ? 'सत्यापित करें' : 'Verify',
      description: isHindi
        ? 'प्रत्येक व्याख्या को आधिकारिक केंद्रीय अधिनियमों, राजपत्रों और इंडिया कोड से जांचें।'
        : 'Cross-check each explanation against official Union Gazettes, Acts, and court citations.',
    },
  ]

  return (
    <div className="bg-page text-ink min-h-screen">
      {/* Editorial Hero with Constitution Anchor */}
      <Hero
        eyebrow={isHindi ? 'न्याय · भारतीय विधिक सूचना मंच' : 'Nyaya · Public Legal Information'}
        title={t('home.title', 'Indian Law, Explained Clearly.')}
        subtitle={t(
          'home.subtitle',
          'A public legal-information platform helping citizens understand Indian laws, fundamental rights, and legal remedies — clearly, accurately, and without jargon.'
        )}
        size="lg"
        image={
          <img
            src="/images/3d-constitution-book.svg"
            alt="Constitution of India illustration"
            className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] h-auto object-contain select-none"
            loading="eager"
          />
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/harmed" size="lg" variant="primary" icon={ArrowRight}>
            {isHindi ? 'क्या घटना घटी?' : 'Describe What Happened'}
          </Button>
          <Button to="/laws" size="lg" variant="secondary">
            {isHindi ? 'भारतीय कानून निर्देशिका' : 'Explore Indian Laws'}
          </Button>
        </div>

        {/* Prominent Search Field */}
        <div className="mt-8 max-w-2xl">
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-ink/60 mb-2">
            {isHindi
              ? 'अधिनियम, धाराएं, अधिकार अथवा कानूनी स्थिति खोजें'
              : 'Search laws, rights, sections & legal terms'}
          </div>
          <SearchBar
            placeholder={
              isHindi
                ? 'कानून, धारा 103, "जमानत क्या है", अनुच्छेद 21 खोजें...'
                : 'Search a law, right, legal term (e.g. bail, FIR, Article 21)...'
            }
            onSearch={(val) => {
              if (val) navigate(`/search?q=${encodeURIComponent(val)}`)
            }}
            showShortcut
          />

          {/* Natural example search queries */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-ink/70">
            <span className="font-mono text-[11px] text-ink/50 uppercase tracking-wider">
              {isHindi ? 'उदाहरण खोजें:' : 'Example searches:'}
            </span>
            {exampleSearches.map((query) => (
              <button
                key={query}
                type="button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                className="text-navy hover:text-maroon underline underline-offset-3 decoration-border hover:decoration-maroon transition-colors font-medium"
              >
                "{query}"
              </button>
            ))}
          </div>
        </div>
      </Hero>

      {/* "What do you need to know?" — Numbered Editorial Rows */}
      <section className="border-b border-border/80 bg-paper py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="border-b border-border/80 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-1 block">
                {isHindi ? 'नागरिक कानूनी मार्गदर्शिका' : 'Index & Navigation'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                {isHindi ? 'आपको क्या जानना है?' : 'What do you need to know?'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-ink/65 max-w-sm">
              {isHindi
                ? 'अपनी आवश्यकता अनुसार प्रमुख कानूनी विषयों और संहिताओं में सीधे प्रवेश करें।'
                : 'Navigate codified Indian statutes, citizen protections, and procedural tools.'}
            </p>
          </div>

          <div className="divide-y divide-border/70 border-t border-border/80">
            {coreSections.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.number}
                  to={item.to}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 py-5 px-3 sm:px-4 hover:bg-page transition-colors rounded-xs"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-maroon shrink-0 pt-0.5 sm:pt-0">
                      {item.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-navy group-hover:text-maroon transition-colors">
                          {item.title}
                        </h3>
                        <span className="hidden md:inline font-mono text-[10px] uppercase font-medium text-ink/45 bg-page px-1.5 py-0.5 rounded-xs border border-border/60">
                          {item.domain}
                        </span>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-ink/70 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-end sm:self-center text-xs font-semibold text-navy group-hover:text-maroon group-hover:translate-x-1 transition-all shrink-0">
                    <span className="hidden sm:inline">{isHindi ? 'खोलें' : 'Explore'}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Know Your Rights — Editorial Two-Column Spotlight */}
      <section className="border-b border-border/80 bg-page py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Context & Overview */}
            <div className="lg:col-span-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-2 block">
                {isHindi ? 'भाग I · दैनिक नागरिक अधिकार' : 'Part I · Citizen Protections'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy leading-tight">
                {isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}
              </h2>
              <p className="mt-3 text-sm text-ink/75 leading-relaxed">
                {isHindi
                  ? 'दैनिक जीवन में स्पष्ट, व्यावहारिक कानूनी सुरक्षा। पुलिस पूछताछ, कार्यस्थल, किरायेदारी विवाद, खरीदारी और साइबर सुरक्षा के दौरान अपने वैधानिक अधिकार जानें।'
                  : 'Clear, actionable legal protections across everyday life. Learn what the law guarantees you during police encounters, workplace issues, tenancy disputes, and commercial purchases.'}
              </p>
              <div className="mt-6">
                <Button to="/know-your-rights" variant="primary" size="md" icon={ArrowRight}>
                  {isHindi ? 'सभी 8 श्रेणियां देखें' : 'Explore All 8 Spheres'}
                </Button>
              </div>
            </div>

            {/* Right Column: Editorial Rows */}
            <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-border/80 lg:pl-8 divide-y divide-border/70">
              <Link
                to="/know-your-rights?category=police-enforcement"
                className="group block py-4 first:pt-0 hover:bg-paper/60 px-3 transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-maroon font-bold">01 · {isHindi ? 'पुलिस व हिरासत' : 'Police & Custody'}</span>
                  <ArrowRight size={13} className="text-ink/40 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                  {isHindi ? 'गिरफ्तारी, पूछताछ व 24 घंटे का नियम' : 'Arrest, Interrogation & The 24-Hour Magistrate Rule'}
                </h3>
                <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                  {isHindi
                    ? '24 घंटे में मजिस्ट्रेट पेशी, गिरफ्तारी का कारण, परिवार को सूचना और महिला गिरफ्तारी के विशेष सुरक्षा नियम।'
                    : 'The mandatory 24-hour Magistrate rule, right to inform family, arrest memo execution, and women arrest safeguards.'}
                </p>
              </Link>

              <Link
                to="/know-your-rights?category=consumer-rights"
                className="group block py-4 hover:bg-paper/60 px-3 transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-maroon font-bold">02 · {isHindi ? 'उपभोक्ता अधिकार' : 'Consumer Rights'}</span>
                  <ArrowRight size={13} className="text-ink/40 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                  {isHindi ? 'दोषपूर्ण सामान, रिफंड व ई-दाखिल शिकायत' : 'Defective Goods, Refunds & E-Commerce Redressal'}
                </h3>
                <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                  {isHindi
                    ? 'ई-दाखिल पोर्टल पर ऑनलाइन शिकायत, ₹5 लाख तक शून्य अदालती शुल्क और अनुचित व्यापार व्यवहार के विरुद्ध उपचार।'
                    : 'Statutory complaint filing on e-Daakhil, zero court fees up to ₹5 Lakh, product liability claims, and refund rights.'}
                </p>
              </Link>

              <Link
                to="/know-your-rights?category=workplace-rights"
                className="group block py-4 hover:bg-paper/60 px-3 transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-maroon font-bold">03 · {isHindi ? 'कार्यस्थल अधिकार' : 'Workplace Rights'}</span>
                  <ArrowRight size={13} className="text-ink/40 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                  {isHindi ? 'वेतन सुरक्षा, POSH समिति व मातृत्व अवकाश' : 'Wage Protections, POSH Internal Committees & Maternity'}
                </h3>
                <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                  {isHindi
                    ? 'आंतरिक शिकायत समिति (POSH), 26 सप्ताह सवेतन मातृत्व अवकाश, वैधानिक ग्रेच्युटी और ओवरटाइम पारिश्रमिक।'
                    : 'Mandatory POSH internal committees, 26 weeks paid maternity leave, gratuity eligibility, and severance protections.'}
                </p>
              </Link>

              <Link
                to="/know-your-rights?category=tenant-property"
                className="group block py-4 hover:bg-paper/60 px-3 transition-colors rounded-xs"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-maroon font-bold">04 · {isHindi ? 'किरायेदार व संपत्ति' : 'Tenancy & Property'}</span>
                  <ArrowRight size={13} className="text-ink/40 group-hover:text-maroon group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                  {isHindi ? 'किरायेदारी सुरक्षा, अवैध बेदखली व बिजली-पानी' : 'Tenancy Protection, Unlawful Lockouts & Utilities'}
                </h3>
                <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                  {isHindi
                    ? 'बिजली-पानी काटने पर वैधानिक रोक, अवैध रूप से ताला लगाने पर पुलिस सुरक्षा और 24 घंटे का लिखित प्रवेश नोटिस।'
                    : 'Protection against cutting off essential electricity or water, summary eviction bans, and mandatory 24-hour entry notice.'}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Part III: Constitution of India — Editorial Section */}
      <section className="border-b border-border/80 bg-paper py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-2 block">
                {isHindi ? 'संविधान का भाग III (अनुच्छेद 12–35)' : 'Part III · Fundamental Rights'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                {isHindi ? 'संविधान से शुरुआत करें' : 'Start with the Constitution'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink/75 leading-relaxed">
                {isHindi
                  ? 'भारत का संविधान देश का सर्वोच्च कानून है। प्रत्येक संसदीय अधिनियम, पुलिस प्रक्रिया और प्रशासनिक आदेश को मौलिक अधिकारों के अनुरूप होना अनिवार्य है।'
                  : 'The Constitution of India is the supreme law of the Republic. Every statutory enactment, police regulation, and executive action remains subservient to the fundamental guarantees in Part III.'}
              </p>

              <div className="mt-6 divide-y divide-border/70 border-t border-b border-border/80">
                <div className="py-3 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-maroon shrink-0 pt-0.5">Art. 14</span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">
                      {isHindi ? 'कानून के समक्ष समानता' : 'Equality Before Law'}
                    </h3>
                    <p className="text-xs text-ink/70 mt-0.5">
                      {isHindi ? 'राज्य किसी भी व्यक्ति को कानून के समक्ष समानता या समान संरक्षण से वंचित नहीं करेगा।' : 'Equal protection of laws and non-arbitrariness in state actions.'}
                    </p>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-maroon shrink-0 pt-0.5">Art. 21</span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">
                      {isHindi ? 'प्राण और दैहिक स्वतंत्रता का संरक्षण' : 'Protection of Life & Personal Liberty'}
                    </h3>
                    <p className="text-xs text-ink/70 mt-0.5">
                      {isHindi ? 'विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त किसी को जीवन या स्वतंत्रता से वंचित नहीं किया जा सकता।' : 'Due process of law, privacy, dignity, and protection against arbitrary detention.'}
                    </p>
                  </div>
                </div>

                <div className="py-3 flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-maroon shrink-0 pt-0.5">Art. 32</span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy">
                      {isHindi ? 'संवैधानिक उपचारों का अधिकार' : 'Right to Constitutional Remedies'}
                    </h3>
                    <p className="text-xs text-ink/70 mt-0.5">
                      {isHindi ? 'मौलिक अधिकारों के प्रवर्तन के लिए सीधे सर्वोच्च न्यायालय में रिट याचिका का अधिकार।' : 'Direct access to the Supreme Court via writs of Habeas Corpus, Mandamus, and Certiorari.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button to="/fundamental-rights" variant="secondary" size="md" icon={ArrowRight}>
                  {isHindi ? 'सभी मौलिक अधिकार (अनुच्छेद 12–35) पढ़ें' : 'Read All Fundamental Rights (Articles 12–35)'}
                </Button>
              </div>
            </div>

            {/* Visual Anchor: Scales of Justice */}
            <div className="lg:col-span-4 flex justify-center">
              <img
                src="/images/3d-scales.svg"
                alt="Scales of Justice"
                className="w-48 sm:w-56 lg:w-64 h-auto object-contain select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Compare Laws Concordance: IPC 1860 ↔ BNS 2023 */}
      <section className="border-b border-border/80 bg-page py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="border-b border-border/80 pb-5 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-1 block">
                {isHindi ? 'आपराधिक कानून परिवर्तन (1 जुलाई 2024)' : 'Criminal Law Transformation'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                {isHindi ? 'कानूनों की तुलना: IPC 1860 ↔ BNS 2023' : 'Compare Laws: IPC 1860 ↔ BNS 2023'}
              </h2>
            </div>
            <Link
              to="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-maroon transition-colors shrink-0"
            >
              <span>{isHindi ? 'तुलनात्मक तालिका खोलें' : 'Open Full Concordance Table'}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/compare#murder-mob-lynching"
              className="group block p-4 bg-paper border border-border/80 rounded-xs hover:border-navy transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50 mb-1">
                <span>{isHindi ? 'शारीरिक अपराध' : 'Body & Life'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                {isHindi ? 'हत्या व मॉब लिंचिंग' : 'Murder & Mob Lynching'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 302 IPC ↔ Sec 103(1) &amp; (2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/65 line-clamp-2 leading-relaxed">
                {isHindi
                  ? '5 या अधिक व्यक्तियों द्वारा मॉब लिंचिंग पर अलग से मृत्युदंड अथवा आजीवन कारावास।'
                  : 'Adds autonomous capital punishment for mob lynching by groups of 5+.'}
              </p>
            </Link>

            <Link
              to="/compare#cheating-420"
              className="group block p-4 bg-paper border border-border/80 rounded-xs hover:border-navy transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50 mb-1">
                <span>{isHindi ? 'संपत्ति अपराध' : 'Property Offences'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                {isHindi ? 'धोखाधड़ी (चार सौ बीस)' : 'Cheating (Section 420)'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 420 IPC ↔ Sec 318(4) BNS
              </p>
              <p className="mt-2 text-xs text-ink/65 line-clamp-2 leading-relaxed">
                {isHindi
                  ? 'पारंपरिक "धारा 420" अब BNS में धारा 318(4) के रूप में समान तत्वों के साथ पुनर्गठित।'
                  : 'Classic "Section 420" re-indexed to Section 318(4) with identical elements.'}
              </p>
            </Link>

            <Link
              to="/compare#theft-community-service"
              className="group block p-4 bg-paper border border-border/80 rounded-xs hover:border-navy transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50 mb-1">
                <span>{isHindi ? 'संपत्ति अपराध' : 'Property Offences'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                {isHindi ? 'चोरी व सामुदायिक सेवा' : 'Theft & Community Service'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 379 IPC ↔ Sec 303(2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/65 line-clamp-2 leading-relaxed">
                {isHindi
                  ? '₹5,000 से कम की पहली चोरी पर संपत्ति लौटाने पर सामुदायिक सेवा का वैधानिक विकल्प।'
                  : 'Statutory community service for first-time theft valued below ₹5,000 upon restoration.'}
              </p>
            </Link>

            <Link
              to="/compare#death-by-negligence-hit-and-run"
              className="group block p-4 bg-paper border border-border/80 rounded-xs hover:border-navy transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50 mb-1">
                <span>{isHindi ? 'सड़क सुरक्षा' : 'Road Safety'}</span>
                <span className="text-amber-800 font-semibold">{isHindi ? 'स्थगित' : 'In Abeyance'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-maroon transition-colors">
                {isHindi ? 'हिट-एंड-रन वाहन दुर्घटना' : 'Hit-and-Run Driving'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 304A IPC ↔ Sec 106(1) &amp; (2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/65 line-clamp-2 leading-relaxed">
                {isHindi
                  ? 'धारा 106(2) का कठोर दंड परामर्श प्रक्रिया तक प्रशासनिक रूप से स्थगित रखा गया है।'
                  : '10-year penalty in 106(2) kept in executive abeyance pending consultations.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Indian Laws — Statutory Directory */}
      <section className="border-b border-border/80 bg-paper py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border/80 pb-5 mb-8">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-1 block">
                {isHindi ? 'केंद्रीय वैधानिक संहिताएं' : 'Statutory Codes'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                {isHindi ? 'भारतीय कानून निर्देशिका' : 'Explore Indian Laws'}
              </h2>
            </div>
            <Link
              to="/laws"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-maroon transition-colors"
            >
              <span>{isHindi ? 'सभी कानून देखें' : 'Browse All Central Acts'}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/laws/bns-2023"
              className="group block p-5 bg-page border border-border/80 rounded-xs hover:border-navy hover:bg-paper transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-ink/50 mb-2">
                <span className="text-maroon font-bold">Act 45 of 2023</span>
                <span>358 Sections</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-navy group-hover:text-maroon transition-colors">
                Bharatiya Nyaya Sanhita (BNS 2023)
              </h3>
              <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                The primary penal code replacing the Indian Penal Code 1860, codifying criminal offences, penalties, and exceptions.
              </p>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-navy">
                <span>View Full Gazette Text</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/laws/bnss-2023"
              className="group block p-5 bg-page border border-border/80 rounded-xs hover:border-navy hover:bg-paper transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-ink/50 mb-2">
                <span className="text-maroon font-bold">Act 46 of 2023</span>
                <span>531 Sections</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-navy group-hover:text-maroon transition-colors">
                Bharatiya Nagarik Suraksha Sanhita (BNSS 2023)
              </h3>
              <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                The procedural code replacing CrPC 1973, governing Zero FIRs, police custody, electronic summons, and trial timelines.
              </p>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-navy">
                <span>View Full Gazette Text</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>

            <Link
              to="/laws/consumer-protection-2019"
              className="group block p-5 bg-page border border-border/80 rounded-xs hover:border-navy hover:bg-paper transition-all"
            >
              <div className="flex items-center justify-between text-xs font-mono text-ink/50 mb-2">
                <span className="text-maroon font-bold">Act 35 of 2019</span>
                <span>107 Sections</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-navy group-hover:text-maroon transition-colors">
                Consumer Protection Act 2019
              </h3>
              <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                Comprehensive statutory framework for consumer rights, CCPA oversight, product liability, and online complaint dispute resolution.
              </p>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-medium text-navy">
                <span>View Act Provisions</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How Nyaya Works — Editorial Process with Court Pillars */}
      <section className="border-b border-border/80 bg-page py-14 sm:py-20">
        <div className="container-content max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-1 block">
                {isHindi ? 'नागरिक कार्यप्रणाली' : 'Method & Architecture'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-navy">
                {isHindi ? 'न्याय कैसे कार्य करता है' : 'How Nyaya Works'}
              </h2>
              <p className="mt-2 text-sm text-ink/75 leading-relaxed">
                {isHindi
                  ? 'चार सरल चरणों में जटिल कानूनी संहिताओं को सुलभ और बोधगम्य बनाना।'
                  : 'Transforming complex statutory language into legible, verifiable citizen awareness in four disciplined steps.'}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {howItWorksItems.map((item) => (
                  <div key={item.step} className="border-l-2 border-maroon pl-4 py-1">
                    <span className="font-mono text-xs font-bold text-maroon block">
                      {item.step}
                    </span>
                    <h3 className="mt-1 font-display text-base font-semibold text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <img
                src="/images/3d-court-pillars.svg"
                alt="Court Pillars illustration"
                className="w-48 sm:w-56 lg:w-60 h-auto object-contain select-none"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Primary Legal Sources */}
      <section className="py-14 sm:py-20 bg-paper">
        <div className="container-content max-w-3xl">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-maroon mb-2 block">
            {isHindi ? 'सत्यापन एवं पारदर्शिता' : 'Sources & Institutional Trust'}
          </span>
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            {isHindi
              ? 'पारदर्शी रूप से संकलित शैक्षणिक कानूनी जानकारी'
              : 'Educational Information, Sourced Transparently'}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
            {isHindi
              ? 'न्याय भारतीय कानूनों और मौलिक अधिकारों को सरल बोलचाल की भाषा में समझाने का सार्वजनिक सूचना स्रोत है। सभी व्याख्याएं आधिकारिक स्रोतों — भारत का संविधान, केंद्रीय अधिनियम और इंडिया कोड — से सत्यापित की जाती हैं। न्याय औपचारिक कानूनी सलाह नहीं देता और किसी योग्य अधिवक्ता के परामर्श का विकल्प नहीं है।'
              : 'Nyaya is a public-information resource for understanding Indian laws and fundamental rights in plain language. Explanations are cross-referenced against official sources — the Constitution of India, central Acts, and India Code — which are linked wherever available. Nyaya does not provide legal advice and is not a substitute for consulting a qualified lawyer about your specific situation.'}
          </p>
          <div className="mt-4">
            <Link
              to="/sources-methodology"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:text-maroon transition-colors"
            >
              <span>{isHindi ? 'हमारी संपूर्ण स्रोत एवं सत्यापन पद्धति पढ़ें' : 'Read our full Sources & Methodology'}</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="mt-8">
            <LegalDisclaimer tone="info">
              {isHindi
                ? 'अपनी विशिष्ट परिस्थितियों में मार्गदर्शन के लिए पंजीकृत अधिवक्ता अथवा निकटतम विधिक सेवा क्लिनिक से परामर्श लें।'
                : 'For guidance specific to your circumstances, consult a licensed advocate or your nearest legal aid clinic.'}
            </LegalDisclaimer>
          </div>
        </div>
      </section>
    </div>
  )
}
