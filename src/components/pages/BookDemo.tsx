import React from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';
import styles from './BookDemo.module.css';
import BookDemoForm from './BookDemoForm';

const BookDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1A24] text-white relative">
      <PageTransition />
      <Navbar />
      <main className="book-demo-page flex flex-1 flex-col md:flex-row w-full min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] shadow-[0_2px_12px_0_rgba(0,0,0,0.08)] relative overflow-hidden">
        {/* Unified background for all screen sizes */}
        <div
          className={`absolute inset-0 w-full h-full z-0 select-none pointer-events-none ${styles.gradientBackground}`}
          aria-hidden="true"
          role="presentation"
          style={{
            background: `radial-gradient(circle at 60% 60%, rgba(88, 164, 157, 0.10) 0%, transparent 70%), url('/book-demo-design.svg') no-repeat right -100px bottom -100px / auto 90%`,
            opacity: 0.7,
          }}
        ></div>
        {/* Left: Hero */}
        <div className="relative z-10 flex flex-col justify-start gap-4 w-full md:w-2/5 px-6 sm:px-8 md:px-12 pt-10 md:pt-16 min-h-[200px] md:min-h-0 md:h-auto mx-auto md:mx-0 book-demo-hero-title-container">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg font-display text-center md:text-left book-demo-hero-title">
            Transform Your Logistics Operations with <br className="hidden md:block" />
            AI-Powered Efficiency
          </h1>
        </div>
        {/* Right: Form Card */}
        <div className="w-full md:w-3/5 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-10 md:py-16 bg-transparent relative z-10 mx-auto">
          <div className="w-full bg-[#16232e]/80 rounded-2xl shadow-2xl border border-white/10 p-4 sm:p-6 md:p-8 flex flex-col gap-4">
            <BookDemoForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDemo;
