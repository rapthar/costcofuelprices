import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    document.title = 'Frequently Asked Questions - CostcoFuelPrices.com';
  }, []);

  const faqs = [
    {
      question: "How often are Costco gas prices updated?",
      answer: "Our gas prices are updated multiple times throughout the day. However, please note that actual prices at the pump may vary and the final price will be the one displayed at the Costco gas station at the time of purchase."
    },
    {
      question: "Do I need a Costco membership to get gas at Costco?",
      answer: "Yes, a valid Costco membership is required to purchase gas at Costco fuel stations. Both the standard Gold Star membership and Executive membership allow access to Costco gas stations."
    },
    {
      question: "Why are Costco gas prices generally lower than other stations?",
      answer: "Costco is able to offer lower gas prices due to their bulk purchasing power, efficient operations, and membership model. They often price their fuel competitively as a benefit to their members."
    },
    {
      question: "What types of fuel does Costco offer?",
      answer: "Most Costco gas stations offer Regular Unleaded, Premium Unleaded, and at select locations, Diesel fuel. All gasoline sold at Costco meets TOP TIER™ requirements."
    },
    {
      question: "What payment methods are accepted at Costco gas stations?",
      answer: "Costco gas stations accept most major credit cards and debit cards. The Costco Anywhere Visa® Card by Citi offers additional cash back on gas purchases at Costco."
    },
    {
      question: "How accurate are the prices shown on this website?",
      answer: "While we strive to maintain accurate and up-to-date pricing information, prices may vary from what is displayed on our website. The actual price will be shown at the pump and may be different due to market fluctuations and timing of updates."
    },
    {
      question: "Are Costco gas stations open 24/7?",
      answer: "No, Costco gas stations typically operate during standard Costco Warehouse hours, though they may open slightly earlier or close slightly later than the warehouse. Specific hours vary by location."
    },
    {
      question: "How can I report an incorrect price?",
      answer: "If you notice an incorrect price listing on our website, please contact us through our Contact page. We appreciate your help in maintaining accurate information."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-700">Home</Link>
        <span>/</span>
        <span className="text-gray-900">FAQ's</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">
          Find answers to common questions about Costco gas prices, membership requirements, and more.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for? Please reach out to our friendly team.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;