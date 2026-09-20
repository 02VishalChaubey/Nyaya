import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import FundamentalRights from './pages/FundamentalRights.jsx'
import LawExplorer from './pages/LawExplorer.jsx'
import LawDetails from './pages/LawDetails.jsx'
import Harmed from './pages/Harmed.jsx'
import SituationResult from './pages/SituationResult.jsx'
import LegalTerms from './pages/LegalTerms.jsx'
import Search from './pages/Search.jsx'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fundamental-rights" element={<FundamentalRights />} />
          <Route path="/bns" element={<LawDetails forcedId="bns-2023" />} />
          <Route path="/bnss" element={<LawDetails forcedId="bnss-2023" />} />
          <Route path="/laws" element={<LawExplorer />} />
          <Route path="/laws/:lawId" element={<LawDetails />} />
          <Route path="/harmed" element={<Harmed />} />
          <Route path="/harmed/result" element={<SituationResult />} />
          <Route path="/legal-terms" element={<LegalTerms />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
