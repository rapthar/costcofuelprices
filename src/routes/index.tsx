import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import USMapPage from '../pages/USMapPage';
import CanadaMapPage from '../pages/CanadaMapPage';
import USGasStations from '../pages/USGasStations';
import CanadaGasStations from '../pages/CanadaGasStations';
import StatePage from '../pages/StatePage';
import CityPage from '../pages/CityPage';
import StationPage from '../pages/StationPage';
import SearchPage from '../pages/SearchPage';
import AboutPage from '../pages/AboutPage';
import DisclaimerPage from '../pages/DisclaimerPage';
import TermsPage from '../pages/TermsPage';
import PrivacyPage from '../pages/PrivacyPage';
import FAQPage from '../pages/FAQPage';
import ContactPage from '../pages/ContactPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* US Routes */}
      <Route path="/us-map" element={<USMapPage />} />
      <Route path="/us-gas-stations" element={<USGasStations />} />
      <Route path="/state/:state" element={<StatePage />} />
      <Route path="/state/:state/:city" element={<CityPage />} />
      <Route path="/station/us/:id" element={<StationPage />} />
      
      {/* Canada Routes */}
      <Route path="/canada-map" element={<CanadaMapPage />} />
      <Route path="/canada-gas-stations" element={<CanadaGasStations />} />
      <Route path="/canada/:state" element={<StatePage />} />
      <Route path="/canada/:state/:city" element={<CityPage />} />
      <Route path="/station/canada/:id" element={<StationPage />} />
      
      {/* Other Routes */}
      <Route path="/search" element={<SearchPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;