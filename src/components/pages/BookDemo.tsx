import React, { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validateField, validateForm } from '../../utils/formValidation';
import { shakeElement } from '../../utils/microInteractions';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';

const BookDemo: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, setTouched] = useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const countryPhoneMap: Record<string, string> = {
    ae: '971',
    us: '1',
    uk: '44',
    sa: '966',
    eg: '20',
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldType = name === 'email' ? 'email' : 'required';
    const validation = validateField(fieldType, value);

    setErrors((prev) => ({
      ...prev,
      [name]: validation.isValid ? '' : validation.errorMessage,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const validateAllFields = () => {
    const validationRules: Record<string, 'email' | 'name' | 'phone' | 'required'> = {
      firstName: 'name',
      lastName: 'name',
      email: 'email',
      country: 'required',
      fleetSize: 'required',
      industry: 'required',
    };

    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);
    setErrors(validationErrors);

    const allTouched = Object.keys(validationRules).reduce(
      (acc, field) => {
        acc[field] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

    setTouched(allTouched);
    return isValid && (formData.phone === '' || true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateAllFields();

    if (!isValid) {
      Object.keys(errors).forEach((field) => {
        if (errors[field]) {
          const element = document.getElementById(field);
          shakeElement(element);
        }
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);

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
      setIsSubmitting(false);
    }
  };

  const selectStyle = (value: string) => ({
    color: value ? '#102a43' : '#b0b7c3',
    backgroundColor: '#fff',
  });

  const GeometricDesign = () => (
    <div className="absolute left-0 bottom-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <svg width="100%" height="100%" className="absolute left-0 top-0">
        <defs>
          <filter id="grain" x="0" y="0">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="turb" />
            <feColorMatrix type="saturate" values="0.2" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.15" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" filter="url(#grain)" />
        <linearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0F2A3F" stopOpacity="0.25" />
        </linearGradient>
        <polyline
          points="0,400 200,300 400,500 800,200"
          fill="none"
          stroke="#2A9D8F"
          strokeWidth="8"
          opacity="0.12"
        />
        <circle cx="80%" cy="90%" r="120" fill="#2A9D8F" opacity="0.08" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A1520] to-[#0F2A3F] text-white">
      <PageTransition />
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center relative overflow-hidden px-2 md:px-0 pt-12 pb-12">
        <GeometricDesign />
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 rounded-3xl shadow-2xl p-4 md:p-10 relative z-10">
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#102a43]">
              Transform Your Fleet Operations with AI-Powered Efficiency
            </h1>
            <p className="text-lg text-[#4b5563]">
              Experience the future of fleet management with our AI-driven solutions. Book a demo
              today and discover how we can optimize your operations.
            </p>
          </div>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-[#b0b7c3]">
              <li>
                <a href="/contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>&gt;</li>
              <li className="text-[#fff] font-semibold">Book a Demo</li>
            </ol>
          </nav>
          <form
            className="space-y-6 bg-white/10 backdrop-blur-xl p-4 md:p-8 rounded-2xl border border-white/10 shadow-xl"
            onSubmit={handleSubmit}
            ref={formRef}
            autoComplete="off"
            aria-label="Book a Demo Form"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-[#102a43]">
                  First Name*
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] placeholder:text-[#b0b7c3] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-[#102a43]">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] placeholder:text-[#b0b7c3] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#102a43]">
                Email Address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] placeholder:text-[#b0b7c3] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="country" className="text-sm font-medium text-[#102a43]">
                Country*
              </label>
              <select
                id="country"
                name="country"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                style={selectStyle(formData.country)}
              >
                <option value="" disabled style={{ color: '#b0b7c3', backgroundColor: 'white' }}>
                  Select your country
                </option>
                <option value="ae">United Arab Emirates</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="sa">Saudi Arabia</option>
                <option value="eg">Egypt</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="fleetSize" className="text-sm font-medium text-[#102a43]">
                Number of Fleet*
              </label>
              <select
                id="fleetSize"
                name="fleetSize"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                value={formData.fleetSize}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                style={selectStyle(formData.fleetSize)}
              >
                <option value="" disabled style={{ color: '#b0b7c3', backgroundColor: 'white' }}>
                  Select fleet size
                </option>
                <option value="1-10">1-10 vehicles</option>
                <option value="11-50">11-50 vehicles</option>
                <option value="51-100">51-100 vehicles</option>
                <option value="101+">101+ vehicles</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-[#102a43]">
                Mobile Number*
              </label>
              <PhoneInput
                country={countryPhoneMap[formData.country] || 'ae'}
                value={formData.phone}
                onChange={handlePhoneChange}
                enableSearch
                inputClass="!w-full !bg-white !border !border-white/20 !rounded-lg !px-4 !py-3 !text-[#102a43] !placeholder-[#b0b7c3] focus:!outline-none focus:!ring-2 focus:!ring-[#2A9D8F]/50 transition-all duration-300"
                buttonClass="!bg-white !border-white/20 !rounded-l-lg"
                dropdownClass="!bg-white !text-[#102a43]"
                disableDropdown={false}
                placeholder="Enter your phone number"
                inputProps={{ name: 'phone', required: true }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium text-[#102a43]">
                Industry*
              </label>
              <select
                id="industry"
                name="industry"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                value={formData.industry}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                style={selectStyle(formData.industry)}
              >
                <option value="" disabled style={{ color: '#b0b7c3', backgroundColor: 'white' }}>
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
            </div>
            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-medium text-[#102a43]">
                Interested in a specific product?
              </label>
              <select
                id="product"
                name="product"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                value={formData.product}
                onChange={handleInputChange}
                onBlur={handleBlur}
                style={selectStyle(formData.product)}
              >
                <option value="" disabled style={{ color: '#b0b7c3', backgroundColor: 'white' }}>
                  Select product
                </option>
                <option value="fleet-management">Fleet Management</option>
                <option value="route-optimization">Route Optimization</option>
                <option value="analytics">Analytics Platform</option>
                <option value="carbon-reduction">Carbon Footprint Reduction</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-[#102a43]">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                className="w-full bg-white border border-white/20 rounded-lg px-4 py-3 text-[#102a43] placeholder:text-[#b0b7c3] focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]/50 transition-all duration-300"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-6 bg-gradient-to-r from-[#2A9D8F] to-[#238276] text-white font-bold rounded-xl shadow-xl hover:from-[#238276] hover:to-[#1A6E64] transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden text-lg md:text-xl tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2A9D8F] ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : submitSuccess ? (
                  <span>Request Sent!</span>
                ) : (
                  <span>Book a Demo</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
