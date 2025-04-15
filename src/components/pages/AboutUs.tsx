import { motion } from 'framer-motion';
import React from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10">
    <svg width="100%" height="100%" className="w-full h-full">
      <defs>
        <filter id="grain" x="0" y="0">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="turb" />
          <feColorMatrix type="saturate" values="0.2" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
        </filter>
        <linearGradient id="aboutGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A9D8F" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0F2A3F" stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#aboutGradient)" filter="url(#grain)" />
      <ellipse cx="80%" cy="90%" rx="180" ry="80" fill="#2A9D8F" opacity="0.07" />
      <ellipse cx="20%" cy="20%" rx="120" ry="60" fill="#238276" opacity="0.09" />
    </svg>
  </div>
);

const AboutUs: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A1520] to-[#0F2A3F] text-white">
    <PageTransition />
    <AnimatedBackground />
    <Navbar />
    <main className="flex-grow pt-20 px-4 md:px-0">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#2A9D8F] to-[#238276] drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          About Us
        </motion.h1>
        <motion.section
          className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-14 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          custom={0}
        >
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            variants={fadeInUp}
            custom={1}
          >
            We are a technology company focused on solving the world's most complex routing
            problems. From last-mile delivery and cash van operations to electric vehicle routing
            and multi-depot optimization, we build customized, scalable solutions that align
            precisely with how our clients operate.
          </motion.p>
          <motion.div className="grid md:grid-cols-2 gap-10 mb-10" variants={fadeInUp} custom={2}>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#2A9D8F]">Mission</h2>
              <p className="text-white/80 text-lg">
                To empower logistics teams and field operators with customized, intelligent routing
                solutions that drive efficiency, reduce cost, and solve operational complexity at
                scale.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#2A9D8F]">Vision</h2>
              <p className="text-white/80 text-lg">
                To be the leading vehicle routing technology partner for enterprises across the
                globe—trusted for our technical depth, custom approach, and ability to turn complex
                logistics into high-performing, data-driven systems.
              </p>
            </div>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 gap-10" variants={fadeInUp} custom={3}>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#2A9D8F]">Why Choose Vonoy?</h2>
              <ul className="list-disc pl-6 space-y-3 text-white/90 text-lg">
                <li>
                  <strong>Built on Science:</strong> Our solutions are grounded in advanced
                  operations research and real-world logistics modeling—designed by experts who've
                  solved these problems at scale.
                </li>
                <li>
                  <strong>Customized for Your Operation:</strong> Every algorithm, interface, and
                  deployment is tailored to your exact business rules, constraints, and goals.
                </li>
                <li>
                  <strong>Technology + Strategy Combined:</strong> We deliver both the technical
                  infrastructure (APIs, TMS, apps) and the strategic insight (network design,
                  capacity planning) to help you transform your operations.
                </li>
                <li>
                  <strong>Proven Track Record:</strong> Led by former Amazon logistics experts and
                  academic researchers, we've delivered measurable savings and operational
                  improvements for enterprise clients across Europe, Middle East and North Africa.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#2A9D8F]">Industries We Serve</h2>
              <ul className="list-disc pl-6 space-y-3 text-white/90 text-lg">
                <li>FMCG Distribution</li>
                <li>Last-Mile Delivery</li>
                <li>Cash Van Delivery</li>
                <li>Postal & Courier</li>
                <li>Cold Chain & Pharma</li>
                <li>EV Fleet Operations</li>
                <li>Any business with logistics complexity</li>
              </ul>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutUs;
