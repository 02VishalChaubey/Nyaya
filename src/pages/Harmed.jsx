import Hero from '../components/Hero.jsx'
import SituationForm from '../components/SituationForm.jsx'
import LegalDisclaimer from '../components/LegalDisclaimer.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Harmed() {
  const { t, isHindi } = useLanguage()

  return (
    <>
      <Hero
        eyebrow={isHindi ? 'नागरिक कानूनी जागरूकता' : 'Educational Legal Awareness'}
        title={isHindi ? 'क्या घटना घटी?' : 'What happened?'}
        subtitle={
          isHindi
            ? 'अपनी स्थिति सरल बोलचाल की भाषा में बताएं। किसी कानूनी शब्दावली की आवश्यकता नहीं है।'
            : "Tell us what happened in your own words. You don't need to know the legal terminology."
        }
        size="md"
      />

      <section className="container-content max-w-3xl py-10 sm:py-14">
        {/* Visual 3-step guide indicator */}
        <div className="mb-8 grid grid-cols-3 gap-3 border-b border-border pb-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-navy text-xs font-bold text-paper mx-auto sm:mx-0">
              1
            </span>
            <span className="mt-1 text-xs font-medium text-navy sm:mt-0">
              {isHindi ? 'समस्या बताएं' : 'Describe in plain words'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-navy/10 text-xs font-bold text-navy mx-auto sm:mx-0">
              2
            </span>
            <span className="mt-1 text-xs font-medium text-ink/70 sm:mt-0">
              {isHindi ? 'वैकल्पिक श्रेणी' : 'Optional category'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-navy/10 text-xs font-bold text-navy mx-auto sm:mx-0">
              3
            </span>
            <span className="mt-1 text-xs font-medium text-ink/70 sm:mt-0">
              {isHindi ? 'क्या समझना है' : 'What to understand'}
            </span>
          </div>
        </div>

        <SituationForm />

        <div className="mt-10">
          <LegalDisclaimer tone="info">
            <div className="space-y-1 text-xs leading-relaxed">
              <p className="font-semibold text-navy">
                {isHindi
                  ? 'महत्वपूर्ण: शैक्षणिक सूचना, कोई कानूनी निर्णय नहीं'
                  : 'Important: Educational Information, Not a Legal Determination'}
              </p>
              <p>
                {isHindi
                  ? 'न्याय सत्यापित भारतीय संहिताओं (जैसे भारतीय न्याय संहिता, उपभोक्ता संरक्षण अधिनियम, और भारत का संविधान) से प्रावधानों को प्रस्तुत और सरल बनाता है। यह औपचारिक कानूनी निर्णय नहीं देता है और न ही किसी अधिवक्ता के परामर्श का स्थान लेता है।'
                  : 'Nyaya retrieves and explains provisions from verified Indian statutes (such as the Bharatiya Nyaya Sanhita, Consumer Protection Act, and Constitution of India). It does not issue legal determinations, predict court verdicts, or substitute for consultation with an advocate.'}
              </p>
            </div>
          </LegalDisclaimer>
        </div>
      </section>
    </>
  )
}
