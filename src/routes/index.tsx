import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import USMapPage from '../pages/USMapPage';
import USGasStations from '../pages/USGasStations';
import CanadaMapPage from '../pages/CanadaMapPage';
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
      <Route path="/station/us/:id" element={<StationPage />} />
      <Route path="/us/:state" element={<StatePage />} />
      <Route path="/us/:state/:city" element={<CityPage />} />
      
      {/* Support for /state/:state URLs */}
      <Route path="/state/:state" element={<StatePage />} />
      
      {/* Canada Routes */}
      <Route path="/canada-map" element={<CanadaMapPage />} />
      <Route path="/canada-gas-stations" element={<CanadaGasStations />} />
      <Route path="/station/canada/:id" element={<StationPage />} />
      <Route path="/canada/:state" element={<StatePage />} />
      <Route path="/canada/:state/:city" element={<CityPage />} />
      
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