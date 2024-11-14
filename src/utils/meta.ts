// Meta tag management utilities
export const setMetaDescription = (description: string) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Update OpenGraph and Twitter descriptions
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  
  if (ogDescription) {
    ogDescription.setAttribute('content', description);
  }
  if (twitterDescription) {
    twitterDescription.setAttribute('content', description);
  }
};

export const setMetaTitle = (title: string) => {
  document.title = title;

  // Update OpenGraph and Twitter titles
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  if (twitterTitle) {
    twitterTitle.setAttribute('content', title);
  }
};

export const getDefaultTitle = (path: string): string => {
  const titles: { [key: string]: string } = {
    '/': 'Costco Gas Prices - Find the Best Fuel Prices at Costco Gas Stations',
    '/about': 'About CostcoFuelPrices.com - Your Trusted Gas Price Source',
    '/faq': 'Frequently Asked Questions - CostcoFuelPrices.com',
    '/privacy': 'Privacy Policy - CostcoFuelPrices.com',
    '/terms': 'Terms & Conditions - CostcoFuelPrices.com',
    '/contact': 'Contact Us - CostcoFuelPrices.com',
    '/disclaimer': 'Disclaimer - CostcoFuelPrices.com',
    '/us-gas-stations': 'Costco Gas Prices - United States Locations',
    '/canada-gas-stations': 'Costco Gas Prices - Canada Locations',
    '/search': 'Search Costco Gas Stations by State or Province'
  };

  return titles[path] || 'Costco Gas Prices - Find the Best Fuel Prices';
};

export const getDefaultDescription = (path: string): string => {
  const descriptions: { [key: string]: string } = {
    '/': 'Find real-time Costco gas prices, compare fuel costs, and locate the nearest Costco gas station. Save money on your next fill-up with our comprehensive price tracking.',
    '/about': 'Learn about CostcoFuelPrices.com, your trusted source for real-time Costco gas prices and fuel cost comparisons across North America.',
    '/faq': 'Find answers to frequently asked questions about Costco gas prices, membership requirements, and fuel quality.',
    '/privacy': 'Read our privacy policy to understand how we protect your information while using our Costco gas price tracking service.',
    '/terms': 'Review our terms and conditions for using CostcoFuelPrices.com, your source for Costco gas price information.',
    '/contact': 'Get in touch with our team for questions about Costco gas prices, website feedback, or support inquiries.',
    '/disclaimer': 'Important information about the accuracy and usage of Costco gas price data on CostcoFuelPrices.com.',
    '/us-gas-stations': 'Browse Costco gas prices across all United States locations. Find the best fuel prices near you.',
    '/canada-gas-stations': 'Discover Costco gas prices throughout Canada. Compare fuel costs and find nearby locations.',
    '/search': 'Search Costco gas stations by state, province, or location to find the best fuel prices near you.',
  };

  return descriptions[path] || descriptions['/'];
};