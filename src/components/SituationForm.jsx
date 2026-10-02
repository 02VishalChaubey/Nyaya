import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Send,
  Loader2,
  Scale,
  ShieldCheck,
  ListChecks,
  FileWarning,
  Landmark,
  Home,
  Wifi,
  ShoppingBag,
  Briefcase,
  ShieldOff,
  Users,
  MoreHorizontal,
  BookOpen,
} from 'lucide-react'
import { analyzeSituation } from '../api/client.js'
import OfflineNotice from './OfflineNotice.jsx'
import Button from './Button.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const CATEGORIES = [
  { id: 'money-fraud', label: 'Money / Fraud', hindiLabel: 'वित्तीय / धोखाधड़ी', icon: Landmark },
  { id: 'property', label: 'Property', hindiLabel: 'संपत्ति व किराया', icon: Home },
  { id: 'cyber', label: 'Online / Cyber', hindiLabel: 'ऑनलाइन / साइबर', icon: Wifi },
  { id: 'consumer', label: 'Consumer', hindiLabel: 'उपभोक्ता अधिकार', icon: ShoppingBag },
  { id: 'workplace', label: 'Workplace', hindiLabel: 'कार्यस्थल व श्रम', icon: Briefcase },
  { id: 'personal-rights', label: 'Personal Rights', hindiLabel: 'व्यक्तिगत स्वतंत्रता', icon: ShieldOff },
  { id: 'family', label: 'Family', hindiLabel: 'पारिवारिक मामले', icon: Users },
  { id: 'other', label: 'Other', hindiLabel: 'अन्य विषय', icon: MoreHorizontal },
]

const UNDERSTAND_OPTIONS = [
  { id: 'law', label: 'What law may apply?', hindiLabel: 'कौन सा कानून लागू हो सकता है?', icon: Scale },
  { id: 'rights', label: 'What rights may be relevant?', hindiLabel: 'कौन से अधिकार प्रासंगिक हैं?', icon: ShieldCheck },
  { id: 'next-steps', label: 'What can I do next?', hindiLabel: 'मैं आगे क्या कदम उठा सकता हूँ?', icon: ListChecks },
  { id: 'report', label: 'Where can I report this?', hindiLabel: 'इसकी शिकायत कहाँ दर्ज करें?', icon: FileWarning },
]

const SAMPLE_SITUATIONS = [
  {
    label: 'Online Purchase Defect',
    hindiLabel: 'दोषपूर्ण ऑनलाइन सामान',
    category: 'consumer',
    focus: ['law', 'next-steps'],
    text: 'I ordered a laptop online from an e-commerce platform. When the package arrived, the screen was cracked. The seller is refusing to accept a return or issue a refund, claiming the damage happened after delivery.',
    hindiText: 'मैंने ई-कॉमर्स प्लेटफॉर्म से एक लैपटॉप ऑनलाइन ऑर्डर किया था। डिलीवरी पर स्क्रीन टूटी हुई निकली। विक्रेता यह दावा करते हुए वापसी या रिफंड से मना कर रहा है कि नुकसान डिलीवरी के बाद हुआ।',
  },
  {
    label: 'Unauthorized Bank Transfer',
    hindiLabel: 'अनधिकृत बैंक कटौती',
    category: 'cyber',
    focus: ['law', 'report', 'next-steps'],
    text: 'I received an SMS notification that ₹45,000 was debited from my bank account via UPI to an unknown merchant. I did not share any OTP or click on any suspicious link. My bank branch told me to wait two weeks.',
    hindiText: 'मुझे SMS मिला कि मेरे बैंक खाते से अज्ञात मर्चेंट को UPI द्वारा ₹45,000 कट गए हैं। मैंने कोई OTP शेयर नहीं किया और न ही किसी लिंक पर क्लिक किया। बैंक शाखा दो सप्ताह इंतजार करने को कह रही है।',
  },
  {
    label: 'Unpaid Wages upon Resignation',
    hindiLabel: 'इस्तीफे के बाद बकाया वेतन',
    category: 'workplace',
    focus: ['law', 'rights', 'next-steps'],
    text: 'I completed my notice period and left my private company two months ago, but the management has withheld my final two months of salary and gratuity settlement without giving any written reason.',
    hindiText: 'मैंने नोटिस पीरियड पूरा कर दो महीने पहले कंपनी छोड़ी थी, लेकिन प्रबंधन ने बिना कोई लिखित कारण बताए मेरा दो महीने का वेतन और ग्रेच्युटी भुगतान रोक रखा है।',
  },
]

