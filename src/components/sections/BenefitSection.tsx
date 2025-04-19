import React, { useState } from 'react';
import styles from './BenefitSection.module.css';

/**
 * BenefitSection Component
 *
 * Displays the types of businesses that can benefit from Vonoy
 * with modern design elements and icons, and an expandable industries list.
 */
const BenefitSection: React.FC = () => {
  const [isIndustriesExpanded, setIsIndustriesExpanded] = useState(false);

  const handleIndustriesClick = () => {
    setIsIndustriesExpanded(!isIndustriesExpanded);
  };

  // Beneficiaries data
  const beneficiaries = [
    {
      title: 'Large-scale logistics companies',
      icon: (
        <svg
          className={styles.benefitIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 17H19V2H22C22.5523 2 23 2.44772 23 3V16C23 16.5523 22.5523 17 22 17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 17H9V10C9 8.93913 9.42143 7.92172 10.1716 7.17157C10.9217 6.42143 11.9391 6 13 6H15C16.0609 6 17.0783 6.42143 17.8284 7.17157C18.5786 7.92172 19 8.93913 19 10V17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 17H2C1.44772 17 1 16.5523 1 16V3C1 2.44772 1.44772 2 2 2H5V17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 22V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 22V17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 17H23"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'E-commerce businesses',
      icon: (
        <svg
          className={styles.benefitIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 16H19M6 18C6 19.1046 5.10457 20 4 20C2.89543 20 2 19.1046 2 18C2 16.8954 2.89543 16 4 16C5.10457 16 6 16.8954 6 18ZM18 18C18 19.1046 17.1046 20 16 20C14.8954 20 14 19.1046 14 18C14 16.8954 14.8954 16 16 16C17.1046 16 18 16.8954 18 18Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Delivery service providers',
      icon: (
        <svg
          className={styles.benefitIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 11H16M16 11H18M16 11V9M16 11V13M12 7H7C5.89543 7 5 7.89543 5 9V14C5 15.1046 5.89543 16 7 16H7.5M12 7H16C17.1046 7 18 7.89543 18 9V20C18 21.1046 17.1046 22 16 22H7C5.89543 22 5 21.1046 5 20V19.5M12 7V5C12 3.89543 11.1046 3 10 3H9C7.89543 3 7 3.89543 7 5V7M10 16C10 17.1046 9.10457 18 8 18C6.89543 18 6 17.1046 6 16C6 14.8954 6.89543 14 8 14C9.10457 14 10 14.8954 10 16Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Companies managing multiple fleets',
      icon: (
        <svg
          className={styles.benefitIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 3H14C13.4696 3 12.9609 3.21071 12.5858 3.58579C12.2107 3.96086 12 4.46957 12 5V16H17C18.1046 16 19 15.1046 19 14V6C19 4.34315 17.6569 3 16 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 3H8C6.34315 3 5 4.34315 5 6V14C5 15.1046 5.89543 16 7 16H12V5C12 4.46957 11.7893 3.96086 11.4142 3.58579C11.0391 3.21071 10.5304 3 10 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 16V19C17 19.5304 16.7893 20.0391 16.4142 20.4142C16.0391 20.7893 15.5304 21 15 21H9C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 7H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 11H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Icons for industries
  const industryIcons = {
    'FMCG Distribution': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 12L22 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 12L2 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 12V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M2 7L12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M22 7L12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    'Last-Mile Delivery': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 11H16M16 11H18M16 11V9M16 11V13M12 7H7C5.89543 7 5 7.89543 5 9V14C5 15.1046 5.89543 16 7 16H7.5M12 7H16C17.1046 7 18 7.89543 18 9V20C18 21.1046 17.1046 22 16 22H7C5.89543 22 5 21.1046 5 20V19.5M12 7V5C12 3.89543 11.1046 3 10 3H9C7.89543 3 7 3.89543 7 5V7M10 16C10 17.1046 9.10457 18 8 18C6.89543 18 6 17.1046 6 16C6 14.8954 6.89543 14 8 14C9.10457 14 10 14.8954 10 16Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    'Cash Van Delivery': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 10H20C20.5523 10 21 10.4477 21 11V16C21 16.5523 20.5523 17 20 17H4C3.44772 17 3 16.5523 3 16V11C3 10.4477 3.44772 10 4 10H7M17 10V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V10M17 10H7M10 20C10 21.1046 9.10457 22 8 22C6.89543 22 6 21.1046 6 20C6 18.8954 6.89543 18 8 18C9.10457 18 10 18.8954 10 20ZM18 20C18 21.1046 17.1046 22 16 22C14.8954 22 14 21.1046 14 20C14 18.8954 14.8954 18 16 18C17.1046 18 18 18.8954 18 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    'Postal & Courier': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 4H5C3.89543 4 3 4.89543 3 6V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M3 6L12 13L21 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    'Cold Chain & Pharma': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 8V16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 12H16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
    'EV Fleet Operations': (
      <svg
        className={styles.industryIcon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17 20H7C5.89543 20 5 19.1046 5 18V11C5 9.89543 5.89543 9 7 9H17C18.1046 9 19 9.89543 19 11V18C19 19.1046 18.1046 20 17 20Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 9V4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M8 20V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M16 20V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M5 14H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M5 17H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    ),
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Who Can Benefit from Vonoy?</h2>
          <p className={styles.sectionDescription}>
            Vonoy is not a one-size-fits-all platform. We provide solutions for:
          </p>
        </div>

        <div className={styles.benefitsGrid}>
          {beneficiaries.map((item, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIconContainer}>
                {item.icon}
                <div className={styles.iconGlow}></div>
              </div>
              <h3 className={styles.benefitTitle}>{item.title}</h3>
            </div>
          ))}

          {/* Industries We Serve - Expandable Card */}
          <div
            className={`${styles.benefitCard} ${styles.industriesCard} ${isIndustriesExpanded ? styles.expanded : ''}`}
            onClick={handleIndustriesClick}
          >
            <div className={styles.industriesHeader}>
              <h3 className={styles.benefitTitle}>Industries We Serve:</h3>
              {/* Optional: Add an expansion indicator icon (e.g., arrow) */}
              <svg
                className={`${styles.expansionIcon} ${isIndustriesExpanded ? styles.expandedIcon : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 9L12 15L5 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={styles.industriesContent}
              style={{
                maxHeight: isIndustriesExpanded ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s ease-in-out',
              }}
            >
              <ul className={styles.industriesList}>
                {Object.entries(industryIcons).map(([industry, icon], index) => (
                  <li key={index}>
                    {icon}
                    {industry}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgDecoration}></div>
    </section>
  );
};

export default BenefitSection;
