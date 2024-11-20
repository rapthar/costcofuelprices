import React from 'react';

const guides = [
  {
    title: "What Is Costco's Return Policy? A Comprehensive Guide to Hassle-Free Returns",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=800",
    description: "Everything you need to know about Costco's return policy, including special cases with gas purchases."
  },
  {
    title: "Complete Guide to Costco Membership Renewal: Benefits, Steps, and Tips",
    image: "https://images.unsplash.com/photo-1572974601748-c7118b9bb2f5?q=80&w=800",
    description: "Learn about the benefits of a Costco membership, including access to their competitively priced gas stations."
  },
  {
    title: "What Payment Methods Are Accepted at Costco? Your Complete Guide",
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=800",
    description: "Discover the various payment options available at Costco gas stations and warehouses."
  }
];

const Guides = () => {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
        Latest Costco Fuel Price Guides
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Stay Informed! The Latest Tips and Guides for Fuel Prices and Savings
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <div key={guide.title} className="group">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <img
                src={guide.image}
                alt={guide.title}
                className="rounded-lg object-cover w-full h-48"
              />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {guide.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {guide.description}
            </p>
            <a
              href="#"
              className="text-red-600 font-medium text-sm hover:text-red-700"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;