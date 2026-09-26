import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FileCheck,
  FileText,
  Compass,
  Scale,
  ShieldAlert,
  Info,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import DocumentChecklist from '../components/tools/DocumentChecklist.jsx'
import ComplaintPrepGuide from '../components/tools/ComplaintPrepGuide.jsx'
import LawTopicNavigator from '../components/tools/LawTopicNavigator.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function LegalTools() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t, isHindi } = useLanguage()

  const validTools = ['checklist', 'complaint', 'navigator']
  const initialTool = searchParams.get('tool')
  const [activeTool, setActiveTool] = useState(
    validTools.includes(initialTool) ? initialTool : 'checklist'
  )

  const initialTopic = searchParams.get('topic') || undefined
  const initialSituation = searchParams.get('situation') || undefined

  // Sync state if URL changes
  useEffect(() => {
    const current = searchParams.get('tool')
    if (validTools.includes(current) && current !== activeTool) {
      setActiveTool(current)
    }
  }, [searchParams])

  const handleToolChange = (toolKey) => {
    setActiveTool(toolKey)
    const newParams = new URLSearchParams(searchParams)
    newParams.set('tool', toolKey)
    setSearchParams(newParams)
  }

  const toolDefinitions = [
    {
      id: 'checklist',
      title: isHindi ? 'दस्तावेज़ चेकलिस्ट' : 'Document Checklist',
      subtitle: isHindi
        ? 'विभिन्न कानूनी विषयों के लिए आवश्यक दस्तावेजों की सूची'
        : 'Essential documents & evidence commonly relevant per topic',
      icon: FileCheck,
      badge: isHindi ? 'टूल 1' : 'Tool 1',
    },
    {
      id: 'complaint',
      title: isHindi ? 'शिकायत तैयारी गाइड' : 'Complaint Preparation Guide',
      subtitle: isHindi
        ? 'तिथि, पक्षों और तथ्यों को एक संरचित सारांश में व्यवस्थित करें'
        : 'Organize dates, parties, facts & evidence into a clear briefing summary',
      icon: FileText,
      badge: isHindi ? 'टूल 2' : 'Tool 2',
    },
    {
      id: 'navigator',
      title: isHindi ? 'कानून विषय नेविगेटर' : 'Law Topic Navigator',
      subtitle: isHindi
        ? 'अपनी परिस्थिति के अनुसार प्रासंगिक भारतीय कानून व धाराएं खोजें'
        : 'Explore relevant statutes, guides & terms for everyday scenarios',
      icon: Compass,
      badge: isHindi ? 'टूल 3' : 'Tool 3',
    },
  ]

  return (
    <div className="bg-paper min-h-screen text-ink py-8 sm:py-14">
      <div className="container-content max-w-5xl">
        {/* Header */}
        <header className="border-b border-border/80 pb-6 sm:pb-8">
          <div className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-page px-2.5 py-1 text-xs font-mono font-medium text-navy uppercase tracking-wider mb-3">
            <Scale size={13} className="text-brass-dark" aria-hidden="true" />
            <span>{isHindi ? 'नागरिक कानूनी उपकरण' : 'Educational Legal Tools & Preparation Aids'}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy tracking-tight leading-tight">
            {isHindi ? 'कानूनी तैयारी उपकरण' : 'Citizen Legal Tools'}
          </h1>

          <p className="mt-3 text-base sm:text-lg text-ink/75 leading-relaxed max-w-3xl">
            {isHindi
              ? 'तथ्यों को क्रमबद्ध करने, आवश्यक दस्तावेजों की सूची जांचने और सामान्य परिस्थितियों के लिए प्रासंगिक भारतीय कानूनों को समझने के लिए इंटरैक्टिव शैक्षणिक उपकरण।'
              : 'Interactive, non-advisory educational aids to help citizens assemble facts, check required records, and navigate relevant Indian statutes.'}
          </p>

          {/* Institutional Advisory Disclaimer Banner */}
          <div className="mt-5 flex items-start gap-3 rounded-sm border border-navy/20 bg-stone-50 p-4 text-xs text-ink/80 leading-relaxed">
            <Info size={17} className="text-navy shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="text-navy font-semibold">
                {isHindi ? 'शैक्षणिक उपकरण, कानूनी सलाह नहीं:' : 'Educational Tools, Not Legal Advice:'}
              </strong>{' '}
              {isHindi
                ? 'ये उपकरण केवल आपकी जानकारी व्यवस्थित करने के लिए हैं। ये किसी कानूनी विवाद के परिणाम की भविष्यवाणी नहीं करते, देयता निर्धारित नहीं करते, और किसी वकील द्वारा औपचारिक परामर्श का विकल्प नहीं हैं।'
                : 'These preparation tools do not predict legal outcomes, determine liability, promise compensation, or claim procedural sufficiency. They are intended for personal educational fact-assembly.'}
            </div>
          </div>

          {/* AI Workflow Quick Callout */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-sm border border-brass/40 bg-page/90 p-4">
            <div className="flex items-center gap-2.5">
              <Sparkles size={18} className="text-brass-dark shrink-0" aria-hidden="true" />
              <div>
                <span className="font-display font-semibold text-sm text-navy block">
                  {isHindi ? 'विशिष्ट कानूनी प्रश्न पूछना चाहते हैं?' : 'Have a specific situation to analyze?'}
                </span>
                <span className="text-xs text-ink/70">
                  {isHindi
                    ? 'नियंत्रित एआई सूचना कार्यप्रवाह चलाएं जो सीधे सत्यापित भारतीय संहिताओं से उत्तर देता है।'
                    : 'Run Nyaya’s controlled AI Information Workflow grounded in verified central statutes.'}
                </span>
              </div>
            </div>
            <Link
              to="/workflow"
              className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xs bg-navy px-3 py-1.5 text-xs font-semibold text-paper hover:bg-navy-light transition-colors whitespace-nowrap"
            >
              <span>{isHindi ? 'एआई कार्यप्रवाह चलाएं' : 'Run AI Workflow'}</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </header>

        {/* 3-Tool Navigation Switcher */}
        <nav aria-label="Legal Tools Tabs" className="mt-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {toolDefinitions.map((tool) => {
              const active = activeTool === tool.id
              const Icon = tool.icon

              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleToolChange(tool.id)}
                  aria-pressed={active}
                  className={`text-left p-4 sm:p-5 rounded-sm border transition-all flex flex-col justify-between ${
                    active
                      ? 'border-navy bg-white shadow-sm ring-2 ring-navy/80'
                      : 'border-border/80 bg-page/60 hover:bg-page hover:border-brass/70 text-ink/80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xs transition-colors ${
                          active ? 'bg-navy text-paper' : 'bg-navy/10 text-navy'
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-[10px] uppercase font-bold text-oxblood/80 bg-stone-100 px-1.5 py-0.5 rounded-2xs">
                        {tool.badge}
                      </span>
                    </div>

                    <h2
                      className={`font-display text-base sm:text-lg font-bold transition-colors ${
                        active ? 'text-navy' : 'text-navy/85'
                      }`}
                    >
                      {tool.title}
                    </h2>
                    <p className="mt-1 text-xs text-ink/65 leading-relaxed line-clamp-2">
                      {tool.subtitle}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border/50 flex items-center justify-between text-xs font-semibold">
                    <span className={active ? 'text-navy' : 'text-brass-dark'}>
                      {active ? (isHindi ? 'सक्रिय उपकरण' : 'Active Tool') : (isHindi ? 'उपकरण खोलें →' : 'Open Tool →')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </nav>

        {/* Selected Tool Render Container */}
        <main className="mt-10" id="tool-content">
          {activeTool === 'checklist' && (
            <DocumentChecklist initialTopicId={initialTopic} />
          )}

          {activeTool === 'complaint' && <ComplaintPrepGuide />}

          {activeTool === 'navigator' && (
            <LawTopicNavigator initialSituationId={initialSituation} />
          )}
        </main>
      </div>
    </div>
  )
}
