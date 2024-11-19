import React from 'react';
import { Link } from 'react-router-dom';

const DisclaimerPage = () => {
  React.useEffect(() => {
    document.title = 'Disclaimer - CostcoFuelPrices.com';
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Disclaimer</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Website Information</h2>
            <p className="text-gray-600">
              CostcoFuelPrices.com is an independent website that provides information about gas prices 
              at Costco locations. We are not affiliated with, endorsed by, or connected to Costco 
              Wholesale Corporation in any way.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Price Accuracy</h2>
            <p className="text-gray-600 mb-4">
              While we strive to maintain accurate and current information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>All prices shown are subject to change without notice</li>
              <li>Actual prices may differ from those displayed on this website</li>
              <li>The final price will be the price shown at the pump at the time of purchase</li>
              <li>Price updates may be delayed due to various factors</li>
              <li>We cannot guarantee the accuracy of prices at any given time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. No Warranty</h2>
            <p className="text-gray-600">
              The information provided on this website is for general informational purposes only. 
              It is provided "as is" without any representations or warranties, express or implied. 
              We make no representations or warranties about the accuracy, completeness, or suitability 
              of the information contained on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Decision Making</h2>
            <p className="text-gray-600">
              Any reliance you place on the information provided is strictly at your own risk. You 
              should always verify the actual price at the gas station before making any decisions 
              or taking any actions based on the information provided on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              In no event will we be liable for any loss or damage including without limitation, 
              indirect or consequential loss or damage, or any loss or damage whatsoever arising 
              from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. External Links</h2>
            <p className="text-gray-600">
              Through this website, you may link to other websites which are not under our control. 
              We have no control over the nature, content, and availability of those sites. The 
              inclusion of any links does not necessarily imply a recommendation or endorsement of 
              the views expressed within them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Updates to Disclaimer</h2>
            <p className="text-gray-600">
              We reserve the right to make changes to this disclaimer at any time. We encourage you 
              to periodically review this page for the latest information on our disclaimers and 
              limitations of liability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this disclaimer, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-2 text-gray-600">
                <li>Email: legal@costcofuelprices.com</li>
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

export default DisclaimerPage;