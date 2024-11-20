import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const AboutPage = () => {
  React.useEffect(() => {
    document.title = 'About CostcoFuelPrices.com - Your Trusted Gas Price Source';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">About Us</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About CostcoFuelPrices.com</h1>
        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At CostcoFuelPrices.com, our mission is to help consumers find the best gas prices at 
              Costco locations across North America. We believe in providing accurate, up-to-date 
              information to help you save money on your fuel purchases.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 mb-4">
              We provide real-time information about:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Current gas prices at all Costco locations</li>
              <li>Price trends and historical data</li>
              <li>Location details and operating hours</li>
              <li>Comparative pricing analysis</li>
              <li>Money-saving tips for Costco fuel purchases</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-600">
              We are committed to maintaining the most accurate and current gas price information 
              possible. Our data is regularly updated throughout the day to ensure you have access 
              to the latest prices. While we strive for accuracy, please note that gas prices can 
              change frequently, and the final price will always be the one displayed at the pump.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Independent Service</h2>
            <p className="text-gray-600">
              CostcoFuelPrices.com is an independent website and is not affiliated with, endorsed by, 
              or connected to Costco Wholesale Corporation. We provide this service as a convenience 
              to Costco members looking to find the best gas prices in their area.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              We value your feedback and are always looking to improve our service. If you have any 
              questions, suggestions, or concerns, please don't hesitate to reach out:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@costcofuelprices.com</li>
                <li>Phone: 1-800-555-0123</li>
                <li>Address: 123 Gas Price Ave, Seattle, WA 98101</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;