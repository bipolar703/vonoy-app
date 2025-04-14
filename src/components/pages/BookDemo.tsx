import React, { useEffect, useRef, useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./BookDemo.module.css";
import PageTransition from "../layout/PageTransition";
import anime from "animejs";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

/**
 * BookDemo Page Component
 * Fully polished, high-end, and fully responsive.
 * Implements premium geometric design, glassmorphism, and modern form UX.
 */
const BookDemo: React.FC = () => {
  const animationRef = useRef<anime.AnimeInstance | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    fleetSize: "",
    phone: "",
    product: "",
    message: "",
    industry: "",
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'fleetSize', 'industry'];
    const isValid = requiredFields.every(field => formData[field as keyof typeof formData]);

    if (!isValid) {
      // Animate missing fields
      requiredFields.forEach(field => {
        if (!formData[field as keyof typeof formData]) {
          const element = document.getElementById(field);
          if (element) {
            anime({
              targets: element,
              translateX: [0, -10, 10, -10, 10, 0],
              duration: 500,
              easing: 'easeInOutSine'
            });
          }
        }
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          fleetSize: "",
          phone: "",
          product: "",
          message: "",
          industry: "",
        });
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  // Animate geometric lines and form fields
  useEffect(() => {
    if (inView) {
      animationRef.current = anime({
        targets: `.${styles.geometricLine}`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 2000,
        delay: (el, i) => i * 250,
        opacity: [0, 1],
      });
      anime({
        targets: `.${styles.formGroup}`,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 800,
        delay: anime.stagger(100),
      });
    }
    return () => {
      if (animationRef.current) animationRef.current.pause();
    };
  }, [inView]);

  // Geometric design
  const GeometricDesign = () => {
    useEffect(() => {
      anime({
        targets: '.geometric-shape',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
        duration: 1000
      });
    }, []);
    return (
      <div className="absolute left-0 bottom-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[80%] h-[70%] transform rotate-[-15deg] translate-x-[-20%] translate-y-[30%] geometric-shape opacity-0">
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/20 rounded-[50px]" />
        </div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[50%] transform rotate-[-25deg] translate-x-[-10%] translate-y-[40%] geometric-shape opacity-0">
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/30 rounded-[50px]" />
        </div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[30%] transform rotate-[-35deg] translate-x-[-5%] translate-y-[50%] geometric-shape opacity-0">
          <div className="w-full h-full border-[3px] border-[#2A9D8F]/40 rounded-[50px]" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PageTransition />
      <Navbar />
      <main className="flex-grow" ref={sectionRef}>
        <div className="min-h-screen bg-[#0A1520] text-white p-6 md:p-12 relative overflow-hidden">
          <GeometricDesign />
          <nav className="mb-8 relative z-10">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
              <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[#2A9D8F]">Book a Demo</span>
            </div>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto relative z-10">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Transform Your Fleet Operations with AI-Powered Efficiency
              </h1>
              <div className="p-6 bg-[#2A9D8F]/10 rounded-lg border border-[#2A9D8F]/20">
                <p className="text-lg text-white/80">
                  Experience the future of fleet management with our AI-driven solutions.
                  Book a demo today and discover how we can optimize your operations.
                </p>
              </div>
            </div>
            <form
              className="space-y-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl"
              onSubmit={handleSubmit}
              ref={formRef}
              autoComplete="off"
              aria-label="Book a Demo Form"
            >
              <div className="grid md:grid-cols-2 gap-4 formGroup">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-white/80">First Name*</label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-white/80">Last Name*</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="email" className="text-sm font-medium text-white/80">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="country" className="text-sm font-medium text-white/80">Country*</label>
                <select
                  id="country"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  required
                >
                  <option value="" disabled>Select your country</option>
                  <option value="ae">United Arab Emirates</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="sa">Saudi Arabia</option>
                  <option value="eg">Egypt</option>
                </select>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="fleetSize" className="text-sm font-medium text-white/80">Number of Fleet*</label>
                <select
                  id="fleetSize"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.fleetSize}
                  onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}
                  required
                >
                  <option value="" disabled>Select fleet size</option>
                  <option value="1-10">1-10 vehicles</option>
                  <option value="11-50">11-50 vehicles</option>
                  <option value="51-100">51-100 vehicles</option>
                  <option value="101+">101+ vehicles</option>
                </select>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="phone" className="text-sm font-medium text-white/80">Mobile Number</label>
                <div className="flex">
                  <div className="flex items-center bg-white/10 border border-white/20 border-r-0 rounded-l-md px-3">
                    <span className="text-white/80">+971</span>
                    <svg className="w-4 h-4 ml-1 text-white/50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="flex-1 bg-white/10 border border-white/20 rounded-r-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="industry" className="text-sm font-medium text-white/80">Industry*</label>
                <select
                  id="industry"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  required
                >
                  <option value="" disabled>Select your industry</option>
                  <option value="fmcg">FMCG Distribution</option>
                  <option value="lastmile">Last-Mile Delivery</option>
                  <option value="cashvan">Cash Van Delivery</option>
                  <option value="postal">Postal & Courier</option>
                  <option value="coldchain">Cold Chain & Pharma</option>
                  <option value="ev">EV Fleet Operations</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="product" className="text-sm font-medium text-white/80">Interested in a specific product?</label>
                <select
                  id="product"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  value={formData.product}
                  onChange={(e) => setFormData({...formData, product: e.target.value})}
                >
                  <option value="" disabled>Select product</option>
                  <option value="fleet-management">Fleet Management</option>
                  <option value="route-optimization">Route Optimization</option>
                  <option value="analytics">Analytics Platform</option>
                  <option value="carbon-reduction">Carbon Footprint Reduction</option>
                </select>
              </div>
              <div className="space-y-2 formGroup">
                <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <div className="formGroup">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-medium rounded-md hover:from-[#238276] hover:to-[#1A6E64] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group relative overflow-hidden ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                  aria-busy={isSubmitting}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : submitSuccess ? (
                      <>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Request Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Book a Demo</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2A9D8F] to-[#238276] group-hover:scale-105 transition-transform duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
