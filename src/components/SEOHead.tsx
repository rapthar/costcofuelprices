import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData } from '../utils/seo';

interface SEOHeadProps {
  seo: SEOData;
}

const SEOHead: React.FC<SEOHeadProps> = ({ seo }) => {
  const {
    title,
    description,
    canonicalUrl,
    imageUrl = '/logo.svg',
    type = 'website'
  } = seo;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#005DAA" />
    </Helmet>
  );
};

export default SEOHead;