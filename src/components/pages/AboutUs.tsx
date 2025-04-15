import React, { useRef } from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import OptimizedImage from '../ui/OptimizedImage';
import styles from './AboutUs.module.css';

/**
 * AboutUs Page Component
 *
 * Displays information about the company, mission, and vision.
 * Content based on vonoy-edits.md specifications.
 *
 * @returns {JSX.Element} The rendered AboutUs page
 */
const AboutUs: React.FC = () => {
  const teamSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 animate-fadeIn">
        <section className={`${styles.heroSection} transition-all duration-500 ease-in-out`}>
          <div className={styles.geometricLines}>
            {/* Solid shapes behind the lines */}
            <div className={styles.geometricShapes}>
              <div className={`${styles.shape} ${styles.shape1}`}></div>
              <div className={`${styles.shape} ${styles.shape2}`}></div>
              <div className={`${styles.shape} ${styles.shape3}`}></div>
            </div>
            <svg className={styles.linesSvg} viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path
                className={`${styles.geometricLine} animate-drawLine`}
                d="M0,100 Q250,300 500,100 T1000,100"
              />
              <path
                className={`${styles.geometricLine} animate-drawLine`}
                d="M0,200 Q250,400 500,200 T1000,200"
              />
              <path
                className={`${styles.geometricLine} animate-drawLine`}
                d="M0,300 Q250,500 500,300 T1000,300"
              />
            </svg>
          </div>
          <div
            className={`${styles.container} transform transition-all duration-500 ease-out animate-fadeInUp`}
          >
            <div className={styles.heroContent}>
              <h1 className={`${styles.pageTitle} animate-fadeInUp delay-100`}>About Us</h1>
              <p className={`${styles.heroSubtitle} animate-fadeInUp delay-200`}>
                Transforming logistics with intelligent routing solutions
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.contentSection} animate-fadeInUp delay-300`}>
          <div className={`${styles.container} space-y-12`}>
            <div className={`${styles.aboutGrid} animate-fadeInUp delay-400`}>
              <div className={`${styles.aboutContent} animate-fadeInUp delay-500`}>
                <h2 className={styles.contentTitle}>Our Story</h2>
                <p className={styles.paragraph}>
                  We are a technology company focused on solving the world's most complex routing
                  problems. From last-mile delivery and cash van operations to electric vehicle
                  routing and multi-depot optimization, we build customized, scalable solutions that
                  align precisely with how our clients operate.
                </p>

                <p className={styles.paragraph}>
                  Our team brings together former Amazon logistics professionals and operations
                  research scientists with deep expertise in optimization, modeling, and real-world
                  execution. We combine academic rigor with practical experience to design systems
                  that deliver measurable, lasting impact.
                </p>

                <p className={styles.paragraph}>
                  Whether through flexible APIs or full-stack platforms, our goal is to make
                  advanced logistics technology accessible, adaptable, and effective for every
                  enterprise.
                </p>
              </div>

              <div className={`${styles.imageContainer} animate-fadeInUp delay-600`}>
                <div className={styles.imageWrapper}>
                  <OptimizedImage
                    src="/images/about-us-team.webp"
                    alt="Vonoy team working on logistics solutions"
                    className={styles.aboutImage}
                    width={600}
                    height={400}
                  />
                  <div className={styles.imageBg}></div>
                </div>
              </div>
            </div>

            <div
              ref={teamSectionRef}
              className={`${styles.missionVision} grid gap-8 md:grid-cols-3`}
            >
              <div className={`${styles.missionBox} animate-fadeInUp delay-100`}>
                <div className={styles.iconContainer}>
                  <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Mission</h2>
                <p className={styles.missionText}>
                  To empower logistics teams and field operators with customized, intelligent
                  routing solutions that drive efficiency, reduce cost, and solve operational
                  complexity at scale.
                </p>
              </div>

              <div className={`${styles.visionBox} animate-fadeInUp delay-200`}>
                <div className={styles.iconContainer}>
                  <svg
                    className={styles.icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Vision</h2>
                <p className={styles.visionText}>
                  To be the leading vehicle routing technology partner for enterprises across the
                  globe—trusted for our technical depth, custom approach, and ability to turn
                  complex logistics into high-performing, data-driven systems.
                </p>
              </div>

              <div className={`${styles.valuesBox} animate-fadeInUp delay-300`}>
                <div className={styles.iconContainer}>
                  <svg
                    className={styles.icon}
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
                    />
                    <path
                      d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 9H9.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 9H15.01"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 className={styles.sectionTitle}>Values</h2>
                <p className={styles.valuesText}>
                  We believe in innovation, transparency, and customer-centricity. Our solutions are
                  built on a foundation of technical excellence, continuous improvement, and a deep
                  understanding of the logistics challenges our clients face every day.
                </p>
              </div>
            </div>

            <div className={`${styles.ctaSection} animate-fadeInUp delay-400`}>
              <h2 className={styles.ctaTitle}>Ready to transform your logistics operations?</h2>
              <Link to="/book-demo" className={styles.ctaButton}>
                Book a Demo
                <svg
                  className={styles.ctaIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
