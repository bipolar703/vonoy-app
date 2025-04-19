import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { CategorizableError, categorizeError } from '../../utils/errorCategorization';

interface ApplicationErrorProps {
  error: Error;
  resetErrorBoundary?: () => void;
}

/**
 * ApplicationError Component
 *
 * A modern, animated error page that displays application errors with a user-friendly interface.
 * Features:
 * - Detailed error information for developers
 * - User-friendly error messages for end users
 * - Smooth animations using Framer Motion
 * - Recovery options
 * - Responsive design
 */
const ApplicationError: React.FC<ApplicationErrorProps> = ({ error, resetErrorBoundary }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Get user-friendly error message based on error type
  const getUserFriendlyMessage = () => {
    const errorCode = categorizeError(error as CategorizableError);

    switch (errorCode) {
      case 'MODULE_EXPORT_ERROR':
        return 'There was a problem loading a required component. This is likely a temporary issue.';
      case 'NULL_REFERENCE_ERROR':
        return "The application tried to access data that wasn't available yet.";
      case 'NETWORK_ERROR':
        return 'There was a problem connecting to the server. Please check your internet connection.';
      case 'INFINITE_LOOP_ERROR':
        return 'The application encountered a processing error.';
      case 'SYNTAX_ERROR':
        return 'There was a problem with the application code.';
      default:
        return "Something went wrong. We're working to fix the issue.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-4 text-center">
      <motion.div
        className="relative max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Background elements - refined and smaller */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary opacity-80"></div>

          {/* Smaller, more elegant icons */}
          <motion.div
            className="absolute top-10 right-10 text-secondary/20 w-12 h-12"
            animate={{
              rotate: 360,
              transition: {
                duration: 12,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-10 text-secondary/20 w-8 h-8"
            animate={{
              rotate: 360,
              transition: {
                duration: 10,
                ease: 'linear',
                repeat: Infinity,
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>

          {/* More subtle animated dots */}
          <motion.div
            className="absolute top-20 right-40 w-1.5 h-1.5 rounded-full bg-secondary/30"
            animate={{
              scale: [0.8, 1.2],
              opacity: [0.4, 0.8],
              transition: {
                duration: 2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
          ></motion.div>
          <motion.div
            className="absolute top-40 right-20 w-2 h-2 rounded-full bg-secondary/30"
            animate={{
              scale: [0.8, 1.2],
              opacity: [0.4, 0.8],
              transition: {
                duration: 2.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.3,
              },
            }}
          ></motion.div>
          <motion.div
            className="absolute bottom-20 right-30 w-1.5 h-1.5 rounded-full bg-secondary/30"
            animate={{
              scale: [0.8, 1.2],
              opacity: [0.4, 0.8],
              transition: {
                duration: 2.2,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 0.6,
              },
            }}
          ></motion.div>

          {/* Subtle line decorations */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-xl max-w-2xl w-full"
          variants={containerVariants}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
            variants={itemVariants}
          >
            Unexpected Application Error
          </motion.h1>

          <motion.p
            className="text-lg text-white/90 mb-8 max-w-xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {getUserFriendlyMessage()}
          </motion.p>

          {/* Error details for developers */}
          <motion.div
            className="mb-8 bg-white/10 rounded-lg p-4 text-left overflow-hidden backdrop-blur-sm border border-white/5"
            variants={itemVariants}
          >
            <h3 className="text-white/90 font-medium mb-2">Error Details:</h3>
            <div className="bg-black/30 p-3 rounded overflow-auto max-h-32 text-sm font-mono text-white/70">
              {error.message}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            {resetErrorBoundary && (
              <button
                onClick={resetErrorBoundary}
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Try Again
              </button>
            )}

            <Link
              to="/"
              className="px-6 py-3 border border-white/20 text-base font-medium rounded-md shadow-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 transition-all duration-300 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Return to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ApplicationError;
