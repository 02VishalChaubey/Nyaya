import { useState, useEffect } from 'react'
import {
  FileText,
  Calendar,
  Users,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'

const DRAFT_KEY = 'nyaya_complaint_prep_draft'

export default function ComplaintPrepGuide() {
  const { isHindi } = useLanguage()

  // Form State
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY)
      if (saved) return JSON.parse(saved)
    } catch {
      // Ignore
    }
    return {
      complaintType: 'consumer',
      incidentDate: '',
      isOngoing: false,
      complainantName: '',
      complainantContact: '',
      complainantAddress: '',
      respondentName: '',
      respondentType: 'Company / Business',
      respondentContact: '',
      whatHappened: '',
      financialImpact: '',
      supportingDocuments: '',
      communicationRecords: '',
      reliefSought: '',
    }
  })

  const [errors, setErrors] = useState({})
  const [showSummary, setShowSummary] = useState(false)
  const [copied, setCopied] = useState(false)

  // Auto-save draft locally
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(formData))
    } catch {
      // Ignore
    }
  }, [formData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error on edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Proper form validation
  const validate = () => {
    const newErrors = {}

    if (!formData.incidentDate && !formData.isOngoing) {
      newErrors.incidentDate = isHindi
        ? 'कृपया घटना की तिथि दर्ज करें (या चालू स्थिति चुनें)'
        : 'Please specify the date when this occurred (or mark as ongoing).'
    } else if (formData.incidentDate) {
      const chosen = new Date(formData.incidentDate)
      const now = new Date()
      if (chosen > now) {
        newErrors.incidentDate = isHindi
          ? 'घटना की तिथि भविष्य की नहीं हो सकती'
          : 'Incident date cannot be in the future.'
      }
    }

    if (!formData.complainantName.trim()) {
      newErrors.complainantName = isHindi
        ? 'कृपया अपना नाम दर्ज करें'
        : 'Please enter complainant / your name.'
    }

    if (!formData.respondentName.trim()) {
      newErrors.respondentName = isHindi
        ? 'कृपया दूसरी पार्टी / कंपनी / व्यक्ति का नाम दर्ज करें'
        : 'Please enter the name of the opposing party / company / person.'
    }

    if (!formData.whatHappened.trim()) {
      newErrors.whatHappened = isHindi
        ? 'कृपया घटना का तथ्यात्मक विवरण दर्ज करें'
        : 'Please describe what happened in chronological order.'
    } else if (formData.whatHappened.trim().length < 30) {
      newErrors.whatHappened = isHindi
        ? 'कृपया कम से कम 30 अक्षरों में पर्याप्त विवरण दें'
        : 'Please provide at least 30 characters detailing the incident facts.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    if (validate()) {
      setShowSummary(true)
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }
  }

  const handleReset = () => {
    if (
      window.confirm(
        isHindi
          ? 'क्या आप इस फॉर्म को रीसेट करना चाहते हैं?'
          : 'Are you sure you want to clear this complaint preparation draft?'
      )
    ) {
      const blank = {
        complaintType: 'consumer',
        incidentDate: '',
        isOngoing: false,
        complainantName: '',
        complainantContact: '',
        complainantAddress: '',
        respondentName: '',
        respondentType: 'Company / Business',
        respondentContact: '',
        whatHappened: '',
        financialImpact: '',
        supportingDocuments: '',
        communicationRecords: '',
        reliefSought: '',
      }
      setFormData(blank)
      setErrors({})
      setShowSummary(false)
      try {
        localStorage.removeItem(DRAFT_KEY)
      } catch {
        // Ignore
      }
    }
  }

  const formatSummaryText = () => {
    let out = `FACTUAL INCIDENT & GRIEVANCE BRIEFING SUMMARY\n`
    out += `Organized via Nyaya Educational Preparation Guide\n`
    out += `Date Generated: ${new Date().toLocaleDateString('en-IN')}\n\n`

    out += `1. INCIDENT CHRONOLOGY\n`
    out += `Date of Incident: ${formData.incidentDate || 'Not specified'}${
      formData.isOngoing ? ' (Matter is Ongoing)' : ''
    }\n`
    out += `Subject Domain: ${formData.complaintType.toUpperCase()}\n\n`

    out += `2. PARTIES INVOLVED\n`
    out += `Complainant: ${formData.complainantName}\n`
    if (formData.complainantContact) out += `Contact Details: ${formData.complainantContact}\n`
    if (formData.complainantAddress) out += `Address / Jurisdiction: ${formData.complainantAddress}\n`
    out += `\nResponding Party: ${formData.respondentName} (${formData.respondentType})\n`
    if (formData.respondentContact) out += `Respondent Contact / Address: ${formData.respondentContact}\n\n`

    out += `3. FACTUAL CHRONOLOGY (WHAT HAPPENED)\n`
    out += `${formData.whatHappened}\n\n`

    if (formData.financialImpact) {
      out += `4. FINANCIAL IMPACT / LOSS\n`
      out += `${formData.financialImpact}\n\n`
    }

    if (formData.supportingDocuments) {
      out += `5. SUPPORTING EVIDENCE / DOCUMENTS AVAILABLE\n`
      out += `${formData.supportingDocuments}\n\n`
    }

    if (formData.communicationRecords) {
      out += `6. PRIOR ATTEMPTS AT RESOLUTION / COMMUNICATIONS\n`
      out += `${formData.communicationRecords}\n\n`
    }

    if (formData.reliefSought) {
      out += `7. DESIRED RESOLUTION / REMEDY REQUESTED\n`
      out += `${formData.reliefSought}\n\n`
    }

    out += `DISCLAIMER: This document is an educational factual summary for informational preparation. It does NOT constitute a formal court pleading, petition, or legal advice.`
    return out
  }

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(formatSummaryText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore
    }
  }

  return (
    <div className="space-y-8">
      {/* Toggle View Tabs if summary generated */}
      {showSummary && (
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setShowSummary(false)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xs border border-border bg-page hover:bg-paper text-navy transition-colors"
          >
            ← {isHindi ? 'फॉर्म संपादित करें' : 'Edit Information'}
          </button>
          <span className="text-xs font-mono text-ink/40">|</span>
          <span className="text-xs font-semibold text-navy bg-navy/10 px-2.5 py-1 rounded-xs">
            {isHindi ? 'संगठित सारांश देखें' : 'Viewing Organized Summary'}
          </span>
        </div>
      )}

      {!showSummary ? (
        /* The Preparation Form */
        <form onSubmit={handleGenerate} noValidate className="space-y-6">
          <div className="rounded-sm border border-border bg-white p-5 sm:p-7 shadow-2xs space-y-6">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-navy">
                {isHindi ? 'तथ्यात्मक शिकायत तैयारी मार्गदर्शिका' : 'Organize Factual Information'}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-ink/75 leading-relaxed">
                {isHindi
                  ? 'किसी भी फोरम, कंपनी या कानूनी सलाहकार से संपर्क करने से पहले घटनाओं, पक्षों और सबूतों को क्रमबद्ध रूप से व्यवस्थित करें।'
                  : 'Articulate the essential factual components of your situation. An organized summary helps you state facts objectively without missing key records.'}
              </p>
            </div>

            {/* General Domain Selection */}
            <div>
              <label htmlFor="complaintType" className="block text-xs font-mono font-semibold uppercase tracking-wider text-navy mb-1.5">
                {isHindi ? 'शिकायत का विषय / श्रेणी' : 'General Domain'}
              </label>
              <select
                id="complaintType"
                name="complaintType"
                value={formData.complaintType}
                onChange={handleChange}
                className="w-full rounded-sm border border-border bg-page px-3 py-2 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
              >
                <option value="consumer">Consumer Protection (Defective Product / Service Delay)</option>
                <option value="cyber">Cyber Fraud / Banking / Electronic Transaction</option>
                <option value="tenancy">Tenancy / Rent Deposit / Landlord Dispute</option>
                <option value="workplace">Workplace Rights / Unpaid Wages / POSH</option>
                <option value="police">Police Complaint / Public Grievance</option>
                <option value="contract">Commercial Agreement / Civil Contract Breach</option>
                <option value="general">Other Civil / Administrative Grievance</option>
              </select>
            </div>

            {/* SECTION 1: DATE & TIMELINE */}
            <div className="pt-4 border-t border-border/70 space-y-3">
              <div className="flex items-center gap-2 text-navy">
                <Calendar size={16} className="text-brass-dark" aria-hidden="true" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                  {isHindi ? '1. घटना की तिथि व समय' : '1. Date & Chronology'}
                </h4>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="incidentDate" className="block text-xs font-medium text-navy mb-1">
                    {isHindi ? 'घटना की मुख्य तिथि *' : 'Incident Date *'}
                  </label>
                  <input
                    type="date"
                    id="incidentDate"
                    name="incidentDate"
                    value={formData.incidentDate}
                    onChange={handleChange}
                    disabled={formData.isOngoing && !formData.incidentDate}
                    aria-invalid={!!errors.incidentDate}
                    aria-describedby={errors.incidentDate ? 'date-error' : undefined}
                    className={`w-full rounded-sm border px-3 py-2 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass ${
                      errors.incidentDate ? 'border-oxblood bg-oxblood/5' : 'border-border bg-page'
                    }`}
                  />
                  {errors.incidentDate && (
                    <p id="date-error" className="mt-1 text-xs text-oxblood-dark flex items-center gap-1 font-medium">
                      <AlertCircle size={12} /> {errors.incidentDate}
                    </p>
                  )}
                </div>

                <div className="flex items-center pt-5 sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isOngoing"
                      checked={formData.isOngoing}
                      onChange={handleChange}
                      className="rounded text-navy focus:ring-brass"
                    />
                    <span className="text-xs text-ink/80 font-medium">
                      {isHindi ? 'यह समस्या वर्तमान में जारी है (Ongoing Matter)' : 'This is an ongoing dispute / repeated occurrence'}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* SECTION 2: PARTIES INVOLVED */}
            <div className="pt-4 border-t border-border/70 space-y-4">
              <div className="flex items-center gap-2 text-navy">
                <Users size={16} className="text-brass-dark" aria-hidden="true" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                  {isHindi ? '2. संबंधित पक्ष (Parties Involved)' : '2. Parties Involved'}
                </h4>
              </div>

              {/* Complainant (You) */}
              <div className="rounded-xs border border-border/80 bg-stone-50/70 p-3.5 space-y-3">
                <span className="text-xs font-semibold text-navy block">
                  {isHindi ? 'शिकायतकर्ता का विवरण (आपका विवरण):' : 'Complainant Particulars (Your Information):'}
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="complainantName" className="block text-xs text-ink/75 mb-1">
                      {isHindi ? 'पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      id="complainantName"
                      name="complainantName"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.complainantName}
                      onChange={handleChange}
                      aria-invalid={!!errors.complainantName}
                      className={`w-full rounded-sm border px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass ${
                        errors.complainantName ? 'border-oxblood bg-oxblood/5' : 'border-border bg-white'
                      }`}
                    />
                    {errors.complainantName && (
                      <p className="mt-1 text-xs text-oxblood-dark flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.complainantName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="complainantContact" className="block text-xs text-ink/75 mb-1">
                      {isHindi ? 'फोन नंबर / ईमेल' : 'Phone / Email (Optional)'}
                    </label>
                    <input
                      type="text"
                      id="complainantContact"
                      name="complainantContact"
                      placeholder="e.g. ramesh@example.com / 9876543210"
                      value={formData.complainantContact}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="complainantAddress" className="block text-xs text-ink/75 mb-1">
                    {isHindi ? 'शहर व राज्य (क्षेत्राधिकार पुष्टि के लिए)' : 'City, District & State (Determines Territorial Jurisdiction)'}
                  </label>
                  <input
                    type="text"
                    id="complainantAddress"
                    name="complainantAddress"
                    placeholder="e.g. South Delhi, New Delhi"
                    value={formData.complainantAddress}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                  />
                </div>
              </div>

              {/* Responding Party */}
              <div className="rounded-xs border border-border/80 bg-stone-50/70 p-3.5 space-y-3">
                <span className="text-xs font-semibold text-navy block">
                  {isHindi ? 'विपक्षी पक्ष / कंपनी / व्यक्ति का विवरण:' : 'Opposing Party / Respondent Particulars:'}
                </span>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label htmlFor="respondentName" className="block text-xs text-ink/75 mb-1">
                      {isHindi ? 'कंपनी / संगठन / व्यक्ति का नाम *' : 'Name of Company / Institution / Person *'}
                    </label>
                    <input
                      type="text"
                      id="respondentName"
                      name="respondentName"
                      placeholder="e.g. Acme Electronics Pvt Ltd / Mr. Rajesh Sharma"
                      value={formData.respondentName}
                      onChange={handleChange}
                      aria-invalid={!!errors.respondentName}
                      className={`w-full rounded-sm border px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass ${
                        errors.respondentName ? 'border-oxblood bg-oxblood/5' : 'border-border bg-white'
                      }`}
                    />
                    {errors.respondentName && (
                      <p className="mt-1 text-xs text-oxblood-dark flex items-center gap-1 font-medium">
                        <AlertCircle size={12} /> {errors.respondentName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="respondentType" className="block text-xs text-ink/75 mb-1">
                      {isHindi ? 'प्रकार' : 'Party Type'}
                    </label>
                    <select
                      id="respondentType"
                      name="respondentType"
                      value={formData.respondentType}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                    >
                      <option value="Company / Business">Company / Business</option>
                      <option value="Individual / Landlord">Individual / Landlord</option>
                      <option value="Employer / Management">Employer / Management</option>
                      <option value="Government Authority">Government Authority</option>
                      <option value="Bank / Financial Entity">Bank / Financial Entity</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="respondentContact" className="block text-xs text-ink/75 mb-1">
                    {isHindi ? 'विपक्षी का पता / ईमेल / वेबसाइट' : 'Known Address, Email or Branch Location'}
                  </label>
                  <input
                    type="text"
                    id="respondentContact"
                    name="respondentContact"
                    placeholder="e.g. support@acme.com / Branch Address, Connaught Place"
                    value={formData.respondentContact}
                    onChange={handleChange}
                    className="w-full rounded-sm border border-border bg-white px-3 py-1.5 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: WHAT HAPPENED (CHRONOLOGICAL STATEMENT) */}
            <div className="pt-4 border-t border-border/70 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="whatHappened" className="font-mono text-xs font-bold uppercase tracking-wider text-navy">
                  {isHindi ? '3. घटना का तथ्यात्मक विवरण (क्या हुआ?) *' : '3. What Happened (Chronological Statement of Facts) *'}
                </label>
                <span className="text-[11px] text-ink/50 font-mono">
                  {formData.whatHappened.length} chars
                </span>
              </div>
              <p className="text-xs text-ink/65">
                {isHindi
                  ? 'भावनाओं के बजाय तथ्यों पर ध्यान दें: किसने क्या किया, कब क्या वादा किया गया था, और क्या परिणाम हुआ।'
                  : 'Write clear, objective facts in sequence: What was ordered/agreed upon? What was delivered? What failed?'}
              </p>
              <textarea
                id="whatHappened"
                name="whatHappened"
                rows={5}
                value={formData.whatHappened}
                onChange={handleChange}
                placeholder="1. On [date], I purchased / agreed to...\n2. On [date], the defect occurred / salary was withheld...\n3. When approached, the other party refused to..."
                aria-invalid={!!errors.whatHappened}
                className={`w-full rounded-sm border p-3 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass font-sans leading-relaxed ${
                  errors.whatHappened ? 'border-oxblood bg-oxblood/5' : 'border-border bg-page'
                }`}
              />
              {errors.whatHappened && (
                <p className="text-xs text-oxblood-dark flex items-center gap-1 font-medium">
                  <AlertCircle size={12} /> {errors.whatHappened}
                </p>
              )}
            </div>

            {/* SECTION 4: SUPPORTING DOCUMENTS & COMM RECORDS */}
            <div className="pt-4 border-t border-border/70 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="supportingDocuments" className="block font-mono text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  {isHindi ? '4. उपलब्ध सहायक दस्तावेज़' : '4. Supporting Documents Available'}
                </label>
                <textarea
                  id="supportingDocuments"
                  name="supportingDocuments"
                  rows={3}
                  value={formData.supportingDocuments}
                  onChange={handleChange}
                  placeholder="e.g. Tax Invoice #1234, Bank UTR statement dated 15 Jan, Warranty card, 4 photos of defective unit..."
                  className="w-full rounded-sm border border-border bg-page p-3 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
              </div>

              <div>
                <label htmlFor="communicationRecords" className="block font-mono text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  {isHindi ? '5. पूर्व संचार / पत्राचार का रिकॉर्ड' : '5. Prior Communication Records'}
                </label>
                <textarea
                  id="communicationRecords"
                  name="communicationRecords"
                  rows={3}
                  value={formData.communicationRecords}
                  onChange={handleChange}
                  placeholder="e.g. Sent formal email on 20 Jan (Ticket #891); customer care phone call on 22 Jan; received formal rejection letter on 25 Jan..."
                  className="w-full rounded-sm border border-border bg-page p-3 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
              </div>
            </div>

            {/* SECTION 5: FINANCIAL IMPACT & RELIEF */}
            <div className="pt-4 border-t border-border/70 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="financialImpact" className="block font-mono text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  {isHindi ? 'वित्तीय प्रभाव / प्रत्यक्ष हानि' : 'Financial Impact / Actual Money Lost'}
                </label>
                <input
                  type="text"
                  id="financialImpact"
                  name="financialImpact"
                  placeholder="e.g. ₹24,999 paid for item + ₹3,000 technician fee"
                  value={formData.financialImpact}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-border bg-page px-3 py-2 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
              </div>

              <div>
                <label htmlFor="reliefSought" className="block font-mono text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                  {isHindi ? 'अपेक्षित समाधान / उपचार' : 'Desired Resolution Sought'}
                </label>
                <input
                  type="text"
                  id="reliefSought"
                  name="reliefSought"
                  placeholder="e.g. Full refund of ₹24,999 with cancellation of contract"
                  value={formData.reliefSought}
                  onChange={handleChange}
                  className="w-full rounded-sm border border-border bg-page px-3 py-2 text-xs sm:text-sm text-navy focus:outline-hidden focus:ring-1 focus:ring-brass"
                />
              </div>
            </div>

            {/* Form Action Controls */}
            <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/60 hover:text-oxblood-dark transition-colors px-2 py-1"
              >
                <RotateCcw size={13} />
                <span>{isHindi ? 'फॉर्म साफ़ करें' : 'Clear Form Draft'}</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-2.5 text-xs sm:text-sm font-semibold text-paper hover:bg-navy-light transition-all shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brass"
              >
                <span>{isHindi ? 'व्यवस्थित सारांश बनाएं' : 'Generate Organized Summary'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* The Generated Organized Summary View */
        <article className="rounded-sm border border-navy/20 bg-white shadow-sm overflow-hidden animate-fade-in">
          {/* Summary Sheet Header */}
          <div className="border-b border-border bg-navy text-paper p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-brass uppercase tracking-widest font-semibold">
                  Factual Preparation Brief
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1">
                  Organized Incident Summary
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-paper/75">
                  Subject: {formData.complaintType.toUpperCase()} · Reference Date: {formData.incidentDate || 'Ongoing'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-paper/10 hover:bg-paper/20 border border-paper/20 text-xs font-semibold text-paper transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-paper/10 hover:bg-paper/20 border border-paper/20 text-xs font-semibold text-paper transition-colors"
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>

          {/* Structured Content Grid */}
          <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-ink/85">
            {/* Parties Summary Box */}
            <div className="grid gap-4 sm:grid-cols-2 rounded-sm border border-border/80 bg-stone-50 p-4">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy/70 block mb-1">
                  Complainant / Aggrieved Party
                </span>
                <p className="font-semibold text-navy text-sm sm:text-base">
                  {formData.complainantName}
                </p>
                {formData.complainantContact && (
                  <p className="text-xs text-ink/70 mt-0.5">{formData.complainantContact}</p>
                )}
                {formData.complainantAddress && (
                  <p className="text-xs text-ink/70">{formData.complainantAddress}</p>
                )}
              </div>

              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy/70 block mb-1">
                  Opposing Party / Respondent
                </span>
                <p className="font-semibold text-navy text-sm sm:text-base">
                  {formData.respondentName}
                </p>
                <p className="text-xs text-brass-dark font-medium mt-0.5">
                  Type: {formData.respondentType}
                </p>
                {formData.respondentContact && (
                  <p className="text-xs text-ink/70 mt-0.5">{formData.respondentContact}</p>
                )}
              </div>
            </div>

            {/* Incident Chronology Statement */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy border-b border-border/70 pb-1.5 mb-2.5">
                Factual Narrative &amp; Sequence of Events
              </h4>
              <div className="rounded-xs bg-page/70 p-4 border border-border/60 text-ink leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm">
                {formData.whatHappened}
              </div>
            </div>

            {/* Financial Loss */}
            {formData.financialImpact && (
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy border-b border-border/70 pb-1.5 mb-2">
                  Financial Impact &amp; Damages
                </h4>
                <p className="text-ink/80 font-medium">{formData.financialImpact}</p>
              </div>
            )}

            {/* Supporting Records Inventory */}
            <div className="grid gap-6 sm:grid-cols-2 pt-2">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy border-b border-border/70 pb-1.5 mb-2">
                  Inventory of Supporting Documents
                </h4>
                <p className="text-ink/80 whitespace-pre-wrap leading-relaxed">
                  {formData.supportingDocuments || 'None recorded yet.'}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-navy border-b border-border/70 pb-1.5 mb-2">
                  Prior Communication History
                </h4>
                <p className="text-ink/80 whitespace-pre-wrap leading-relaxed">
                  {formData.communicationRecords || 'No previous communication recorded.'}
                </p>
              </div>
            </div>

            {/* Relief Sought */}
            {formData.reliefSought && (
              <div className="rounded-xs border-l-4 border-brass-dark bg-brass-faint/30 p-3.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-navy block mb-0.5">
                  Desired Remedy / Request
                </span>
                <p className="font-medium text-navy text-xs sm:text-sm">{formData.reliefSought}</p>
              </div>
            )}

            {/* Footer Notice */}
            <div className="mt-8 pt-4 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-ink/60">
              <span>
                Factual briefing sheet generated for citizen record-keeping. Not an advocate pleading.
              </span>
              <button
                type="button"
                onClick={() => setShowSummary(false)}
                className="font-semibold text-navy hover:text-brass-dark transition-colors"
              >
                ← Return to Edit
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Boundary & Non-Advocate Disclaimer */}
      <div className="rounded-sm border border-border/80 bg-stone-50 p-4 text-xs text-ink/75 leading-relaxed">
        <strong className="text-navy font-semibold">Important Limitation:</strong>{' '}
        This tool is strictly an educational organizer to assist you in assembling facts, timelines, and proof logically. It does not determine liability, predict dispute outcomes, or claim legal sufficiency for filing in court. Formal petitions require compliance with the specific procedural codes of the relevant forum (e.g. Consumer Commission regulations or High Court Writ rules).
      </div>
    </div>
  )
}
