import React, { useRef, useState } from 'react';
import { validateField, validateForm } from '../../utils/formValidation';
import { shakeElement } from '../../utils/microInteractions';
import FloatingLabelField from '../ui/FloatingLabelField.tsx';
import styles from './BookDemo.module.css';

const BookDemoForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<Record<string, string>>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    fleetSize: '',
    phone: '',
    message: '',
    industry: '',
    companyName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
          message: '',
          industry: '',
          companyName: '',
        });
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch {
      setIsSubmitting(false);
    }
  };

  // Helper for select validation
  const isSelectValid = (name: string) => {
    return formData[name] && !errors[name];
  };

  return (
    <section
      id="book-demo-form"
      className={`${styles.formSection} w-full relative overflow-visible`}
    >
      <form
        className="bg-[#16232e] rounded shadow-lg p-4 px-4 md:p-8 mb-6 grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3"
        onSubmit={handleSubmit}
        ref={formRef}
        autoComplete="off"
        aria-label="Book a Demo Form"
      >
        <div className="text-white flex flex-col gap-2">
          <p className="font-medium text-lg">Personal Details</p>
          <p>Please fill out all the fields.</p>
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-1">
              <FloatingLabelField
                id="firstName"
                name="firstName"
                type="text"
                placeholder=" "
                className={`peer ${styles.input}`}
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="First Name"
                error={errors.firstName}
                success={!!formData.firstName && !errors.firstName}
                label="First Name*"
              />
            </div>
            <div className="md:col-span-1">
              <FloatingLabelField
                id="lastName"
                name="lastName"
                type="text"
                placeholder=" "
                className={`peer ${styles.input}`}
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="Last Name"
                error={errors.lastName}
                success={!!formData.lastName && !errors.lastName}
                label="Last Name*"
              />
            </div>
            <div className="md:col-span-2">
              <FloatingLabelField
                id="companyName"
                name="companyName"
                type="text"
                placeholder=" "
                className={`peer ${styles.input}`}
                value={formData.companyName || ''}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="Company Name"
                error={errors.companyName}
                success={!!formData.companyName && !errors.companyName}
                label="Company Name*"
              />
            </div>
            <div className="md:col-span-2">
              <FloatingLabelField
                id="email"
                name="email"
                type="email"
                placeholder=" "
                className={`peer ${styles.input}`}
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="Email Address"
                error={errors.email}
                success={!!formData.email && !errors.email}
                label="Email Address*"
              />
            </div>
            <div className="md:col-span-2">
              <FloatingLabelField
                id="country"
                name="country"
                type="text"
                placeholder=" "
                className={`peer ${styles.input} ${!!formData.country && !errors.country ? 'valid' : ''}`}
                value={formData.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="Country"
                error={errors.country}
                success={!!formData.country && !errors.country}
                label="Country*"
              />
            </div>
            <div className="md:col-span-2">
              <FloatingLabelField
                id="phone"
                name="phone"
                type="tel"
                className={`peer ${styles.input} ${!!formData.phone && !errors.phone ? 'valid' : ''}`}
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-label="Phone number"
                error={errors.phone}
                success={!!formData.phone && !errors.phone}
                label="Phone number*"
                autoComplete="tel"
              />
              {errors.phone && (
                <span className="mt-1 text-xs text-red-500 block">{errors.phone}</span>
              )}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label
                  htmlFor="fleetSize"
                  className={`${styles.label} ${styles.labelFloat} ${errors.fleetSize ? 'text-red-500' : isSelectValid('fleetSize') ? 'text-[#3dd598]' : 'text-white'}`}
                >
                  Fleet Size*
                </label>
                <select
                  id="fleetSize"
                  name="fleetSize"
                  className={`peer ${styles.select} ${isSelectValid('fleetSize') ? 'valid' : ''}`}
                  value={formData.fleetSize}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-label="Fleet Size"
                >
                  <option value="" disabled hidden>
                    Select fleet size
                  </option>
                  <option value="0-25">0-25</option>
                  <option value="25-50">25-50</option>
                  <option value="51-100">51-100</option>
                  <option value="101-250">101-250</option>
                  <option value="251+">251+</option>
                </select>
                {errors.fleetSize && (
                  <span className="mt-1 text-xs text-red-500 block">{errors.fleetSize}</span>
                )}
              </div>
              <div className="md:col-span-1">
                <label
                  htmlFor="industry"
                  className={`${styles.label} ${styles.labelFloat} ${errors.industry ? 'text-red-500' : isSelectValid('industry') ? 'text-green-500' : 'text-white'}`}
                >
                  Industry*
                </label>
                <select
                  id="industry"
                  name="industry"
                  className={`peer ${styles.select}`}
                  value={formData.industry}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-label="Industry"
                >
                  <option value="" disabled hidden>
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
                {errors.industry && (
                  <span className="mt-1 text-xs text-red-500 block">{errors.industry}</span>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <FloatingLabelField
                id="message"
                name="message"
                placeholder=" "
                className={`peer ${styles.textarea}`}
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-label="Message"
                error={errors.message}
                success={!!formData.message && !errors.message}
                textarea
                label="Message"
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  styles.submitBtn +
                  (isSubmitting ? ' ' + styles.btnDisabled : '') +
                  ' transition-opacity duration-500 relative'
                }
                aria-busy={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pl-2">
                      <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    </span>
                    <span className="pl-6 animate-pulse">Processing...</span>
                  </>
                ) : submitSuccess ? (
                  <span>Request Sent!</span>
                ) : (
                  <span>Book a Demo</span>
                )}
              </button>
            </div>
            {submitSuccess && (
              <div
                className={
                  styles.successMsg +
                  ' md:col-span-2 transition-opacity duration-700 animate-fade-in'
                }
              >
                Thank you! We received your request.
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default BookDemoForm;
