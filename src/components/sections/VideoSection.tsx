import React, { useState, useRef, useEffect } from "react";
import styles from "./VideoSection.module.css";
import { useInView } from "../hooks/useInView";

/**
 * VideoSection Component
 *
 * Displays a demo video explaining how Vonoy works
 * with modern design elements and play controls.
 * Implements performance optimizations:
 * - Lazy loading of YouTube iframe
 * - Intersection Observer to load video only when in viewport
 * - Thumbnail preloading
 * - Reduced layout shifts
 */
const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1, once: true });

  // Preload the YouTube thumbnail when section comes into view
  useEffect(() => {
    if (isInView && !isVideoLoaded) {
      const img = new Image();
      // Set crossOrigin to anonymous to avoid CORS issues
      img.crossOrigin = "anonymous";
      img.src = "https://img.youtube.com/vi/hxm2rdVl7Y0/maxresdefault.jpg";
      img.onload = () => setIsVideoLoaded(true);
      img.onerror = () => {
        // Fallback to a different thumbnail size if maxresdefault fails
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = "anonymous";
        fallbackImg.src = "https://img.youtube.com/vi/hxm2rdVl7Y0/hqdefault.jpg";
        fallbackImg.onload = () => setIsVideoLoaded(true);
      };
    }
  }, [isInView, isVideoLoaded]);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // Track video play event for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag?.('event', 'play_video', {
        'event_category': 'engagement',
        'event_label': 'Vonoy Demo Video'
      });
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} id="video-section">
      <div className={`${styles.container} video-content`}>
        <div className={`${styles.sectionHeader} video-content`}>
          <h2 className={styles.sectionTitle}>See Vonoy in Action</h2>
          <p className={styles.sectionDescription}>
            A demo video explaining how Vonoy works
          </p>
        </div>

        <div className={`${styles.videoContainer} video-content`}>
          {/* Video thumbnail overlay (hidden when video is playing) */}
          {!isPlaying && (
            <div className={styles.videoOverlay}>
              <button onClick={handlePlayClick} className={styles.playButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.playIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </button>
              <div className={styles.overlayText}>
                <span>Watch Demo</span>
                <span className={styles.duration}>2:45</span>
              </div>
            </div>
          )}

          {/* Video player (conditionally rendered when play is clicked) */}
          {isPlaying ? (
            <iframe
              className={styles.videoFrame}
              src="https://www.youtube.com/embed/hxm2rdVl7Y0?autoplay=1&rel=0&modestbranding=1"
              title="Vonoy Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className={styles.videoPlaceholder}>
              {isVideoLoaded ? (
                <div
                  className={styles.thumbnailContainer}
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/hxm2rdVl7Y0/maxresdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Video thumbnail"
                >
                  <div className={styles.thumbnailOverlay}></div>
                </div>
              ) : (
                <div className={styles.gradientPlaceholder}>
                  <div className={styles.mockInterface}>
                    <div className={styles.mockHeader}></div>
                    <div className={styles.mockContent}>
                      <div className={styles.mockMap}></div>
                      <div className={styles.mockSidebar}>
                        <div className={styles.mockItem}></div>
                        <div className={styles.mockItem}></div>
                        <div className={styles.mockItem}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>


      </div>

      {/* Background decorations */}
      <div className={styles.bgPattern}></div>
      <div className={styles.bgGradient}></div>
    </section>
  );
};

export default VideoSection;
