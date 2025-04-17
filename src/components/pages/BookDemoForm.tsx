import React, { useRef, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { validateField, validateForm } from '../../utils/formValidation';
import { shakeElement } from '../../utils/microInteractions';
import styles from './BookDemo.module.css';

const BookDemoForm: React.FC = () => {
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

  return (
    <section
      id="book-demo-form"
      className={`${styles.formSection} w-full max-w-xl relative overflow-visible`}
    >
      <div className={styles.glassReflection} aria-hidden="true" />
      <form
        className={`${styles.form} space-y-6 relative z-10`}
        onSubmit={handleSubmit}
        ref={formRef}
        autoComplete="off"
        aria-label="Book a Demo Form"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
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
            />
            <label
              htmlFor="firstName"
              className={`${styles.label} ${formData.firstName ? styles.labelFloat : ''}`}
            >
              First Name*
            </label>
            {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
          </div>
          <div className="relative">
            <input
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
            />
            <label
              htmlFor="lastName"
              className={`${styles.label} ${formData.lastName ? styles.labelFloat : ''}`}
            >
              Last Name*
            </label>
            {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
          </div>
        </div>
        <div className="relative">
          <input
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
          />
          <label
            htmlFor="email"
            className={`${styles.label} ${formData.email ? styles.labelFloat : ''}`}
          >
            Email Address*
          </label>
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <select
              id="country"
              name="country"
              className={`peer ${styles.select}`}
              value={formData.country}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-label="Country"
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
            <label
              htmlFor="country"
              className={`${styles.label} ${formData.country ? styles.labelFloat : ''}`}
            >
              Country*
            </label>
          </div>
          <div className="relative">
            <select
              id="fleetSize"
              name="fleetSize"
              className={`peer ${styles.select}`}
              value={formData.fleetSize}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required
              aria-label="Fleet Size"
            >
              <option value="" disabled>
                Select fleet size
              </option>
              <option value="1-10">1-10 vehicles</option>
              <option value="11-50">11-50 vehicles</option>
              <option value="51-100">51-100 vehicles</option>
              <option value="101+">101+ vehicles</option>
            </select>
            <label
              htmlFor="fleetSize"
              className={`${styles.label} ${formData.fleetSize ? styles.labelFloat : ''}`}
            >
              Number of Fleet*
            </label>
          </div>
        </div>
        <div className="relative">
          <PhoneInput
            country={countryPhoneMap[formData.country] || 'ae'}
            value={formData.phone}
            onChange={handlePhoneChange}
            enableSearch
            inputStyle={{}}
            buttonStyle={{}}
            dropdownStyle={{}}
            disableDropdown={false}
            placeholder="Mobile number"
            inputProps={{
              name: 'phone',
              required: true,
              'aria-label': 'Mobile Number',
            }}
            containerClass={styles.phoneInputContainer}
            searchStyle={{}}
          />
          <label
            htmlFor="phone"
            className={`${styles.label} ${formData.phone ? styles.labelFloat : ''}`}
          >
            Mobile Number*
          </label>
        </div>
        <div className="relative">
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
          <label
            htmlFor="industry"
            className={`${styles.label} ${formData.industry ? styles.labelFloat : ''}`}
          >
            Industry*
          </label>
        </div>
        <div className="relative">
          <select
            id="product"
            name="product"
            className={`peer ${styles.select}`}
            value={formData.product}
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label="Product"
          >
            <option value="" disabled>
              Select product
            </option>
            <option value="fleet-management">Fleet Management</option>
            <option value="route-optimization">Route Optimization</option>
            <option value="analytics">Analytics Platform</option>
            <option value="carbon-reduction">Carbon Footprint Reduction</option>
          </select>
          <label
            htmlFor="product"
            className={`${styles.label} ${formData.product ? styles.labelFloat : ''}`}
          >
            Interested in a specific product?
          </label>
        </div>
        <div className="relative">
          <textarea
            id="message"
            name="message"
            placeholder=" "
            className={`peer ${styles.textarea}`}
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            aria-label="Message"
          ></textarea>
          <label
            htmlFor="message"
            className={`${styles.label} ${formData.message ? styles.labelFloat : ''}`}
          >
            Message
          </label>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn + (isSubmitting ? ' ' + styles.btnDisabled : '')}
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
        {submitSuccess && (
          <div className={styles.successMsg}>Thank you! We received your request.</div>
        )}
      </form>
    </section>
  );
};

export default BookDemoForm;
