import { useState, useMemo } from 'react'
import {
  CheckSquare,
  Square,
  Copy,
  Check,
  Printer,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Info,
  Shield,
  FileCheck,
  ChevronDown,
} from 'lucide-react'
import { documentChecklists } from '../../data/legalToolsData.js'
import BookmarkButton from '../BookmarkButton.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function DocumentChecklist({ initialTopicId }) {
  const { isHindi } = useLanguage()
  const [selectedTopicId, setSelectedTopicId] = useState(
    initialTopicId || documentChecklists[0]?.id || 'consumer-dispute'
  )
  const [checkedMap, setCheckedMap] = useState({})
  const [copied, setCopied] = useState(false)

  const activeChecklist = useMemo(() => {
    return documentChecklists.find((c) => c.id === selectedTopicId) || documentChecklists[0]
  }, [selectedTopicId])

  // Calculate total items and checked count
  const allItems = useMemo(() => {
    if (!activeChecklist) return []
    return activeChecklist.sections.flatMap((s) => s.items)
  }, [activeChecklist])

  const checkedCount = useMemo(() => {
    return allItems.filter((item) => checkedMap[item.id]).length
  }, [allItems, checkedMap])

  const percentage = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0

  const toggleItem = (itemId) => {
    setCheckedMap((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const handleReset = () => {
    const updated = { ...checkedMap }
    allItems.forEach((item) => {
      delete updated[item.id]
    })
    setCheckedMap(updated)
  }

  const handleCopy = async () => {
    if (!activeChecklist) return
    let text = `NYAYA LEGAL DOCUMENT CHECKLIST: ${activeChecklist.title}\n`
    text += `Governing Statute: ${activeChecklist.governingStatute}\n`
    text += `Official Portal: ${activeChecklist.officialPortal}\n`
    text += `Progress: ${checkedCount}/${allItems.length} documents gathered (${percentage}%)\n\n`

    activeChecklist.sections.forEach((sec) => {
      text += `=== ${sec.sectionTitle.toUpperCase()} ===\n`
      sec.items.forEach((item) => {
        const isChecked = !!checkedMap[item.id]
        text += `[${isChecked ? 'X' : ' '}] ${item.name}${item.required ? ' (Essential)' : ''}\n`
        text += `    Note: ${item.detail}\n`
      })
      text += '\n'
    })

    text += `Note: This checklist is strictly for educational record-keeping and fact preparation. Requirements vary across courts and administrative bodies.`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Topic Selection Bar */}
      <div className="rounded-sm border border-border bg-paper p-4 sm:p-5 shadow-2xs">
        <label
          htmlFor="checklist-topic-select"
          className="block text-xs font-mono uppercase tracking-wider text-navy font-semibold mb-2"
        >
          {isHindi ? '1. विषय चुनें' : '1. Select Legal / Administrative Topic'}
        </label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {documentChecklists.map((topic) => {
            const isSelected = topic.id === activeChecklist.id
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                aria-pressed={isSelected}
                className={`text-left p-3 rounded-xs border transition-all ${
                  isSelected
                    ? 'border-navy bg-navy/5 text-navy font-semibold shadow-2xs ring-1 ring-navy'
                    : 'border-border/80 bg-page/60 text-ink/80 hover:bg-page hover:border-brass'
                }`}
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-oxblood/80 font-medium">
                  {topic.category}
                </div>
                <div className="text-xs sm:text-sm font-display font-semibold mt-0.5 leading-snug">
                  {topic.title}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Checklist Display Card */}
      {activeChecklist && (
        <article className="rounded-sm border border-border bg-white shadow-2xs overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-page/50 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-brass-dark font-semibold uppercase tracking-wider bg-brass-faint/80 px-2 py-0.5 rounded-xs border border-brass/20">
                    {activeChecklist.category}
                  </span>
                  <span className="text-xs font-mono text-ink/50">
                    {activeChecklist.governingStatute}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-navy">
                  {activeChecklist.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-ink/75 leading-relaxed max-w-2xl">
                  {activeChecklist.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <BookmarkButton
                  item={{
                    id: `checklist-${activeChecklist.id}`,
                    title: `Checklist: ${activeChecklist.title}`,
                    category: activeChecklist.category,
                    type: 'guide',
                    description: activeChecklist.description,
                    url: `/tools?tool=checklist&topic=${activeChecklist.id}`,
                  }}
                  variant="button"
                  size="sm"
                />
              </div>
            </div>

            {/* Official Portal Reference */}
            {activeChecklist.officialPortal && (
              <div className="mt-4 pt-3 border-t border-border/60 flex flex-wrap items-center gap-2 text-xs text-ink/70">
                <span className="font-medium text-navy">{isHindi ? 'आधिकारिक पोर्टल:' : 'Primary Official Portal:'}</span>
                <span className="font-mono text-brass-dark font-medium">{activeChecklist.officialPortal}</span>
              </div>
            )}

            {/* Progress Meter */}
            <div className="mt-5 rounded-xs border border-border/80 bg-paper p-3.5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-navy">
                  {isHindi ? 'दस्तावेज़ संकलन प्रगति:' : 'Gathered Documents Progress:'}
                </span>
                <span className="font-mono font-bold text-navy">
                  {checkedCount} / {allItems.length} ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="h-full bg-brass-dark transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="p-5 sm:p-7 space-y-8">
            {activeChecklist.sections.map((section, sIdx) => (
              <section key={sIdx} aria-labelledby={`sec-title-${sIdx}`}>
                <h4
                  id={`sec-title-${sIdx}`}
                  className="font-mono text-xs font-bold uppercase tracking-wider text-navy pb-2 border-b border-border/80 flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-xs bg-navy text-white text-[10px]">
                    {sIdx + 1}
                  </span>
                  <span>{section.sectionTitle}</span>
                </h4>

                <div className="mt-3 divide-y divide-border/60">
                  {section.items.map((item) => {
                    const isChecked = !!checkedMap[item.id]
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`py-3.5 px-2.5 rounded-xs cursor-pointer transition-colors flex items-start gap-3 select-none ${
                          isChecked ? 'bg-stone-50/90' : 'hover:bg-page/50'
                        }`}
                        role="checkbox"
                        aria-checked={isChecked}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault()
                            toggleItem(item.id)
                          }
                        }}
                      >
                        <div className="mt-0.5 shrink-0 text-navy">
                          {isChecked ? (
                            <CheckSquare size={18} className="text-emerald-700" />
                          ) : (
                            <Square size={18} className="text-ink/40" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`text-xs sm:text-sm font-semibold transition-colors ${
                                isChecked ? 'line-through text-ink/50' : 'text-navy'
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.required ? (
                              <span className="font-mono text-[10px] uppercase font-bold text-oxblood-dark bg-oxblood/10 px-1.5 py-0.2 rounded-xs">
                                {isHindi ? 'अनिवार्य' : 'Core Evidence'}
                              </span>
                            ) : (
                              <span className="font-mono text-[10px] uppercase text-ink/50 bg-stone-100 px-1.5 py-0.2 rounded-xs">
                                {isHindi ? 'सहायक' : 'Corroborative'}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-ink/70 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Action Toolbar */}
          <div className="border-t border-border bg-page/40 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-paper text-xs font-semibold text-navy hover:bg-page transition-colors shadow-2xs"
              >
                {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
                <span>{copied ? (isHindi ? 'प्रतिलिपि बनाई गई!' : 'Checklist Copied!') : (isHindi ? 'चेकलिस्ट कॉपी करें' : 'Copy Text Checklist')}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-border bg-paper text-xs font-semibold text-navy hover:bg-page transition-colors shadow-2xs"
              >
                <Printer size={13} />
                <span>{isHindi ? 'प्रिंट करें' : 'Print / Save'}</span>
              </button>
            </div>

            {checkedCount > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs font-medium text-ink/60 hover:text-oxblood-dark transition-colors px-2 py-1"
              >
                <RotateCcw size={12} />
                <span>{isHindi ? 'चिह्न हटाएं' : 'Reset Checkmarks'}</span>
              </button>
            )}
          </div>
        </article>
      )}

      {/* Educational Notice */}
      <div className="rounded-sm border border-border/80 bg-stone-50 p-4 text-xs text-ink/75 leading-relaxed">
        <strong className="text-navy font-semibold">{isHindi ? 'शैक्षणिक सूचना:' : 'Educational Scope:'}</strong>{' '}
        {isHindi
          ? 'यह चेकलिस्ट केवल आपकी जानकारी को व्यवस्थित करने के लिए है। अदालत, उपभोक्ता आयोग या पुलिस थाने द्वारा आवश्यक दस्तावेज हर मामले की विशिष्ट परिस्थितियों के आधार पर भिन्न हो सकते हैं।'
          : 'This checklist is an educational aid for organizing factual records prior to seeking counsel or filing grievances. Document requirements vary based on specific circumstances, forum rules, and statutory amendments.'}
      </div>
    </div>
  )
}
