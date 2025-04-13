import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./BookDemo.module.css";

/**
 * Form field validation interface
 */
interface FormField {
  value: string;
  error: string;
  touched: boolean;
}

/**
 * Form state interface
 */
interface FormState {
  name: FormField;
  company: FormField;
  email: FormField;
  phone: FormField;
  industry: FormField;
  message: FormField;
}

/**
 * BookDemo Page Component
 *
 * A page for users to book a demo of the Vonoy platform.
 * Implements proper form validation and error handling.
 *
 * @returns {JSX.Element} The rendered BookDemo page
 */
const BookDemo: React.FC = () => {
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state with validation
  const [form, setForm] = useState<FormState>({
    name: { value: '', error: '', touched: false },
    company: { value: '', error: '', touched: false },
    email: { value: '', error: '', touched: false },
    phone: { value: '', error: '', touched: false },
    industry: { value: '', error: '', touched: false },
    message: { value: '', error: '', touched: false }
  });

  /**
   * Validate a single form field
   * @param name - Field name
   * @param value - Field value
   * @returns Error message or empty string if valid
   */
  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : '';
      case 'company':
        return value.trim() === '' ? 'Company name is required' : '';
      case 'email':
        return value.trim() === ''
          ? 'Email is required'
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? 'Please enter a valid email address'
            : '';
      case 'industry':
        return value === '' ? 'Please select your industry' : '';
      default:
        return '';
    }
  };

  /**
   * Handle input change
   * @param e - Change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);

    setForm(prev => ({
      ...prev,
      [name]: {
        value,
        error,
        touched: true
      }
    }));
  };

  /**
   * Handle input blur
   * @param e - Blur event
   */
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormState, value);

    setForm(prev => ({
      ...prev,
      [name]: {
        ...prev[name as keyof FormState],
        error,
        touched: true
      }
    }));
  };

  /**
   * Validate the entire form
   * @returns Whether the form is valid
   */
  const validateForm = (): boolean => {
    let isValid = true;
    const newForm = { ...form };

    // Validate each required field
    (Object.keys(form) as Array<keyof FormState>).forEach(field => {
      const error = validateField(field, form[field].value);

      if (error) {
        isValid = false;
        newForm[field] = {
          ...newForm[field],
          error,
          touched: true
        };
      }
    });

    setForm(newForm);
    return isValid;
  };

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset submission states
    setSubmitSuccess(false);
    setSubmitError(null);

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Here you would typically make an API call to submit the form
      // const response = await fetch('/api/book-demo', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: form.name.value,
      //     company: form.company.value,
      //     email: form.email.value,
      //     phone: form.phone.value,
      //     industry: form.industry.value,
      //     message: form.message.value
      //   })
      // });
      //
      // if (!response.ok) {
      //   throw new Error('Failed to submit form');
      // }

      // Reset form on success
      setForm({
        name: { value: '', error: '', touched: false },
        company: { value: '', error: '', touched: false },
        email: { value: '', error: '', touched: false },
        phone: { value: '', error: '', touched: false },
        industry: { value: '', error: '', touched: false },
        message: { value: '', error: '', touched: false }
      });

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>Book a Demo</h1>
            <p className={styles.pageSubtitle}>
              See how Vonoy can transform your logistics operations
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.container}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Request Your Personalized Demo</h2>
              <p className={styles.formDescription}>
                Fill out the form below and one of our specialists will get in touch to schedule
                your personalized demo.
              </p>

              {submitSuccess ? (
                <div className={styles.successMessage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.successIcon}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className={styles.successTitle}>Demo Request Submitted!</h3>
                  <p className={styles.successText}>
                    Thank you for your interest in Vonoy. One of our specialists will contact you shortly to schedule your personalized demo.
                  </p>
                  <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Request Another Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  {submitError && (
                    <div className={styles.errorMessage}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.errorIcon}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>{submitError}</p>
                    </div>
                  )}

                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                      Full Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`${styles.input} ${form.name.touched && form.name.error ? styles.inputError : ''}`}
                      placeholder="John Doe"
                      value={form.name.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!form.name.error}
                      aria-describedby="name-error"
                      required
                    />
                    {form.name.touched && form.name.error && (
                      <div id="name-error" className={styles.fieldError}>{form.name.error}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>
                      Company Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className={`${styles.input} ${form.company.touched && form.company.error ? styles.inputError : ''}`}
                      placeholder="Your Company"
                      value={form.company.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!form.company.error}
                      aria-describedby="company-error"
                      required
                    />
                    {form.company.touched && form.company.error && (
                      <div id="company-error" className={styles.fieldError}>{form.company.error}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                      Business Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`${styles.input} ${form.email.touched && form.email.error ? styles.inputError : ''}`}
                      placeholder="john@example.com"
                      value={form.email.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!form.email.error}
                      aria-describedby="email-error"
                      required
                    />
                    {form.email.touched && form.email.error && (
                      <div id="email-error" className={styles.fieldError}>{form.email.error}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.input}
                      placeholder="+1 (555) 123-4567"
                      value={form.phone.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="industry" className={styles.label}>
                      Industry <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      className={`${styles.select} ${form.industry.touched && form.industry.error ? styles.inputError : ''}`}
                      value={form.industry.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!form.industry.error}
                      aria-describedby="industry-error"
                      required
                    >
                      <option value="">Select your industry</option>
                      <option value="fmcg">FMCG Distribution</option>
                      <option value="lastmile">Last-Mile Delivery</option>
                      <option value="cashvan">Cash Van Delivery</option>
                      <option value="postal">Postal & Courier</option>
                      <option value="coldchain">Cold Chain & Pharma</option>
                      <option value="ev">EV Fleet Operations</option>
                      <option value="other">Other</option>
                    </select>
                    {form.industry.touched && form.industry.error && (
                      <div id="industry-error" className={styles.fieldError}>{form.industry.error}</div>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Tell us about your logistics challenges
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      rows={4}
                      placeholder="Describe your current operations and challenges..."
                      value={form.message.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.loadingDots}></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Demo
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.buttonIcon}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
