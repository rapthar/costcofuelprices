import React from 'react';
import { useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from './SEOHead';
import { getDefaultSEO } from '../utils/seo';

const MetaManager: React.FC = ({ children }) => {
  const location = useLocation();
  const seo = getDefaultSEO(location.pathname);

  return (
    <HelmetProvider>
      <SEOHead seo={seo} />
      {children}
    </HelmetProvider>
  );
};

export default MetaManager;