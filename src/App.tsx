import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import MetaManager from './components/MetaManager';
import Hero from './components/Hero';
import NationalAverage from './components/NationalAverage';
import PopularStations from './components/PopularStations';
import StateGrid from './components/StateGrid';
import StationPage from './pages/StationPage';
import StatePage from './pages/StatePage';
import CityPage from './pages/CityPage';
import MapPage from './pages/USMapPage';
import CanadaMapPage from './pages/CanadaMapPage';
import USGasStations from './pages/USGasStations';
import CanadaGasStations from './pages/CanadaGasStations';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import DisclaimerPage from './pages/DisclaimerPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import { Home, Globe2, Wrench, Mail, Search } from 'lucide-react';

function App() {
  return (
    <Router>
      <MetaManager />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                <img src="/logo.svg" alt="CostcoFuelPrices" className="h-14" />
              </Link>
              <nav className="hidden md:flex items-center space-x-8">
                {/* Navigation items */}
                <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                    <Globe2 className="w-4 h-4" />
                    <span>Maps</span>
                  </button>
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to="/us-map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      United States Map
                    </Link>
                    <Link to="/canada-map" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Canada Map
                    </Link>
                  </div>
                </div>
                <div className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                    <Globe2 className="w-4 h-4" />
                    <span>Locations</span>
                  </button>
                  <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to="/us-gas-stations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Costco United States
                    </Link>
                    <Link to="/canada-gas-stations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Costco Canada
                    </Link>
                  </div>
                </div>
                <Link to="/search" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                  <Search className="w-4 h-4" />
                  <span>Search By State/Province</span>
                </Link>
                <Link to="/tools" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                  <Wrench className="w-4 h-4" />
                  <span>Gas Tools</span>
                </Link>
                <Link to="/contact" className="flex items-center text-gray-600 hover:text-gray-900 gap-1">
                  <Mail className="w-4 h-4" />
                  <span>Contact Us</span>
                </Link>
              </nav>
              
              {/* Mobile menu button */}
              <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <Hero />
                </div>
                <NationalAverage />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <PopularStations />
                  <StateGrid />
                </div>
              </div>
            } />
            <Route path="/us-map" element={<MapPage />} />
            <Route path="/canada-map" element={<CanadaMapPage />} />
            <Route path="/station/:id" element={<StationPage />} />
            <Route path="/state/:state" element={<StatePage />} />
            <Route path="/state/:state/:city" element={<CityPage />} />
            <Route path="/us-gas-stations" element={<USGasStations />} />
            <Route path="/canada-gas-stations" element={<CanadaGasStations />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <Link to="/" className="inline-block">
                  <img src="/logo.svg" alt="CostcoFuelPrices" className="h-14 mb-4" />
                </Link>
                <p className="text-sm text-gray-500">
                  CostcoFuelPrices.com is an independent source for monitoring fuel prices at Costco gas stations. We are not affiliated with Costco.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                  <li><Link to="/disclaimer" className="text-gray-600 hover:text-gray-900">Disclaimer</Link></li>
                  <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
                  <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/guides" className="text-gray-600 hover:text-gray-900">Costco Guides</Link></li>
                  <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ's</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
              <p>Copyright {new Date().getFullYear()} Costco Fuel Price | All Rights Reserved</p>
            </div>
          </div>
        </footer>

        {/* Vercel Analytics */}
        <Analytics />
      </div>
    </Router>
  );
}

export default App;