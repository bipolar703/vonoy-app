import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';

// Define staggerContainer type and implementation since it's missing from an import
const staggerContainer = (staggerChildren: number, delayChildren?: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren: delayChildren || 0,
    },
  },
});

// Define fadeInUp animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * BookDemo Page Component
 * Fully polished, high-end, and fully responsive.
 * Implements premium geometric design, glassmorphism, and modern form UX.
 */
const BookDemo: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: sectionRef } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    fleetSize: '',
    phone: '',
    product: '',
    message: '',
    industry: '',
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'fleetSize', 'industry'];
    const isValid = requiredFields.every((field) => formData[field as keyof typeof formData]);

    if (!isValid) {
      // Animate missing fields
      requiredFields.forEach((field) => {
        if (!formData[field as keyof typeof formData]) {
          const element = document.getElementById(field);
          if (element) {
            // Use DOM animation API instead of anime.js
            element.animate(
              [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' },
              ],
              {
                duration: 500,
                easing: 'ease-in-out',
              }
            );
          }
        }
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          country: '',
          fleetSize: '',
          phone: '',
          product: '',
          message: '',
          industry: '',
        });
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      // Handle error silently
      setIsSubmitting(false);
    }
  };

  // Geometric design with Framer Motion
  const GeometricDesign = () => {
    return (
      <div className="absolute left-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-[80%] h-[70%] transform rotate-[-15deg] translate-x-[-20%] translate-y-[30%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/20 rounded-[50px]" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-[60%] h-[50%] transform rotate-[-25deg] translate-x-[-10%] translate-y-[40%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/30 rounded-[50px]" />
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 w-[40%] h-[30%] transform rotate-[-35deg] translate-x-[-5%] translate-y-[50%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/40 rounded-[50px]" />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageTransition />
      <Navbar />
      <motion.main
        className="flex-grow"
        ref={sectionRef}
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.2)}
      >
        <div className="min-h-screen bg-[#0A1520] text-white p-6 md:p-12 pt-16 relative overflow-hidden">
          <GeometricDesign />
          <nav className="mb-8 relative z-10">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <svg
                className="w-4 h-4 text-white/50"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[#2A9D8F]">Book a Demo</span>
            </div>
          </nav>
          <motion.div
            className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto relative z-10"
            variants={staggerContainer(0.1)}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform Your Fleet Operations with AI-Powered Efficiency
              </h1>
              <div className="p-6 bg-[#2A9D8F]/10 rounded-lg border border-[#2A9D8F]/20">
                <p className="text-lg text-white/80">
                  Experience the future of fleet management with our AI-driven solutions. Book a
                  demo today and discover how we can optimize your operations.
                </p>
              </div>
            </motion.div>
            <motion.form
              variants={fadeInUp}
              className="space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl"
              onSubmit={handleSubmit}
              ref={formRef}
              autoComplete="off"
              aria-label="Book a Demo Form"
            >
              <motion.div className="grid md:grid-cols-2 gap-4" variants={fadeInUp} custom={1}>
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-white/80">
                    First Name*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-white/80">
                    Last Name*
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={2}>
                <label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email Address*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={3}>
                <label htmlFor="country" className="text-sm font-medium text-white/80">
                  Country*
                </label>
                <select
                  id="country"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="eg">Egypt</option>
                </select>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={4}>
                <label htmlFor="fleetSize" className="text-sm font-medium text-white/80">
                  Number of Fleet*
                </label>
                <select
                  id="fleetSize"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.fleetSize}
                  onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select fleet size
                  </option>
                  <option value="1-10">1-10 vehicles</option>
                  <option value="11-50">11-50 vehicles</option>
                  <option value="51-100">51-100 vehicles</option>
                  <option value="101+">101+ vehicles</option>
                </select>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={5}>
                <label htmlFor="phone" className="text-sm font-medium text-white/80">
                  Mobile Number
                </label>
                <div className="flex">
                  <div className="flex items-center bg-white/10 border border-white/20 border-r-0 rounded-l-md px-3">
                    <span className="text-white/80">+971</span>
                    <svg
                      className="w-4 h-4 ml-1 text-white/50"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="flex-1 bg-white/10 border border-white/20 rounded-r-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={6}>
                <label htmlFor="industry" className="text-sm font-medium text-white/80">
                  Industry*
                </label>
                <select
                  id="industry"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                >
                  <option value="" disabled>
                    Select your industry
                  </option>
                  <option value="fmcg">FMCG Distribution</option>
                  <option value="lastmile">Last-Mile Delivery</option>
                  <option value="cashvan">Cash Van Delivery</option>
                  <option value="postal">Postal & Courier</option>
                  <option value="coldchain">Cold Chain & Pharma</option>
                  <option value="ev">EV Fleet Operations</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={7}>
                <label htmlFor="product" className="text-sm font-medium text-white/80">
                  Interested in a specific product?
                </label>
                <select
                  id="product"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                >
                  <option value="" disabled>
                    Select product
                  </option>
                  <option value="fleet-management">Fleet Management</option>
                  <option value="route-optimization">Route Optimization</option>
                  <option value="analytics">Analytics Platform</option>
                  <option value="carbon-reduction">Carbon Footprint Reduction</option>
                </select>
              </motion.div>
              <motion.div className="space-y-2" variants={fadeInUp} custom={8}>
                <label htmlFor="message" className="text-sm font-medium text-white/80">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </motion.div>
              <motion.div variants={fadeInUp} custom={9}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-medium rounded-md hover:from-[#238276] hover:to-[#1A6E64] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                  aria-busy={isSubmitting}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : submitSuccess ? (
                      <>
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span>Request Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Book a Demo</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F] to-[#238276] group-hover:scale-105 transition-transform duration-300"></div>
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default BookDemo;
