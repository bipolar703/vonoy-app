import { motion } from 'framer-motion';
import React from 'react';
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import PageTransition from '../layout/PageTransition';
import styles from './BookDemo.module.css';
import BookDemoForm from './BookDemoForm';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const reviews = [
  {
    quote:
      "Vonoy's platform helped us reduce delivery costs by 20% and improve customer satisfaction. Highly recommended!",
  },
  {
    quote:
      'The route optimization is incredibly accurate and easy to use. Our drivers love it, and our operations are smoother than ever.',
  },
  {
    quote:
      'Support is top-notch and the onboarding was seamless. We were up and running in days, not weeks.',
  },
  {
    quote:
      'The analytics dashboard gives us real-time insights we never had before. We can finally make data-driven decisions.',
  },
  {
    quote:
      'Vonoy customized the platform to our unique business rules. No other solution came close.',
  },
];

function useAutoCarousel(length: number, interval = 5000) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval]);
  return [index, setIndex] as const;
}

const BookDemo: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1A24] text-white relative">
      <PageTransition />
      <Navbar />
      <main className="book-demo-page flex flex-1 flex-col md:flex-row w-full min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))] shadow-[0_2px_12px_0_rgba(0,0,0,0.08)] relative">
        {/* Full-page SVG/gradient background, always to the edges */}
        <div
          className={[
            'hidden',
            'md:block',
            'absolute',
            'top-0',
            'left-0',
            'right-0',
            'bottom-0',
            'w-full',
            'h-full',
            'z-0',
            'select-none',
            'pointer-events-none',
            styles.gradientBackground,
          ].join(' ')}
          aria-hidden="true"
          role="presentation"
          style={{
            background: `radial-gradient(circle at 60% 60%, rgba(88, 164, 157, 0.10) 0%, transparent 70%), url('/book-demo-design.svg') no-repeat left center/auto 90%`,
            opacity: 0.7,
            left: '-3vw',
            bottom: '-3vw',
            width: 'calc(100% + 6vw)',
            height: 'calc(100% + 6vw)',
          }}
        ></div>
        {/* Mobile: Subtle animated background, no SVG */}
        <div
          className="md:hidden absolute inset-0 z-0 animate-pulse"
          aria-hidden="true"
          role="presentation"
          style={{
            background:
              'radial-gradient(circle at 60% 60%, rgba(61,213,152,0.10) 0%, transparent 70%)',
            opacity: 0.7,
          }}
        />
        {/* Left: Hero */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-12 py-10 md:py-20 min-h-[400px] md:min-h-screen relative max-w-2xl mx-auto md:mx-0">
          <div className="relative z-10 flex flex-col justify-center gap-8 md:gap-12">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-8 leading-tight drop-shadow-lg font-display text-center md:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Transform Your Fleet Operations with <br className="hidden md:block" />
              AI-Powered Efficiency
            </motion.h1>
          </div>
        </div>
        {/* Right: Form Card */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-10 md:py-20 bg-transparent relative z-10 max-w-2xl mx-auto md:mx-0">
          <div className="w-full max-w-xl bg-[#16232e]/80 rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col gap-8">
            <BookDemoForm />
            {/* Carousel Reviews Block */}
            <motion.div
              className="w-full max-w-xl mx-auto flex flex-col items-center gap-6 animate-in fade-in-up duration-700"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              custom={1}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-center">
                What our clients say about us
              </h3>
              <CarouselReviews reviews={reviews} />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function CarouselReviews({ reviews }: { reviews: { quote: string }[] }) {
  const [index, setIndex] = useAutoCarousel(reviews.length, 6000);
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {reviews.map((review, i) => (
        <div
          key={i}
          className={`absolute left-0 top-0 w-full transition-opacity duration-700 ease-in-out ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'} flex flex-col items-center`}
          aria-hidden={i !== index}
        >
          <blockquote className="text-lg md:text-xl text-center font-medium mb-2">
            “{review.quote}”
          </blockquote>
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-primary-400' : 'bg-gray-600'} transition-colors`}
            aria-label={`Show review ${i + 1}`}
            onClick={() => setIndex(i)}
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
}

export default BookDemo;
