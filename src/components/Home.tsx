import React from "react";

// Navbar component
const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <img
              src="/logo.svg"
              alt="Vonoy"
              className="h-10"
              width="120"
              height="40"
              fetchPriority="high"
            />
          </a>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-secondary transition-colors">
            Home
          </a>
          <div className="relative group">
            <a
              href="/solutions"
              className="hover:text-secondary transition-colors flex items-center"
            >
              Solutions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
          <a
            href="/why-vonoy"
            className="hover:text-secondary transition-colors"
          >
            Why Vonoy?
          </a>
          <a
            href="/features"
            className="hover:text-secondary transition-colors"
          >
            Features
          </a>
          <a href="/contact" className="hover:text-secondary transition-colors">
            Contact Us
          </a>
          <div className="relative group">
            <a
              href="#"
              className="hover:text-secondary transition-colors flex items-center"
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="text-white bg-[#243450] px-4 py-2 rounded-md font-medium flex items-center">
              English
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <button className="bg-secondary text-primary px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  return (
    <section className="bg-primary text-white pt-28 pb-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Transform Your Fleet Operations with AI-Powered Efficiency
          </h1>
          <p className="text-xl mb-8">
            Vonoy helps businesses optimize fleet utilization, reduce costs, and
            enhance delivery efficiency with data-driven, AI-powered solutions.
          </p>
          <button className="bg-secondary text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-opacity-90 transition-colors flex items-center">
            Book a Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent"></div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="absolute border border-gray-700 rounded-full opacity-20"
            style={{
              top: "50%",
              right: "-30%",
              width: `${1000 + index * 100}px`,
              height: `${1000 + index * 100}px`,
              transform: "translate(0, -50%)",
            }}
          ></div>
        ))}
      </div>

      {/* Solutions panel */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-[#1a2a47]/80 p-6 rounded-lg backdrop-blur-sm border border-gray-800 max-w-md hidden lg:block">
        <h3 className="text-xl font-semibold mb-4">Our Solutions</h3>
        <div className="space-y-4">
          <div className="flex items-center p-3 hover:bg-dark rounded-md transition-colors cursor-pointer group">
            <div className="bg-gray-800 p-3 rounded-md mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">Fleet & Resource Management</h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center p-3 hover:bg-dark rounded-md transition-colors cursor-pointer group">
            <div className="bg-gray-800 p-3 rounded-md mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">
                Order Processing & Delivery Optimization
              </h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center p-3 hover:bg-dark rounded-md transition-colors cursor-pointer group">
            <div className="bg-gray-800 p-3 rounded-md mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">
                Real-Time Tracking & Communication
              </h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center p-3 hover:bg-dark rounded-md transition-colors cursor-pointer group">
            <div className="bg-gray-800 p-3 rounded-md mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">
                Data-Driven Decision Making & Analytics
              </h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div className="flex items-center p-3 hover:bg-dark rounded-md transition-colors cursor-pointer group">
            <div className="bg-gray-800 p-3 rounded-md mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium">Driver Mobile Application</h4>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// Platform Features section
const PlatformFeatures: React.FC = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-16 text-gray-800">
          Vonoy is not a one-size-fits-all platform. We provide:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Customizable dashboards
            </h3>
            <p className="text-gray-300">
              Adapt metrics and reports to your specific needs
            </p>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Flexible integrations
            </h3>
            <p className="text-gray-300">
              Seamlessly connect Vonoy with your existing software
            </p>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Tailored algorithms</h3>
            <p className="text-gray-300">
              Optimize routes based on your business model
            </p>
          </div>

          <div className="bg-primary text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Scalability</h3>
            <p className="text-gray-300">
              Suitable for companies of all sizes, from small businesses to
              enterprise-level logistics providers
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 w-48 h-48 opacity-20">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="100"
            x2="100"
            y2="20"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="100"
            x2="100"
            y2="40"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="100"
            x2="100"
            y2="60"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="100"
            x2="100"
            y2="80"
            stroke="#3DD598"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

// Who Can Benefit section
const WhoBenefits: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          Who Can Benefit from Vonoy?
        </h2>
        <p className="text-center text-lg mb-16 max-w-3xl mx-auto text-gray-600">
          Vonoy is not a one-size-fits-all platform. We provide:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Large-scale logistics companies
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              E-commerce businesses
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Delivery service providers
            </h3>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-secondary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Companies managing multiple fleets
            </h3>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 w-48 h-48 opacity-20 transform rotate-180">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="100"
            x2="100"
            y2="20"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="100"
            x2="100"
            y2="40"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="100"
            x2="100"
            y2="60"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="100"
            x2="100"
            y2="80"
            stroke="#3DD598"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

// Demo Video section
const DemoVideo: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-6 text-gray-800">
          See Vonoy in Action
        </h2>
        <p className="text-center text-lg mb-16 text-gray-600">
          A demo video explaining how Vonoy works
        </p>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary to-dark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-secondary opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-0 bottom-0 w-48 h-48 opacity-20 transform -scale-x-100">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="100"
            x2="100"
            y2="20"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="100"
            x2="100"
            y2="40"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="60"
            y1="100"
            x2="100"
            y2="60"
            stroke="#3DD598"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="100"
            x2="100"
            y2="80"
            stroke="#3DD598"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

// Footer component
const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="hover:text-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  className="hover:text-secondary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/solutions"
                  className="hover:text-secondary transition-colors"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="/customization"
                  className="hover:text-secondary transition-colors"
                >
                  Customization
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-secondary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/story"
                  className="hover:text-secondary transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="hover:text-secondary transition-colors"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a
                  href="/mission"
                  className="hover:text-secondary transition-colors"
                >
                  Our Mission & Vision
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li>Address: [Company Location]</li>
              <li>Phone: [Phone Number]</li>
              <li>Email: [contact@vonoy.co]</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Follow Us On</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-white w-10 h-10 rounded-full flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                </svg>
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="bg-dark text-white px-4 py-2 rounded-l-md w-full focus:outline-none"
              />
              <button className="bg-secondary text-primary px-4 py-2 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2025 Vonoy. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Home component
const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <PlatformFeatures />
      <WhoBenefits />
      <DemoVideo />
      <Footer />
    </div>
  );
};

export default Home;
