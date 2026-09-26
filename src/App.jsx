import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Breadcrumbs from './components/Breadcrumbs.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import PageTitleManager from './components/PageTitleManager.jsx'
import LoadingState from './components/LoadingState.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { BreadcrumbProvider } from './context/BreadcrumbContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { BookmarkProvider } from './context/BookmarkContext.jsx'

// Home is kept as eager import for instant first paint
import Home from './pages/Home.jsx'

// Code-split route components
const FundamentalRights = lazy(() => import('./pages/FundamentalRights.jsx'))
const LawExplorer = lazy(() => import('./pages/LawExplorer.jsx'))
const LawDetails = lazy(() => import('./pages/LawDetails.jsx'))
const Harmed = lazy(() => import('./pages/Harmed.jsx'))
const SituationResult = lazy(() => import('./pages/SituationResult.jsx'))
const LegalTerms = lazy(() => import('./pages/LegalTerms.jsx'))
const CompareLaws = lazy(() => import('./pages/CompareLaws.jsx'))
const Search = lazy(() => import('./pages/Search.jsx'))
const Saved = lazy(() => import('./pages/Saved.jsx'))
const LegalTools = lazy(() => import('./pages/LegalTools.jsx'))
const AiWorkflow = lazy(() => import('./pages/AiWorkflow.jsx'))
const SourcesMethodology = lazy(() => import('./pages/SourcesMethodology.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const CaseLaw = lazy(() => import('./pages/CaseLaw.jsx'))
const HowNyayaWorks = lazy(() => import('./pages/HowNyayaWorks.jsx'))
const Disclaimer = lazy(() => import('./pages/Disclaimer.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const Accessibility = lazy(() => import('./pages/Accessibility.jsx'))
const RightsHub = lazy(() => import('./pages/RightsHub.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  return (
    <LanguageProvider>
      <BookmarkProvider>
        <BreadcrumbProvider>
          <ScrollManager />
          <PageTitleManager />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-navy focus:text-paper focus:px-4 focus:py-2 focus:rounded-sm focus:shadow-md focus:outline-hidden focus:ring-2 focus:ring-brass"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <Breadcrumbs />
            <main id="main-content" tabIndex="-1" className="flex-1 focus:outline-none">
              <ErrorBoundary>
                <Suspense fallback={<LoadingState label="Loading page..." />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/fundamental-rights" element={<FundamentalRights />} />
                    <Route path="/constitution" element={<FundamentalRights />} />
                    <Route path="/know-your-rights" element={<RightsHub />} />
                    <Route path="/rights-hub" element={<RightsHub />} />
                    <Route path="/rights" element={<RightsHub />} />
                    <Route path="/bns" element={<LawDetails forcedId="bns-2023" />} />
                    <Route path="/bnss" element={<LawDetails forcedId="bnss-2023" />} />
                    <Route path="/laws" element={<LawExplorer />} />
                    <Route path="/laws/:lawId" element={<LawDetails />} />
                    <Route path="/case-law" element={<CaseLaw />} />
                    <Route path="/cases" element={<CaseLaw />} />
                    <Route path="/saved" element={<Saved />} />
                    <Route path="/bookmarks" element={<Saved />} />
                    <Route path="/tools" element={<LegalTools />} />
                    <Route path="/legal-tools" element={<LegalTools />} />
                    <Route path="/workflow" element={<AiWorkflow />} />
                    <Route path="/ai-workflow" element={<AiWorkflow />} />
                    <Route path="/information-workflow" element={<AiWorkflow />} />
                    <Route path="/ask" element={<AiWorkflow />} />
                    <Route path="/harmed" element={<Harmed />} />
                    <Route path="/what-happened" element={<Harmed />} />
                    <Route path="/harmed/result" element={<SituationResult />} />
                    <Route path="/what-happened/result" element={<SituationResult />} />
                    <Route path="/legal-terms" element={<LegalTerms />} />
                    <Route path="/compare" element={<CompareLaws />} />
                    <Route path="/compare-laws" element={<CompareLaws />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/sources-methodology" element={<SourcesMethodology />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/how-nyaya-works" element={<HowNyayaWorks />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/accessibility" element={<Accessibility />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </BreadcrumbProvider>
      </BookmarkProvider>
    </LanguageProvider>
  )
}

