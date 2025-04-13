import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./VideoSection.module.css";
import { useIntersectionObserver } from "../../utils/animationSystem";

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
  const [loadError, setLoadError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { ref: sectionRef, isIntersecting: isInView } = useIntersectionObserver({ threshold: 0.1, once: true });

  // YouTube video ID
  const videoId = "hxm2rdVl7Y0";

  // Thumbnail URLs
  const thumbnailUrls = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`
  ];

  // State to track which thumbnail URL to use
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  // Preload the YouTube thumbnail when section comes into view
  useEffect(() => {
    if (isInView && !isVideoLoaded) {
      // Try to load thumbnails in order of quality
      const loadNextThumbnail = (index = 0) => {
        if (index >= thumbnailUrls.length) {
          // If all thumbnails fail to load, show error state
          console.error("Failed to load all YouTube thumbnails");
          setLoadError(true);
          setIsVideoLoaded(true); // Still mark as loaded to show fallback UI
          return;
        }

        // Create a new image element to preload the thumbnail
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = thumbnailUrls[index];

        // Set up load and error handlers
        img.onload = () => {
          setThumbnailUrl(thumbnailUrls[index]);
          setIsVideoLoaded(true);
          setLoadError(false);
        };

        img.onerror = () => {
          // Try the next thumbnail in the list
          loadNextThumbnail(index + 1);
        };
      };

      // Start loading thumbnails
      loadNextThumbnail();

      // Clean up function
      return () => {
        // Nothing to clean up as we're using local functions
      };
    }
  }, [isInView, isVideoLoaded, thumbnailUrls]);

  // Handle iframe loading and errors
  const handleIframeLoad = useCallback(() => {
    console.log("YouTube iframe loaded successfully");
  }, []);

  const handleIframeError = useCallback(() => {
    console.error("Error loading YouTube iframe");
    setLoadError(true);
  }, []);

  const handlePlayClick = useCallback(() => {
    setIsPlaying(true);

    // Track video play event for analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      try {
        // @ts-ignore
        window.gtag?.('event', 'play_video', {
          'event_category': 'engagement',
          'event_label': 'Vonoy Demo Video'
        });
      } catch (error) {
        console.error('Error tracking video play event:', error);
      }
    }
  }, []);

  // Clean up function when component unmounts
  useEffect(() => {
    return () => {
      // Stop video playback when component unmounts
      if (iframeRef.current) {
        iframeRef.current.src = '';
      }
    };
  }, []);

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
              ref={iframeRef}
              className={`${styles.videoFrame} opt__media-element`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Vonoy Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
          ) : (
            <div className={`${styles.videoPlaceholder} opt__media`}>
              {isVideoLoaded && !loadError && thumbnailUrl ? (
                <div
                  className={`${styles.thumbnailContainer} opt__animated`}
                  style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label="Video thumbnail"
                >
                  <div className={styles.thumbnailOverlay}></div>
                </div>
              ) : loadError ? (
                <div className={`${styles.errorPlaceholder} opt__animated`}>
                  <div className={styles.errorContent}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.errorIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>Unable to load video preview</p>
                    <p className={styles.errorSubtext}>Click to play video anyway</p>
                  </div>
                </div>
              ) : (
                <div className={`${styles.gradientPlaceholder} opt__animated`}>
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
