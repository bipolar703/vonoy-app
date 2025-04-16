import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../ui/OptimizedImage';
import styles from './Footer.module.css';

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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper for navigation with loading and scroll-to-top
  const handleNavigate =
    (path: string, isWorking: boolean = true) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
        navigate(isWorking ? path : '/under-development');
      }, 350); // Simulate loading, adjust as needed
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="loader">
            <div className="loaderCircle"></div>
            <div className="loaderCircle"></div>
            <div className="loaderCircle"></div>
            <div className="loaderCircle"></div>
            <div className="loaderCircle"></div>
          </div>
        </div>
      )}
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
          priority={false}
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
              priority={false}
            />
            <p className={styles.description}>
              AI-powered fleet operations management platform that helps businesses optimize
              resources, reduce costs, and enhance delivery efficiency.
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

            {/* Social Media Links: Only YouTube and LinkedIn */}
            <div className={styles.socialLinks}>
              <a
                href="https://www.youtube.com/@Vonoyplatform"
                className={styles.socialLink}
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* YouTube SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.socialIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.379 3.5 12 3.5 12 3.5s-7.379 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.2 0 12 0 12s0 3.8.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.621 20.5 12 20.5 12 20.5s7.379 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.8 24 12 24 12s0-3.8-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/vonoy/about/"
                className={styles.socialLink}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* LinkedIn SVG */}
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
                Quick Links
              </h3>
              <ul className={styles.linkList}>
                <li>
                  <a href="/" className={styles.linkItem} onClick={handleNavigate('/', true)}>
                    <span className={styles.linkItemText}>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className={styles.linkItem}
                    onClick={handleNavigate('/about', true)}
                  >
                    <span className={styles.linkItemText}>About Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/solutions"
                    className={styles.linkItem}
                    onClick={handleNavigate('/solutions', false)}
                  >
                    <span className={styles.linkItemText}>Solutions</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/features"
                    className={styles.linkItem}
                    onClick={handleNavigate('/features', false)}
                  >
                    <span className={styles.linkItemText}>Features</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/demo"
                    className={styles.linkItem}
                    onClick={handleNavigate('/book-demo', true)}
                  >
                    <span className={styles.linkItemText}>Book a Demo</span>
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
                    <span className={styles.linkItemText}>Fleet Management</span>
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.linkItem}>
                    <span className={styles.linkItemText}>Route Optimization</span>
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href="mailto:support@vonoy.co" className={styles.contactText}>
                    support@vonoy.co
                  </a>
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
