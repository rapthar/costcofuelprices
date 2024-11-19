import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy - CostcoFuelPrices.com';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Privacy Policy</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Search queries and preferences</li>
              <li>Contact information when you reach out to us</li>
              <li>Usage data and interaction with our services</li>
              <li>Device and browser information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Provide and improve our services</li>
              <li>Respond to your requests and inquiries</li>
              <li>Send you updates and notifications about gas prices</li>
              <li>Analyze and enhance our website's performance</li>
              <li>Protect against fraudulent or unauthorized activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Remember your preferences</li>
              <li>Analyze website traffic</li>
              <li>Personalize your experience</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with supervisory authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Security</h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
              privacy policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-600">
                <li>Email: privacy@costcofuelprices.com</li>
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

export default PrivacyPage;