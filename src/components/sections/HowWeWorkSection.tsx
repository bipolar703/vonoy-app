import React from "react";

/**
 * HowWeWorkSection Component
 *
 * Displays the process of working with Vonoy in three steps.
 */
const HowWeWorkSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#f8fafc] text-[#0d1b2a]">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">How We Work</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
            <div className="mb-4 text-4xl">📝</div>
            <h3 className="font-semibold text-xl mb-2 text-center">Free Consultations</h3>
            <p className="text-center text-gray-700">We assess your operational challenges and goals</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
            <div className="mb-4 text-4xl">🔬</div>
            <h3 className="font-semibold text-xl mb-2 text-center">Free Proof Of Concept</h3>
            <p className="text-center text-gray-700">We test our models on a real subset of your data to show tangible results.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
            <div className="mb-4 text-4xl">⚙️</div>
            <h3 className="font-semibold text-xl mb-2 text-center">Custom Implementation</h3>
            <p className="text-center text-gray-700">If you’re satisfied, we move forward with a custom solution that fits your operation.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
