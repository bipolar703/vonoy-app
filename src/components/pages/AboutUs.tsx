import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import styles from "./AboutUs.module.css";

/**
 * AboutUs Page Component
 *
 * Displays information about the company, mission, and vision.
 * Content based on vonoy-edits.md specifications.
 *
 * @returns {JSX.Element} The rendered AboutUs page
 */
const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>About Us</h1>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <p className={styles.paragraph}>
                We are a technology company focused on solving the world's most complex routing problems. 
                From last-mile delivery and cash van operations to electric vehicle routing and multi-depot 
                optimization, we build customized, scalable solutions that align precisely with how our 
                clients operate.
              </p>

              <p className={styles.paragraph}>
                Our team brings together former Amazon logistics professionals and operations research 
                scientists with deep expertise in optimization, modeling, and real-world execution. 
                We combine academic rigor with practical experience to design systems that deliver 
                measurable, lasting impact.
              </p>

              <p className={styles.paragraph}>
                Whether through flexible APIs or full-stack platforms, our goal is to make advanced 
                logistics technology accessible, adaptable, and effective for every enterprise.
              </p>
            </div>

            <div className={styles.missionVision}>
              <div className={styles.missionBox}>
                <h2 className={styles.sectionTitle}>Mission</h2>
                <p className={styles.missionText}>
                  To empower logistics teams and field operators with customized, intelligent routing 
                  solutions that drive efficiency, reduce cost, and solve operational complexity at scale.
                </p>
              </div>

              <div className={styles.visionBox}>
                <h2 className={styles.sectionTitle}>Vision</h2>
                <p className={styles.visionText}>
                  To be the leading vehicle routing technology partner for enterprises across the 
                  globe—trusted for our technical depth, custom approach, and ability to turn complex 
                  logistics into high-performing, data-driven systems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
