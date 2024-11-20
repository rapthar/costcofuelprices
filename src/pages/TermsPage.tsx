import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  React.useEffect(() => {
    document.title = 'Terms & Conditions - CostcoFuelPrices.com';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Terms & Conditions</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing and using CostcoFuelPrices.com, you agree to be bound by these Terms and Conditions. 
              If you disagree with any part of these terms, you may not access the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Price Information</h2>
            <p className="text-gray-600 mb-4">
              While we strive to provide accurate and up-to-date fuel price information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All prices are subject to change without notice</li>
              <li>Actual prices may vary from those displayed on the website</li>
              <li>The final price will be the price displayed at the Costco gas station at time of purchase</li>
              <li>We are not responsible for any decisions made based on the information provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-600">
              The website and its original content, features, and functionality are owned by CostcoFuelPrices.com 
              and are protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              When using our website, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Collect or track personal information of other users</li>
              <li>Spam, phish, or harm others in any way</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Disclaimer</h2>
            <p className="text-gray-600">
              CostcoFuelPrices.com is not affiliated with Costco Wholesale Corporation. We provide this service 
              as an independent source of information. The website is provided "as is" without any warranties, 
              expressed or implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event shall CostcoFuelPrices.com be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising out of or relating to your use of the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will notify users of any changes by 
              updating the "Last updated" date of these terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-600">
                <li>Email: terms@costcofuelprices.com</li>
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

export default TermsPage;