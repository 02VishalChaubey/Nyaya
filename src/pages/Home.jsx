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
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import SearchBar from '../components/SearchBar.jsx'
import RightCard from '../components/RightCard.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import LoadingState from '../components/LoadingState.jsx'
import OfflineNotice from '../components/OfflineNotice.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import { useApi } from '../hooks/useApi.js'
import { fetchRights, fetchCategories } from '../api/client.js'
import { fundamentalRights as fallbackRights } from '../data/rights.js'
import { categories as fallbackCategories } from '../data/categories.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const LOOKING_FOR = [
  {
    icon: Shield,
    label: 'Know Your Rights',
    description: 'Everyday citizen rights across 8 life areas.',
    to: '/know-your-rights',
  },
  {
    icon: Scale,
    label: 'Fundamental Rights',
    description: 'Constitutional protections every citizen holds.',
    to: '/fundamental-rights',
  },
  {
    icon: BookOpen,
    label: 'Indian Laws',
    description: 'Browse statutes and codes by category.',
    to: '/laws',
  },
  {
    icon: BookMarked,
    label: 'Legal Terms',
    description: 'Plain-language definitions of common terms.',
    to: '/legal-terms',
  },
  {
    icon: ShieldAlert,
    label: 'What happened?',
    description: 'Describe a situation to find what applies.',
    to: '/harmed',
  },
  {
    icon: Compass,
    label: 'Legal Tools',
    description: 'Document checklists, complaint guide & law navigator.',
    to: '/tools',
  },
  {
    icon: Sparkles,
    label: 'AI Information Workflow',
    description: 'Controlled question analysis grounded in verified statutes.',
    to: '/workflow',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Describe',
    description: 'Tell us what happened, in your own words — no legal terminology required.',
  },
  {
    step: '02',
    title: 'Find',
    description: 'Nyaya matches your situation to relevant laws, sections, and constitutional rights.',
  },
  {
    step: '03',
    title: 'Understand',
    description: 'Read a plain-language explanation of what applies to your situation and why.',
  },
  {
    step: '04',
    title: 'Verify',
    description: 'Cross-check the explanation against the official Acts and government sources cited.',
  },
]

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

  const lookingForItems = [
    {
      icon: Shield,
      label: isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights',
      description: isHindi
        ? 'दैनिक जीवन के 8 प्रमुख क्षेत्रों में नागरिक अधिकार।'
        : 'Everyday citizen rights across 8 life areas.',
      to: '/know-your-rights',
    },
    {
      icon: Scale,
      label: isHindi ? 'मौलिक अधिकार (Part III)' : 'Fundamental Rights',
      description: isHindi
        ? 'संविधान द्वारा प्रत्येक नागरिक को प्रदत्त मूल अधिकार।'
        : 'Constitutional protections every citizen holds.',
      to: '/fundamental-rights',
    },
    {
      icon: BookOpen,
      label: isHindi ? 'भारतीय कानून (Acts)' : 'Indian Laws',
      description: isHindi
        ? 'संसदीय अधिनियम और संहिताओं का श्रेणीवार अवलोकन।'
        : 'Browse statutes and codes by category.',
      to: '/laws',
    },
    {
      icon: BookMarked,
      label: isHindi ? 'कानूनी शब्दावली' : 'Legal Terms',
      description: isHindi
        ? 'सामान्य कानूनी शब्दों की सरल हिंदी व्याख्या।'
        : 'Plain-language definitions of common terms.',
      to: '/legal-terms',
    },
    {
      icon: ShieldAlert,
      label: isHindi ? 'क्या घटना घटी?' : 'What happened?',
      description: isHindi
        ? 'अपनी समस्या बताएं और लागू कानूनी उपचार जानें।'
        : 'Describe a situation to find what applies.',
      to: '/harmed',
    },
    {
      icon: Compass,
      label: isHindi ? 'कानूनी टूल्स' : 'Legal Tools',
      description: isHindi
        ? 'दस्तावेज़ चेकलिस्ट, शिकायत तैयारी व कानून नेविगेटर।'
        : 'Document checklists, complaint guide & law navigator.',
      to: '/tools',
    },
    {
      icon: Sparkles,
      label: isHindi ? 'एआई सूचना कार्यप्रवाह' : 'AI Legal Workflow',
      description: isHindi
        ? 'सत्यापित संहिताओं पर आधारित नियंत्रित कानूनी सवाल-जवाब।'
        : 'Controlled question analysis grounded in verified statutes.',
      to: '/workflow',
    },
  ]

  const howItWorksItems = [
    {
      step: '01',
      title: isHindi ? 'बताएं' : 'Describe',
      description: isHindi
        ? 'अपनी समस्या अपने शब्दों में बताएं — किसी कानूनी शब्दावली की आवश्यकता नहीं है।'
        : 'Tell us what happened, in your own words — no legal terminology required.',
    },
    {
      step: '02',
      title: isHindi ? 'खोजें' : 'Find',
      description: isHindi
        ? 'न्याय आपकी स्थिति को प्रासंगिक कानूनों, धाराओं और अधिकारों से जोड़ता है।'
        : 'Nyaya matches your situation to relevant laws, sections, and constitutional rights.',
    },
    {
      step: '03',
      title: isHindi ? 'समझें' : 'Understand',
      description: isHindi
        ? 'सरल भाषा में पढ़ें कि आपकी स्थिति में कौन सा कानून लागू होता है और क्यों।'
        : 'Read a plain-language explanation of what applies to your situation and why.',
    },
    {
      step: '04',
      title: isHindi ? 'सत्यापित करें' : 'Verify',
      description: isHindi
        ? 'स्पष्टीकरण को आधिकारिक अधिनियमों और सरकारी राजपत्र स्रोतों से सत्यापित करें।'
        : 'Cross-check the explanation against the official Acts and government sources cited.',
    },
  ]

  return (
    <>
      {/* Hero — restrained, single idea */}
      <Hero
        eyebrow="Nyaya"
        title={t('home.title', 'Indian Law, Explained Clearly.')}
        subtitle={t(
          'home.subtitle',
          'A public legal-information platform helping citizens understand Indian laws, fundamental rights, and legal remedies — clearly, accurately, and without jargon.'
        )}
        size="lg"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/harmed" size="lg" variant="primary" icon={ArrowRight}>
            {isHindi ? 'क्या घटना घटी?' : 'Describe What Happened'}
          </Button>
          <Button to="/laws" size="lg" variant="secondary">
            {isHindi ? 'भारतीय कानून निर्देशिका' : 'Explore Indian Laws'}
          </Button>
        </div>
        <div className="mt-8 max-w-xl">
          <div className="text-xs font-mono uppercase tracking-wider text-ink/60 mb-2">
            {isHindi
              ? 'भारतीय अधिनियम, धाराएं एवं संवैधानिक अधिकार खोजें'
              : 'Search Indian statutes, sections & rights'}
          </div>
          <SearchBar
            placeholder={
              isHindi
                ? 'कानून, धारा 103, "जमानत क्या है", अनुच्छेद 21 खोजें...'
                : 'Search laws, "section 103", "what is bail", "article 21"...'
            }
            onSearch={(val) => {
              if (val) navigate(`/search?q=${encodeURIComponent(val)}`)
            }}
            showShortcut
          />
        </div>
      </Hero>

      {/* What are you looking for? — editorial navigation */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="container-content">
          <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
            {isHindi ? 'आप क्या खोजना चाहते हैं?' : 'What are you looking for?'}
          </h2>
          <div className="mt-8 grid gap-8 border-t border-border sm:grid-cols-2 lg:grid-cols-5 lg:divide-x lg:divide-border">
            {lookingForItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group block pt-6 lg:px-6 lg:first:pl-0 lg:last:pr-0"
                >
                  <Icon size={18} className="text-brass-dark" aria-hidden="true" />
                  <h3 className="mt-3 font-display text-base font-semibold text-navy group-hover:text-brass-dark transition-colors">
                    {item.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">
                    {item.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Start with the Constitution */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="container-content">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">
                {isHindi ? 'संविधान का भाग III (अनुच्छेद 12–35)' : 'Part III of the Constitution'}
              </span>
              <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
                {isHindi ? 'संविधान से शुरुआत करें' : 'Start with the Constitution'}
              </h2>
            </div>
          </div>

          <div className="mt-8">
            {rightsFallback && <OfflineNotice className="mb-4" />}
            {rightsLoading ? (
              <LoadingState label={isHindi ? 'मौलिक अधिकार लोड हो रहे हैं...' : 'Loading fundamental rights...'} />
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {fundamentalRights.slice(0, 3).map((right) => (
                    <RightCard key={right.id} right={right} compact />
                  ))}
                </div>
                <div className="mt-8">
                  <Button to="/fundamental-rights" variant="secondary" size="md" icon={ArrowRight}>
                    {isHindi
                      ? `सभी ${fundamentalRights.length} मौलिक अधिकार देखें`
                      : `View All ${fundamentalRights.length} Fundamental Rights`}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Know Your Rights Hub Highlight */}
      <section className="border-b border-border bg-[#F7F5F0] py-14 sm:py-20">
        <div className="container-content">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">
                {isHindi ? 'नागरिक सुरक्षा और व्यावहारिक कानून' : 'Citizen Protections & Practical Law'}
              </span>
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                {isHindi ? 'अपने अधिकार जानें' : 'Know Your Rights'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink/75 leading-relaxed">
                {isHindi
                  ? 'दैनिक जीवन में स्पष्ट, व्यावहारिक कानूनी सुरक्षा। पुलिस पूछताछ, कार्यस्थल, किरायेदारी विवाद, खरीदारी और साइबर सुरक्षा के दौरान अपने वैधानिक अधिकार जानें।'
                  : 'Clear, actionable legal protections across everyday life. Learn your statutory rights during police questioning, at the workplace, in tenancy disputes, when shopping, and in cyber safety.'}
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/know-your-rights" variant="primary" size="md" icon={ArrowRight}>
                {isHindi ? 'सभी अधिकार देखें' : 'Explore All Rights'}
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/know-your-rights?category=police-enforcement"
              className="group block rounded-sm border border-border bg-paper p-5 hover:border-navy/40 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2">
                <Shield size={14} className="text-brass-dark" />
                <span>{isHindi ? 'पुलिस व हिरासत' : 'Police & Custody'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-brass-dark transition-colors">
                {isHindi ? 'गिरफ्तारी व पूछताछ' : 'Arrest & Interrogation'}
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                {isHindi
                  ? '24 घंटे में मजिस्ट्रेट पेशी, गिरफ्तारी का कारण, जमानत सूचना और महिलाओं की गिरफ्तारी के नियम।'
                  : 'The 24-hour Magistrate rule, grounds of arrest, bail notification, and women arrest safeguards.'}
              </p>
            </Link>

            <Link
              to="/know-your-rights?category=consumer-rights"
              className="group block rounded-sm border border-border bg-paper p-5 hover:border-navy/40 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2">
                <ShoppingBag size={14} className="text-brass-dark" />
                <span>{isHindi ? 'उपभोक्ता अधिकार' : 'Consumer Rights'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-brass-dark transition-colors">
                {isHindi ? 'दोषपूर्ण सामान व रिफंड' : 'Defective Goods & Refunds'}
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                {isHindi
                  ? 'ई-दाखिल से ऑनलाइन शिकायत, ₹5 लाख तक शून्य अदालती शुल्क और उत्पाद दायित्व दावे।'
                  : 'E-commerce complaint filing via e-Daakhil, zero court fees up to ₹5L, and product liability claims.'}
              </p>
            </Link>

            <Link
              to="/know-your-rights?category=workplace-rights"
              className="group block rounded-sm border border-border bg-paper p-5 hover:border-navy/40 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2">
                <Briefcase size={14} className="text-brass-dark" />
                <span>{isHindi ? 'कार्यस्थल अधिकार' : 'Workplace Rights'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-brass-dark transition-colors">
                {isHindi ? 'श्रम, POSH व वेतन' : 'Labor, POSH & Wages'}
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                {isHindi
                  ? 'आंतरिक शिकायत समिति (POSH), 26 सप्ताह सवेतन मातृत्व अवकाश, ग्रेच्युटी और ओवरटाइम नियम।'
                  : 'POSH Internal Committees, 26 weeks paid maternity leave, severance pay, and overtime rules.'}
              </p>
            </Link>

            <Link
              to="/know-your-rights?category=tenant-property"
              className="group block rounded-sm border border-border bg-paper p-5 hover:border-navy/40 hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2">
                <HomeIcon size={14} className="text-brass-dark" />
                <span>{isHindi ? 'किरायेदार व संपत्ति' : 'Tenant & Property'}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-navy group-hover:text-brass-dark transition-colors">
                {isHindi ? 'किरायेदारी व बेदखली' : 'Tenancy & Possession'}
              </h3>
              <p className="mt-2 text-xs text-ink/70 leading-relaxed">
                {isHindi
                  ? 'बिजली-पानी काटने पर रोक, अवैध रूप से ताला लगाने पर कानूनी संरक्षण और 24 घंटे का प्रवेश नोटिस।'
                  : 'Protection against cutting off electricity or water, unlawful lockouts, and 24-hour entry notice.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Compare Laws: IPC 1860 ↔ BNS 2023 Concordance Feature */}
      <section className="border-b border-border bg-[#FBF9F5] py-14 sm:py-20">
        <div className="container-content">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">
                {isHindi ? 'वैधानिक तुलनात्मक चार्ट' : 'Statutory Concordance'}
              </span>
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl lg:text-4xl">
                {isHindi ? 'कानूनों की तुलना: IPC 1860 ↔ BNS 2023' : 'Compare Laws: IPC 1860 ↔ BNS 2023'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ink/75 leading-relaxed">
                {isHindi
                  ? '1 जुलाई 2024 से भारत का आपराधिक कानूनी ढांचा परिवर्तित हो चुका है। सटीक धारा परिवर्तन, संशोधित दंड प्रावधान, सरल भाषा में अंतर और सत्यापित तुलनात्मक मैपिंग समझें।'
                  : 'India’s criminal legal framework underwent historic transformation on 1 July 2024. Understand the exact statutory section shifts, substantive penalties, plain-language differences, and verified concordance mappings.'}
              </p>
            </div>
            <div className="shrink-0">
              <Button to="/compare" variant="primary" size="md" icon={ArrowRight}>
                {isHindi ? 'तुलनात्मक तालिका खोलें' : 'Open Comparison Ledger'}
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/compare#murder-mob-lynching"
              className="group block rounded-sm border border-stone-200 bg-white p-4 hover:border-brass hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50">
                <span>{isHindi ? 'शारीरिक अपराध' : 'Body & Life'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="mt-2 font-serif text-base font-bold text-navy group-hover:text-brass-dark">
                {isHindi ? 'हत्या व मॉब लिंचिंग' : 'Murder & Mob Lynching'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 302 IPC ↔ Sec 103(1) &amp; (2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                {isHindi
                  ? '5 या अधिक व्यक्तियों द्वारा मॉब लिंचिंग पर अलग से मृत्युदंड अथवा आजीवन कारावास।'
                  : 'Adds autonomous capital punishment for mob lynching by groups of 5+.'}
              </p>
            </Link>

            <Link
              to="/compare#cheating-420"
              className="group block rounded-sm border border-stone-200 bg-white p-4 hover:border-brass hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50">
                <span>{isHindi ? 'संपत्ति अपराध' : 'Property Offences'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="mt-2 font-serif text-base font-bold text-navy group-hover:text-brass-dark">
                {isHindi ? 'धोखाधड़ी (चार सौ बीस)' : 'Cheating (Chaar Sau Bees)'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 420 IPC ↔ Sec 318(4) BNS
              </p>
              <p className="mt-2 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                {isHindi
                  ? 'पारंपरिक "धारा 420" अब BNS में धारा 318(4) के रूप में समान तत्वों के साथ पुनर्गठित।'
                  : 'Classic "Section 420" re-indexed to Section 318(4) with identical elements.'}
              </p>
            </Link>

            <Link
              to="/compare#theft-community-service"
              className="group block rounded-sm border border-stone-200 bg-white p-4 hover:border-brass hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50">
                <span>{isHindi ? 'संपत्ति अपराध' : 'Property Offences'}</span>
                <span className="text-forest font-semibold">{isHindi ? 'सत्यापित' : 'Verified'}</span>
              </div>
              <h3 className="mt-2 font-serif text-base font-bold text-navy group-hover:text-brass-dark">
                {isHindi ? 'चोरी व सामुदायिक सेवा' : 'Theft & Community Service'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 379 IPC ↔ Sec 303(2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                {isHindi
                  ? '₹5,000 से कम की पहली चोरी पर संपत्ति लौटाने पर सामुदायिक सेवा (Community Service) का प्रावधान।'
                  : 'Mandates restorative community service for first-time theft below ₹5,000.'}
              </p>
            </Link>

            <Link
              to="/compare#death-by-negligence-hit-and-run"
              className="group block rounded-sm border border-amber-300 bg-amber-50/30 p-4 hover:border-amber-400 hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-ink/50">
                <span>{isHindi ? 'सड़क सुरक्षा' : 'Road Safety'}</span>
                <span className="text-amber-800 font-semibold">{isHindi ? 'स्थगित' : 'In Abeyance'}</span>
              </div>
              <h3 className="mt-2 font-serif text-base font-bold text-navy group-hover:text-brass-dark">
                {isHindi ? 'हिट-एंड-रन वाहन दुर्घटना' : 'Hit-and-Run Driving'}
              </h3>
              <p className="mt-1 text-xs font-mono text-ink/70">
                Sec 304A IPC ↔ Sec 106(1) &amp; (2) BNS
              </p>
              <p className="mt-2 text-xs text-ink/60 line-clamp-2 leading-relaxed">
                {isHindi
                  ? 'धारा 106(2) का 10 वर्ष का कठोर दंड परामर्श प्रक्रिया तक प्रशासनिक रूप से स्थगित रखा गया है।'
                  : '10-year penalty in 106(2) placed in executive abeyance pending consultations.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Indian Laws */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="container-content">
          <div>
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-brass-dark mb-2 block">
              {isHindi ? 'केंद्रीय वैधानिक संहिताएं' : 'Statutory Codes'}
            </span>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
              {isHindi ? 'भारतीय कानून निर्देशिका' : 'Explore Indian Laws'}
            </h2>
          </div>

          <div className="mt-8">
            {categoriesFallback && <OfflineNotice className="mb-4" />}
            {categoriesLoading ? (
              <LoadingState label={isHindi ? 'श्रेणियां लोड हो रही हैं...' : 'Loading categories...'} />
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {categories.slice(0, 4).map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
                <div className="mt-8">
                  <Button to="/laws" variant="secondary" size="md" icon={ArrowRight}>
                    {isHindi
                      ? `सभी ${categories.length} कानूनी श्रेणियां देखें`
                      : `Browse All ${categories.length} Law Categories`}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How Nyaya works */}
      <section className="border-b border-border py-14 sm:py-20">
        <div className="container-content">
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            {isHindi ? 'न्याय कैसे कार्य करता है' : 'How Nyaya Works'}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksItems.map((item, idx) => (
              <div key={item.step} className="relative">
                <span className="font-mono text-xs font-semibold text-ink/40">{item.step}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{item.description}</p>
                {idx < howItWorksItems.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="absolute -right-6 top-1 hidden text-ink/25 lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-14 sm:py-20">
        <div className="container-content">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">
              {isHindi
                ? 'पारदर्शी रूप से संकलित शैक्षणिक कानूनी जानकारी'
                : 'Educational information, sourced transparently'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              {isHindi
                ? 'न्याय भारतीय कानूनों और मौलिक अधिकारों को सरल बोलचाल की भाषा में समझाने का सार्वजनिक सूचना स्रोत है। सभी व्याख्याएं आधिकारिक स्रोतों — भारत का संविधान, केंद्रीय अधिनियम और इंडिया कोड — से सत्यापित की जाती हैं। न्याय औपचारिक कानूनी सलाह नहीं देता और किसी योग्य अधिवक्ता के परामर्श का विकल्प नहीं है।'
                : 'Nyaya is a public-information resource for understanding Indian laws and fundamental rights in plain language. Explanations are cross-referenced against official sources — the Constitution of India, central Acts, and India Code — which are linked wherever available. Nyaya does not provide legal advice and is not a substitute for consulting a qualified lawyer about your specific situation.'}
            </p>
            <Link
              to="/sources-methodology"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brass-dark"
            >
              {isHindi
                ? 'हमारी संपूर्ण स्रोत एवं सत्यापन पद्धति पढ़ें'
                : 'Read our full Sources & Methodology'}{' '}
              <ArrowRight size={14} />
            </Link>
            <div className="mt-6">
              <LegalDisclaimer tone="info">
                {isHindi
                  ? 'अपनी विशिष्ट परिस्थितियों में मार्गदर्शन के लिए पंजीकृत अधिवक्ता अथवा निकटतम विधिक सेवा क्लिनिक से परामर्श लें।'
                  : 'For guidance specific to your circumstances, consult a licensed advocate or your nearest legal aid clinic.'}
              </LegalDisclaimer>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
