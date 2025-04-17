import React from "react";
import styles from "./BenefitSection.module.css";

/**
 * BenefitSection Component
 *
 * Displays the types of businesses that can benefit from Vonoy
 * with modern design elements and icons.
 */
const BenefitSection: React.FC = () => {
  // Beneficiaries data
  const beneficiaries = [
    {
      title: "Large-scale logistics companies",
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
      title: "E-commerce businesses",
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
      title: "Delivery service providers",
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
      title: "Companies managing multiple fleets",
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
          <path
            d="M12 7H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 7H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 11H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 11H7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

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
          {/* Industries We Serve - duplicated as requested */}
          <div className={styles.benefitCard}>
            <div className={styles.benefitIconContainer}>
              <svg className={styles.benefitIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div className={styles.iconGlow}></div>
            </div>
            <h3 className={styles.benefitTitle}>Industries We Serve</h3>
            <ul className={styles.industriesList}>
              <li>FMCG Distribution</li>
              <li>Last-Mile Delivery</li>
              <li>Cash Van Delivery</li>
              <li>Postal & Courier</li>
              <li>Cold Chain & Pharma</li>
              <li>EV Fleet Operations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgDecoration}></div>
    </section>
  );
};

export default BenefitSection;
