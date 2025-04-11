import React, { useState } from "react";
import styles from "./VideoSection.module.css";

/**
 * VideoSection Component
 *
 * Displays a demo video explaining how Vonoy works
 * with modern design elements and play controls.
 */
const VideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>See Vonoy in Action</h2>
          <p className={styles.sectionDescription}>
            A demo video explaining how Vonoy works
          </p>
        </div>

        <div className={styles.videoContainer}>
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
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Vonoy Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className={styles.videoPlaceholder}>
              {/* Gradient placeholder instead of image */}
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
