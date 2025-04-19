import React from 'react';

/**
 * HowWeWorkSection Component
 *
 * Displays the process of working with Vonoy in three steps.
 */
const HowWeWorkSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-md bg-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Free Consultations</h3>
            <p className="text-gray-600">We assess your operational challenges and goals.</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Free Proof Of Concept</h3>
            <p className="text-gray-600">
              We test our models on a real subset of your data to show tangible results.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-gray-100">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Custom Implementation</h3>
            <p className="text-gray-600">
              If you're satisfied, we move forward with a custom solution that fits your operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
