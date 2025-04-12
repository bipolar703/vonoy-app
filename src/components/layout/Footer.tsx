import React, { useState } from "react";
import OptimizedImage from "../ui/OptimizedImage";
import styles from "./Footer.module.css";

/**
 * Footer Component
 *
 * The main footer for the website with links, contact information, and social media icons.
 * Uses the specified background color: rgb(12 29 44)
 * Incorporates modern 2025 web design trends with subtle design elements.
 *
 * @returns {JSX.Element} The rendered Footer component
 */
const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      {/* Modern design element: Subtle diagonal pattern overlay */}
      <div className={styles.diagonalPattern}>
        <div className={styles.diagonalPatternInner}></div>
      </div>

      {/* Footer lines SVG background */}
      <div className={styles.footerLinesContainer}>
        <OptimizedImage
          src="/footer-lines.svg"
          alt=""
          className={styles.footerLines}
          loading="lazy"
          fetchPriority="low"
        />
      </div>

      {/* Modern design element: Top border gradient */}
      <div className={styles.topBorder}></div>

      {/* Main footer content */}
      <div className={styles.container}>
        {/* Footer header with logo and description */}
        <div className={styles.grid}>
          <div className={styles.mainCol}>
            {/* Modern design element: Floating accent */}
            <div className={styles.floatingAccent}></div>

            <OptimizedImage
              src="/logo.svg"
              alt="Vonoy"
              className={styles.logo}
              width={120}
              height={40}
              loading="lazy"
              fetchPriority="high"
            />
            <p className={styles.description}>
              AI-powered fleet operations management platform that helps
              businesses optimize resources, reduce costs, and enhance delivery
              efficiency.
            </p>

            {/* Email Subscription Form */}
            <div className={styles.subscriptionContainer}>
              <h3 className={styles.subscriptionTitle}>Stay Updated</h3>
              <form onSubmit={handleSubmit} className={styles.subscriptionForm}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className={styles.subscriptionInput}
                />
                <button type="submit" className={styles.subscriptionButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.subscriptionIcon}
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
              </form>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer links columns - more compact layout */}
          <div className={styles.linksContainer}>
            <div className={styles.linkCol}>
              <h3 className={styles.linkColTitle}>
                <span className={styles.titleDot}></span>
                Company
              </h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Careers</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Blog</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Press</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h3 className={styles.linkColTitle}>
                <span className={styles.titleDot}></span>
                Solutions
              </h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>
                      Fleet Management
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>
                      Route Optimization
                    </span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Analytics</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Integrations</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkCol}>
              <h3 className={styles.linkColTitle}>
                <span className={styles.titleDot}></span>
                Contact
              </h3>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactIcon}
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
                  <span className={styles.contactText}>
                    123 Innovation Drive, Tech Park, CA 94043
                  </span>
                </li>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactIcon}
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
                  <span className={styles.contactText}>info@vonoy.com</span>
                </li>
                <li className={styles.contactItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.contactIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className={styles.contactText}>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modern design element: Floating accent circles */}
        <div className={styles.accentCircle1}></div>
        <div className={styles.accentCircle2}></div>

        {/* Footer bottom */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Vonoy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
