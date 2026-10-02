import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Compass,
  ExternalLink,
  BookOpen,
  Scale,
  Building,
  HelpCircle,
  Search,
  Bookmark,
  Share2,
  Printer,
  ChevronRight,
  Layers,
} from 'lucide-react'
import Hero from '../components/Hero.jsx'
import Button from '../components/Button.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import BookmarkButton from '../components/BookmarkButton.jsx'
import OfficialSourceLink from '../components/OfficialSourceLink.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import {
  runAiWorkflow,
  AI_WORKFLOW_TOPIC_OPTIONS,
  SAMPLE_QUESTIONS,
} from '../services/aiWorkflowService.js'

export default function AiWorkflow() {
  const { isHindi } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialQ = searchParams.get('q') || ''
  const initialTopic = searchParams.get('topic') || 'all'

  const [question, setQuestion] = useState(initialQ)
  const [selectedTopic, setSelectedTopic] = useState(initialTopic)
  const [status, setStatus] = useState(initialQ ? 'loading' : 'idle') // 'idle' | 'loading' | 'success' | 'error'
  const [loadingStep, setLoadingStep] = useState(1)
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  // If query param is provided on mount, trigger workflow automatically
  useEffect(() => {
    if (initialQ && initialQ.trim().length >= 3) {
      handleExecute(initialQ, initialTopic)
    }
  }, [])

  async function handleExecute(qToRun = question, topicToRun = selectedTopic) {
    const cleanQ = qToRun.trim()
    if (!cleanQ || cleanQ.length < 3) {
      setErrorMessage(
        isHindi
          ? 'कृपया कम से कम 3 अक्षरों का कानूनी प्रश्न या स्थिति दर्ज करें।'
          : 'Please enter a valid legal question or situation (minimum 3 characters).'
      )
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')
    setLoadingStep(1)

    // Update URL query parameters cleanly
    const params = new URLSearchParams()
    params.set('q', cleanQ)
    if (topicToRun && topicToRun !== 'all') params.set('topic', topicToRun)
    setSearchParams(params, { replace: true })

    // Simulate multi-step progress indicator for controlled workflow visibility
    const stepTimer1 = setTimeout(() => setLoadingStep(2), 500)
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 1100)
    const stepTimer3 = setTimeout(() => setLoadingStep(4), 1700)

    try {
      const data = await runAiWorkflow({
        question: cleanQ,
        preferredTopic: topicToRun === 'all' ? undefined : topicToRun,
      })

      clearTimeout(stepTimer1)
      clearTimeout(stepTimer2)
      clearTimeout(stepTimer3)

      setResult(data)
      setStatus('success')
    } catch (err) {
      clearTimeout(stepTimer1)
      clearTimeout(stepTimer2)
      clearTimeout(stepTimer3)
      console.error('Workflow error:', err)
      setErrorMessage(
        isHindi
          ? 'सूचना कार्यप्रवाह चलाने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'An error occurred while executing the information workflow. Please try again.'
      )
      setStatus('error')
    }
  }

  function handleReset() {
    setQuestion('')
    setResult(null)
    setStatus('idle')
    setErrorMessage('')
    setSearchParams({}, { replace: true })
  }

  function handleSelectSample(sample) {
    const text = isHindi && sample.hindiText ? sample.hindiText : sample.text
    setQuestion(text)
    setSelectedTopic(sample.topic || 'all')
    handleExecute(text, sample.topic || 'all')
  }

  return (
    <>
      <Hero
        eyebrow={isHindi ? 'सत्यापित कानूनी सूचना कार्यप्रवाह' : 'Controlled Legal Information Workflow'}
        title={isHindi ? 'एआई सूचना कार्यप्रवाह' : 'AI Legal Information Workflow'}
        subtitle={
          isHindi
            ? 'एक नियंत्रित, बहु-चरणीय सूचना पाइपलाइन जो बिना किसी मनगढ़ंत कानूनी दावों के केवल सत्यापित भारतीय संहिताओं पर आधारित सरल व्याख्या प्रस्तुत करती है।'
            : 'A controlled, retrieval-grounded educational pipeline. Identifies topics, retrieves verified Nyaya statutory records, and generates plain explanations without hallucinating laws or citations.'
        }
        size="md"
      />

      <div className="bg-paper min-h-screen text-ink pb-20">
        {/* Architecture Pipeline Stepper */}
        <section className="border-b border-border bg-page/60 py-4 px-4 sm:px-6">
          <div className="container-content max-w-5xl">
            <div className="flex items-center justify-between gap-1 overflow-x-auto text-[11px] font-mono uppercase tracking-wider text-ink/70 py-1">
              <span className="flex items-center gap-1.5 font-semibold text-navy shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-paper text-[10px]">1</span>
                <span>{isHindi ? 'नागरिक प्रश्न' : 'User Question'}</span>
              </span>
              <ChevronRight size={13} className="text-border shrink-0" aria-hidden="true" />
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-navy text-[10px] font-bold">2</span>
                <span>{isHindi ? 'विषय पहचान' : 'Identify Topic'}</span>
              </span>
              <ChevronRight size={13} className="text-border shrink-0" aria-hidden="true" />
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-navy text-[10px] font-bold">3</span>
                <span>{isHindi ? 'सत्यापित खोज' : 'Retrieve Records'}</span>
              </span>
              <ChevronRight size={13} className="text-border shrink-0" aria-hidden="true" />
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-navy text-[10px] font-bold">4</span>
                <span>{isHindi ? 'प्रासंगिक धाराएं' : 'Match Laws'}</span>
              </span>
              <ChevronRight size={13} className="text-border shrink-0" aria-hidden="true" />
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-navy text-[10px] font-bold">5</span>
                <span>{isHindi ? 'सरल व्याख्या' : 'Plain Explanation'}</span>
              </span>
              <ChevronRight size={13} className="text-border shrink-0" aria-hidden="true" />
              <span className="flex items-center gap-1.5 shrink-0">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-navy text-[10px] font-bold">6</span>
                <span>{isHindi ? 'सरकारी स्रोत' : 'Show Sources'}</span>
              </span>
            </div>
          </div>
        </section>

        <main className="container-content max-w-4xl py-8 sm:py-12 space-y-8">
          {/* Question Input Card */}
          <section
            aria-labelledby="workflow-input-heading"
            className="rounded-xs border border-border/80 bg-paper p-5 sm:p-7 shadow-2xs"
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 id="workflow-input-heading" className="font-display text-lg font-semibold text-navy flex items-center gap-2">
                <Scale size={18} className="text-maroon" aria-hidden="true" />
                <span>{isHindi ? 'कानूनी प्रश्न दर्ज करें' : 'Describe What You Want to Understand'}</span>
              </h2>
              {status === 'success' && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs text-ink/70 hover:text-navy font-mono"
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  <span>{isHindi ? 'नया प्रश्न' : 'Ask Another'}</span>
                </button>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleExecute()
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="user-legal-question" className="sr-only">
                  Legal Question or Situation
                </label>
                <textarea
                  id="user-legal-question"
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'उदा. "मेरा मकान मालिक मेरी जमा राशि वापस नहीं कर रहा है" या "क्या पुलिस बिना वारंट के गिरफ्तार कर सकती है?"'
                      : 'e.g. "My landlord isn\'t returning my deposit." or "Can police arrest without a warrant?"'
                  }
                  className="w-full rounded-xs border border-border bg-page/50 p-3.5 text-sm sm:text-base text-ink placeholder:text-ink/40 focus:border-navy focus:bg-paper focus:outline-hidden focus:ring-1 focus:ring-navy leading-relaxed"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Controls: Domain selector + Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <label htmlFor="domain-select" className="text-xs font-mono text-ink/70 shrink-0">
                    {isHindi ? 'कानूनी क्षेत्र:' : 'Domain:'}
                  </label>
                  <select
                    id="domain-select"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    disabled={status === 'loading'}
                    className="rounded-xs border border-border bg-paper px-2.5 py-1.5 text-xs text-navy font-medium focus:border-navy focus:outline-hidden"
                  >
                    {AI_WORKFLOW_TOPIC_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {isHindi ? opt.hindiTitle : opt.title}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={status === 'loading' || !question.trim()}
                  className="sm:self-auto self-stretch justify-center"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper border-t-transparent" />
                      <span>{isHindi ? 'कार्यप्रवाह चल रहा है...' : 'Running Workflow...'}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Search size={15} aria-hidden="true" />
                      <span>{isHindi ? 'सूचना प्राप्त करें' : 'Run Information Workflow'}</span>
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Quick Samples Pill List */}
            {status !== 'loading' && (
              <div className="mt-5 pt-4 border-t border-border/70">
                <p className="text-xs font-mono text-ink/60 mb-2">
                  {isHindi ? 'सुझाए गए कानूनी प्रश्न (क्लिक करें):' : 'Suggested questions to test (click to run):'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_QUESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(s)}
                      className="inline-flex items-center gap-1.5 rounded-xs border border-border/80 bg-paper/80 px-2.5 py-1 text-xs text-ink/80 hover:border-navy/40 hover:bg-page hover:text-navy transition-colors text-left"
                    >
                      <Sparkles size={11} className="text-brass-dark shrink-0" aria-hidden="true" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* LOADING STATE */}
          {status === 'loading' && (
            <section
              aria-label="Workflow execution progress"
              className="rounded-sm border border-navy/20 bg-navy/5 p-6 sm:p-8 space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-navy text-paper animate-pulse">
                  <Sparkles size={20} />
                </div>
                <h3 className="font-display text-lg font-semibold text-navy">
                  {isHindi ? 'सत्यापित कानूनी जानकारी खोजी जा रही है...' : 'Synthesizing Grounded Legal Information...'}
                </h3>
                <p className="text-xs text-ink/70 max-w-md mx-auto">
                  {isHindi
                    ? 'न्याय केवल प्राथमिक केंद्रीय संहिताओं से जानकारी प्राप्त करता है और मनगढ़ंत जवाबों से बचता है।'
                    : 'Nyaya queries verified central statutory records to provide accurate, non-hallucinated legal clarity.'}
                </p>
              </div>

              {/* Progress step checklist */}
              <div className="max-w-md mx-auto space-y-2.5 text-xs font-mono">
                <div className={`flex items-center gap-2.5 ${loadingStep >= 1 ? 'text-navy font-semibold' : 'text-ink/40'}`}>
                  {loadingStep > 1 ? (
                    <CheckCircle2 size={16} className="text-teal-700" />
                  ) : (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                  )}
                  <span>{isHindi ? '१. सामान्य कानूनी विषय और क्षेत्र की पहचान' : '1. Identifying general legal topic & classification'}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${loadingStep >= 2 ? 'text-navy font-semibold' : 'text-ink/40'}`}>
                  {loadingStep > 2 ? (
                    <CheckCircle2 size={16} className="text-teal-700" />
                  ) : loadingStep === 2 ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span>{isHindi ? '२. न्याय डेटाबेस से सत्यापित संहिताओं की खोज' : '2. Retrieving verified provisions from Nyaya dataset'}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${loadingStep >= 3 ? 'text-navy font-semibold' : 'text-ink/40'}`}>
                  {loadingStep > 3 ? (
                    <CheckCircle2 size={16} className="text-teal-700" />
                  ) : loadingStep === 3 ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span>{isHindi ? '३. प्रासंगिक नागरिक अधिकारों व धाराओं का मिलान' : '3. Matching applicable statutory sections & rights'}</span>
                </div>
                <div className={`flex items-center gap-2.5 ${loadingStep >= 4 ? 'text-navy font-semibold' : 'text-ink/40'}`}>
                  {loadingStep === 4 ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span>{isHindi ? '४. प्राप्त संहिताओं से सरल व्याख्या तैयार करना' : '4. Generating plain explanation strictly from retrieved content'}</span>
                </div>
              </div>
            </section>
          )}

          {/* ERROR STATE */}
          {status === 'error' && (
            <div className="rounded-sm border border-red-300 bg-red-50/80 p-5 text-red-900 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-sm">
                    {isHindi ? 'कार्यप्रवाह पूरा नहीं हो सका' : 'Workflow Execution Issue'}
                  </h3>
                  <p className="mt-1 text-xs text-red-800 leading-relaxed">
                    {errorMessage || 'Unable to complete the information workflow. Please verify your query.'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleExecute()}
                  className="rounded-xs bg-red-900 px-3 py-1.5 text-xs font-semibold text-paper hover:bg-red-800 transition-colors"
                >
                  {isHindi ? 'पुनः प्रयास करें' : 'Try Again'}
                </button>
                <Link
                  to="/laws"
                  className="rounded-xs border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-900 hover:bg-red-100 transition-colors"
                >
                  {isHindi ? 'कानून मैन्युअल खोजें' : 'Browse Acts Manually'}
                </Link>
              </div>
            </div>
          )}

          {/* EMPTY / INITIAL STATE EXPLANATION */}
          {status === 'idle' && (
            <section className="space-y-6">
              <div className="rounded-sm border border-border/80 bg-page p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass-dark font-semibold">
                  <ShieldCheck size={16} />
                  <span>{isHindi ? 'न्याय का नियंत्रित एआई मॉडल' : 'How Nyaya AI Workflow Operates'}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {isHindi ? 'सामान्य चैटबॉट नहीं — केवल सत्यापित भारतीय कानून' : 'Not a Generic AI Chatbot — Strict Grounded Verification'}
                </h3>
                <p className="text-sm text-ink/80 leading-relaxed">
                  {isHindi
                    ? 'पारंपरिक एआई चैटबॉट अक्सर गैर-मौजूद धाराएं या गलत अदालती निर्णय गढ़ देते हैं। न्याय का कार्यप्रवाह पहले हमारे सत्यापित डेटाबेस से वास्तविक भारतीय अधिनियमों और अधिकारों को खोजता है, और फिर केवल उन्हीं से सरल व्याख्या उत्पन्न करता है।'
                    : 'Generic conversational chatbots frequently fabricate non-existent penal sections or court citations. Nyaya follows a strict 7-stage controlled pipeline: your query is first classified, matching statutory provisions are retrieved from verified central records, and the AI is restricted to explaining only what was retrieved.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="rounded-xs border border-border bg-paper p-3.5 space-y-1">
                    <span className="font-mono text-xs font-semibold text-navy block">01. Grounded First</span>
                    <p className="text-xs text-ink/70">Only real sections from BNS, BNSS, CPA, and the Constitution.</p>
                  </div>
                  <div className="rounded-xs border border-border bg-paper p-3.5 space-y-1">
                    <span className="font-mono text-xs font-semibold text-navy block">02. Zero-Invention</span>
                    <p className="text-xs text-ink/70">No invented deadlines, citations, or hypothetical penalties.</p>
                  </div>
                  <div className="rounded-xs border border-border bg-paper p-3.5 space-y-1">
                    <span className="font-mono text-xs font-semibold text-navy block">03. Non-Determination</span>
                    <p className="text-xs text-ink/70">Purely educational guidance without asserting legal liability.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* COMPLETED WORKFLOW RESULTS */}
          {status === 'success' && result && (
            <div className="space-y-8 animate-fadeIn">
              {/* STAGE 1: User-Provided Information */}
              <div className="rounded-sm border border-border bg-page p-4 sm:p-5">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/60 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-navy/60" />
                    <span>{isHindi ? 'चरण १: नागरिक द्वारा दर्ज प्रश्न' : 'Stage 1: User-Provided Information'}</span>
                  </span>
                  <span className="text-[11px] bg-navy/5 text-navy font-semibold px-2 py-0.5 rounded-xs">
                    {isHindi ? 'नागरिक इनपुट' : 'User Query'}
                  </span>
                </div>
                <blockquote className="font-serif italic text-base sm:text-lg text-navy leading-relaxed pl-3 border-l-2 border-brass">
                  “{result.userQuestion}”
                </blockquote>
              </div>

              {/* STAGE 2: Identified General Topic */}
              <div className="rounded-sm border border-border bg-page p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brass" />
                    <span>{isHindi ? 'चरण २: पहचाना गया सामान्य विषय' : 'Stage 2: Identified General Topic'}</span>
                  </span>
                  <span className="text-[11px] bg-brass/15 text-navy font-bold px-2.5 py-0.5 rounded-xs border border-brass/30">
                    {isHindi ? 'विषय पुष्टि' : 'Topic Identified'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-border/70 pb-3">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-navy">
                    {result.identifiedTopic.title}
                  </h3>
                  <span className="font-mono text-xs text-ink/70">
                    Category: <span className="text-navy font-medium uppercase">{result.identifiedTopic.category}</span>
                  </span>
                </div>

                <p className="text-sm text-ink/80 leading-relaxed">
                  {result.identifiedTopic.description}
                </p>

                {result.identifiedTopic.subtopics && result.identifiedTopic.subtopics.length > 0 && (
                  <div className="pt-1">
                    <span className="text-xs font-mono text-ink/60 block mb-1.5">
                      {isHindi ? 'प्रासंगिक उप-विषय:' : 'Identified Sub-Themes:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.identifiedTopic.subtopics.map((sub, i) => (
                        <span
                          key={i}
                          className="rounded-xs border border-border bg-paper px-2 py-0.5 text-xs text-navy font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STAGE 3 & 4: Retrieved Nyaya Content (Verified Statutory Records) */}
              <div className="rounded-sm border border-border bg-page p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-teal-600" />
                    <span>{isHindi ? 'चरण ३ व ४: न्याय से प्राप्त सत्यापित कानून' : 'Stages 3 & 4: Retrieved Verified Nyaya Content'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] bg-teal-50 text-teal-800 font-semibold px-2 py-0.5 rounded-xs border border-teal-200">
                    <ShieldCheck size={12} />
                    <span>{isHindi ? 'सत्यापित रिकॉर्ड' : 'Verified Records'}</span>
                  </span>
                </div>

                <p className="text-xs text-ink/70">
                  {isHindi
                    ? 'नीचे दिए गए प्रावधान हमारे केंद्रीय कानूनी डेटाबेस से सत्यापित हैं। एआई व्याख्या केवल इन्हीं अभिलेखों पर सीमित है:'
                    : 'The statutory provisions below were retrieved from Nyaya’s verified central legislative database. The explanation below is strictly restricted to these records:'}
                </p>

                {/* Provisions Cards */}
                <div className="space-y-3">
                  {result.retrievedContent.provisions.map((prov, idx) => (
                    <article
                      key={idx}
                      className="rounded-xs border border-border bg-paper p-4 space-y-2 hover:border-navy/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs font-bold text-navy bg-navy/5 px-2 py-0.5 rounded-xs mr-2">
                            {prov.section}
                          </span>
                          <span className="font-display font-semibold text-navy text-sm sm:text-base">
                            {prov.title}
                          </span>
                          <div className="text-xs text-ink/70 mt-0.5 font-medium">
                            {prov.lawName}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <BookmarkButton
                            item={{
                              id: `workflow-${prov.lawId}-${prov.section}`,
                              title: `${prov.lawName}, ${prov.section}: ${prov.title}`,
                              category: 'laws',
                              url: `/laws/${prov.lawId}`,
                              snippet: prov.content,
                            }}
                            variant="minimal"
                          />
                          <Link
                            to={`/laws/${prov.lawId}`}
                            className="inline-flex items-center gap-1 text-xs text-navy hover:underline font-mono"
                          >
                            <span>View Act</span>
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-ink/80 leading-relaxed border-t border-border/50 pt-2">
                        {prov.content}
                      </p>
                    </article>
                  ))}
                </div>

                {/* Rights Hub Topics if matched */}
                {result.retrievedContent.rightsTopics && result.retrievedContent.rightsTopics.length > 0 && (
                  <div className="pt-3 border-t border-border/70 space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-ink/70 font-semibold block">
                      {isHindi ? 'संबद्ध नागरिक अधिकार (अधिकार हब):' : 'Matched Citizen Rights Topics:'}
                    </span>
                    {result.retrievedContent.rightsTopics.map((rt, i) => (
                      <div key={i} className="rounded-xs border border-border/80 bg-paper/60 p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-navy">{rt.title}</h4>
                          <span className="text-[11px] font-mono text-ink/60">{rt.relevantLaw}</span>
                        </div>
                        <p className="text-xs text-ink/80 leading-relaxed">{rt.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* STAGE 5: AI-Generated Plain Explanation */}
              <div className="rounded-sm border-2 border-brass/50 bg-page p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/70">
                  <span className="flex items-center gap-1.5 font-bold text-navy">
                    <Sparkles size={15} className="text-brass-dark" />
                    <span>{isHindi ? 'चरण ५: सरल कानूनी व्याख्या' : 'Stage 5: Plain-Language Explanation'}</span>
                  </span>
                  <span className="text-[11px] bg-brass/20 text-navy font-semibold px-2 py-0.5 rounded-xs border border-brass/40">
                    {isHindi ? 'सत्यापित अभिलेखों से निर्मित' : 'Grounded AI Synthesis'}
                  </span>
                </div>

                <div className="prose prose-sm max-w-none text-ink/90 leading-relaxed space-y-3 font-serif sm:text-base">
                  {result.explanation.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Practical Options & Steps */}
                {result.nextSteps && result.nextSteps.length > 0 && (
                  <div className="pt-4 border-t border-border/80 space-y-2.5">
                    <h4 className="font-display text-sm font-semibold text-navy uppercase tracking-wide">
                      {isHindi ? 'व्यावहारिक शैक्षणिक कदम व विचारणीय बिंदु' : 'Educational Considerations & Practical Steps'}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {result.nextSteps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="rounded-xs border border-border bg-paper p-3.5 space-y-1"
                        >
                          <span className="font-mono text-xs font-bold text-navy block">
                            {sIdx + 1}. {step.title}
                          </span>
                          <p className="text-xs text-ink/75 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 text-[11px] text-ink/60 font-mono italic">
                  * Note: This explanation was synthesized strictly from the retrieved statutory records above. No external citations, deadlines, or outcome determinations were independently invented.
                </div>
              </div>

              {/* STAGE 6: Official Sources */}
              <div className="rounded-sm border border-border bg-page p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-navy/70" />
                    <span>{isHindi ? 'चरण ६: प्राथमिक सरकारी स्रोत' : 'Stage 6: Primary Statutory Sources'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-ink/60">Verified Primary Authorities</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {result.sources.map((src, srcIdx) => (
                    <a
                      key={srcIdx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-2 rounded-xs border border-border bg-paper p-3 text-xs text-ink/80 hover:border-navy hover:text-navy transition-colors group"
                    >
                      <div className="space-y-0.5">
                        <span className="font-medium block group-hover:underline text-navy">
                          {src.name}
                        </span>
                        <span className="font-mono text-[11px] text-ink/50">
                          {src.portal}
                        </span>
                      </div>
                      <ExternalLink size={13} className="text-ink/40 group-hover:text-navy shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* STAGE 7: Related Nyaya Pages */}
              <div className="rounded-sm border border-border bg-page p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-ink/60">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-navy" />
                    <span>{isHindi ? 'चरण ७: संबंधित न्याय पृष्ठ' : 'Stage 7: Related Nyaya Pages'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-ink/60">Explore In-Depth</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.relatedPages.map((page, pIdx) => (
                    <Link
                      key={pIdx}
                      to={page.to}
                      className="flex items-start justify-between gap-3 rounded-xs border border-border bg-paper p-3.5 hover:border-navy hover:shadow-xs transition-all group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold text-sm text-navy group-hover:underline">
                            {page.title}
                          </span>
                          {page.badge && (
                            <span className="rounded-xs bg-navy/5 px-1.5 py-0.5 text-[10px] font-mono font-medium text-navy">
                              {page.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ink/70 leading-relaxed">
                          {page.description}
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-ink/40 group-hover:text-navy shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-1.5"
                >
                  <RotateCcw size={14} aria-hidden="true" />
                  <span>{isHindi ? 'अन्य प्रश्न पूछें' : 'Ask Another Question'}</span>
                </Button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-page px-3 py-1.5 text-xs font-mono text-ink/80 hover:text-navy hover:bg-paper transition-colors"
                  >
                    <Printer size={13} aria-hidden="true" />
                    <span>{isHindi ? 'प्रिंट करें' : 'Print Summary'}</span>
                  </button>
                  <Link
                    to="/tools"
                    className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-page px-3 py-1.5 text-xs font-mono text-navy font-semibold hover:bg-paper transition-colors"
                  >
                    <Compass size={13} aria-hidden="true" />
                    <span>{isHindi ? 'कानूनी टूल्स' : 'Legal Tools'}</span>
                  </Link>
                </div>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="pt-4">
                <LegalDisclaimer tone="info">
                  <p className="text-xs leading-relaxed">
                    {result.disclaimer}
                  </p>
                </LegalDisclaimer>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
