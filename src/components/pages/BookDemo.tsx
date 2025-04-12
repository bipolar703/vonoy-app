import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./BookDemo.module.css";

/**
 * BookDemo Page Component
 *
 * A page for users to book a demo of the Vonoy platform.
 *
 * @returns {JSX.Element} The rendered BookDemo page
 */
const BookDemo: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    alert("Demo request submitted! We'll contact you shortly.");
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

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={styles.input}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company" className={styles.label}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className={styles.input}
                    placeholder="Your Company"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Business Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={styles.input}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="industry" className={styles.label}>
                    Industry
                  </label>
                  <select id="industry" className={styles.select} required>
                    <option value="">Select your industry</option>
                    <option value="fmcg">FMCG Distribution</option>
                    <option value="lastmile">Last-Mile Delivery</option>
                    <option value="cashvan">Cash Van Delivery</option>
                    <option value="postal">Postal & Courier</option>
                    <option value="coldchain">Cold Chain & Pharma</option>
                    <option value="ev">EV Fleet Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Tell us about your logistics challenges
                  </label>
                  <textarea
                    id="message"
                    className={styles.textarea}
                    rows={4}
                    placeholder="Describe your current operations and challenges..."
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
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
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