export default function SituationForm() {
  const { t, isHindi } = useLanguage()
  const [description, setDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedFocus, setSelectedFocus] = useState(['law', 'next-steps'])
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const navigate = useNavigate()

  function toggleFocus(id) {
    setSelectedFocus((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  function applySample(sample) {
    setDescription(isHindi && sample.hindiText ? sample.hindiText : sample.text)
    setSelectedCategory(sample.category)
    setSelectedFocus(sample.focus)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!description.trim() || submitting) return

    setSubmitting(true)
    setSubmitError(null)

    const navState = {
      description: description.trim(),
      category: selectedCategory,
      focus: selectedFocus,
    }

    try {
      const result = await analyzeSituation({
        description: description.trim(),
        category: selectedCategory,
        focus: selectedFocus,
      })
      navigate('/harmed/result', { state: { ...navState, result } })
    } catch (err) {
      setSubmitError(err)
      // Pass offline flag so the user receives a safe, fully functional offline response
      navigate('/harmed/result', { state: { ...navState, result: null, offline: true } })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-9 shadow-sm">
      {/* Sample situation quick-picks */}
      <div className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brass-dark">
          <BookOpen size={14} aria-hidden="true" />
          <span>{isHindi ? 'त्वरित उदाहरण परिदृश्य' : 'Quick Example Situations'}</span>
        </div>
        <p className="mt-1 text-xs text-ink/60">
          {isHindi
            ? 'लागू कानून और अगले कदम देखने के लिए किसी उदाहरण पर क्लिक करें:'
            : 'Click an example to preview how the analysis identifies relevant laws and next steps:'}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SAMPLE_SITUATIONS.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => applySample(sample)}
              className="rounded border border-border/80 bg-page/70 px-3 py-1.5 text-xs font-medium text-navy transition hover:border-navy/50 hover:bg-page"
            >
              {isHindi ? sample.hindiLabel || sample.label : sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: Describe what happened */}
      <div>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brass-dark">
            {isHindi ? 'चरण 1' : 'STEP 1'}
          </span>
          <span className="text-xs text-ink/40">
            {description.trim()
              ? `${description.trim().length} ${isHindi ? 'वर्ण' : 'characters'}`
              : isHindi ? 'सरल भाषा स्वीकार्य' : 'Plain language accepted'}
          </span>
        </div>
        <label htmlFor="situation-description" className="mt-1.5 block font-display text-base font-semibold text-navy sm:text-lg">
          {isHindi ? 'क्या घटना घटी, विस्तार से बताएं।' : 'Describe what happened.'}
        </label>
        <p className="mt-1 text-xs leading-relaxed text-ink/65">
          {isHindi
            ? 'अपनी बात अपने शब्दों में बताएं। किसी कानूनी शब्दावली की आवश्यकता नहीं है।'
            : "Tell us what happened in your own words. You don't need to know the legal terminology."}
        </p>
        <textarea
          id="situation-description"
          aria-describedby="situation-hint"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            isHindi
              ? 'उदाहरण: मैंने मकान रंगाई ठेकेदार को सोमवार से काम शुरू करने के लिए ₹20,000 अग्रिम दिए थे। तीन सप्ताह हो चुके हैं, ठेकेदार ने नंबर ब्लॉक कर दिया है और पैसे लौटाने से मना कर रहा है...'
              : 'For example: I paid an advance of ₹20,000 to a home painting contractor who promised to start work on Monday. It has been three weeks, they have blocked my number, and refused to return the money...'
          }
          className="mt-3 w-full resize-y rounded-xs border border-border bg-page/40 p-4 font-sans text-sm leading-relaxed text-ink outline-none transition focus:border-navy focus:bg-paper focus:ring-1 focus:ring-navy/20 placeholder:text-ink/50"
          required
        />
        <p id="situation-hint" className="mt-2 text-xs text-ink/65">
          {isHindi
            ? 'सुझाव: क्या घटना घटी, कौन-कौन शामिल था (जैसे विक्रेता, नियोक्ता, मकान मालिक या अधिकारी) और अब तक क्या कदम उठाए गए हैं, इसका उल्लेख करें।'
            : 'Tip: Include what took place, who was involved (e.g. seller, employer, landlord, official), and any steps taken so far.'}
        </p>
      </div>

      {/* STEP 2: Optional category */}
      <fieldset className="mt-9 border-t border-border pt-7">
        <legend className="w-full">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-maroon">
              {isHindi ? 'चरण 2' : 'STEP 2'}
            </span>
            <span className="text-xs text-ink/60">{isHindi ? 'वैकल्पिक' : 'Optional'}</span>
          </div>
          <span className="mt-1.5 block font-display text-base font-semibold text-navy sm:text-lg">
            {isHindi ? 'कानूनी क्षेत्र (वैकल्पिक):' : 'Optional category:'}
          </span>
        </legend>
        <p className="mt-1 text-xs text-ink/65">
          {isHindi
            ? 'यदि ज्ञात हो तो श्रेणी चुनें, अन्यथा हमारा वैधानिक डेटाबेस स्वतः इसकी पहचान करेगा।'
            : 'Select an area if you know it, or leave it blank to let our verified legal knowledge base identify it.'}
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const active = selectedCategory === cat.id
            const labelText = isHindi ? cat.hindiLabel || cat.label : cat.label
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategory(active ? null : cat.id)}
                className={`flex items-center gap-2.5 rounded-xs border p-3 text-left text-xs font-medium transition min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy ${
                  active
                    ? 'border-navy bg-navy text-paper shadow-2xs font-semibold'
                    : 'border-border/80 bg-paper/60 text-ink/75 hover:border-navy/40 hover:text-navy'
                }`}
              >
                <Icon size={16} className={`shrink-0 ${active ? 'text-paper' : 'text-navy/70'}`} aria-hidden="true" />
                <span className="truncate">{labelText}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* STEP 3: What would you like to understand? */}
      <fieldset className="mt-9 border-t border-border pt-7">
        <legend className="w-full">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-maroon">
              {isHindi ? 'चरण 3' : 'STEP 3'}
            </span>
            <span className="text-xs text-ink/60">
              {isHindi ? 'लागू होने वाले विकल्प चुनें' : 'Select any that apply'}
            </span>
          </div>
          <span className="mt-1.5 block font-display text-base font-semibold text-navy sm:text-lg">
            {isHindi ? 'आप क्या समझना चाहते हैं?' : 'What would you like to understand?'}
          </span>
        </legend>
        <p className="mt-1 text-xs text-ink/65">
          {isHindi
            ? 'अपनी प्राथमिकता के अनुसार प्रश्न चुनें ताकि स्पष्टीकरण और अगले कदम उसी अनुरूप प्राप्त हों:'
            : 'Choose the questions most important to you to tailor the explanation and next steps:'}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {UNDERSTAND_OPTIONS.map((opt) => {
            const Icon = opt.icon
            const active = selectedFocus.includes(opt.id)
            const labelText = isHindi ? opt.hindiLabel || opt.label : opt.label
            return (
              <button
                key={opt.id}
                type="button"
                aria-pressed={active}
                onClick={() => toggleFocus(opt.id)}
                className={`flex items-start gap-3 rounded-md border p-3.5 text-left text-sm font-medium transition min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass ${
                  active
                    ? 'border-navy bg-navy/5 text-navy ring-1 ring-navy'
                    : 'border-border/80 bg-paper/60 text-ink/75 hover:border-navy/40 hover:text-navy'
                }`}
              >
                <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                  active ? 'border-navy bg-navy text-paper' : 'border-border bg-page text-transparent'
                }`}>
                  <span className="text-xs font-bold">✓</span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon size={15} className={active ? 'text-brass-dark' : 'text-ink/60'} aria-hidden="true" />
                    <span className="font-semibold">{labelText}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Submission bar */}
      <div className="mt-10 border-t border-border pt-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-md text-xs leading-relaxed text-ink/60">
            <span className="font-semibold text-navy">
              {isHindi ? 'केवल शैक्षणिक जानकारी:' : 'Educational information only:'}
            </span>{' '}
            {isHindi
              ? 'प्रदत्त उत्तर सत्यापित भारतीय संहिताओं से मिलाए जाते हैं और यह कोई कानूनी निर्णय या कानूनी सलाह नहीं है।'
              : 'Answers are matched against verified Indian statutes and do not constitute a legal determination or legal advice.'}
          </div>
          <Button
            type="submit"
            size="lg"
            variant="primary"
            icon={submitting ? Loader2 : Send}
            iconPosition="right"
            disabled={submitting || !description.trim()}
          >
            {submitting
              ? (isHindi ? 'सत्यापित कानूनों से मिलान जारी...' : 'Matching against verified laws...')
              : (isHindi ? 'लागू कानूनी जानकारी खोजें' : 'Find Relevant Information')}
          </Button>
        </div>

        {submitError && (
          <div className="mt-4">
            <OfflineNotice
              message={
                isHindi
                  ? 'सर्वर से सीधा संपर्क नहीं हो सका। स्थानीय सत्यापित वैधानिक डेटाबेस से विश्लेषण प्रस्तुत किया जा रहा है...'
                  : 'The server could not be reached directly. Generating an offline analysis from the local verified statutory database...'
              }
            />
          </div>
        )}
      </div>
    </form>
  )
}
