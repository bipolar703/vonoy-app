import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import styles from './StatsSection.module.css';

/**
 * StatsAnimation Component - Simplified
 *
 * Displays a Lottie animation for the Stats section.
 * Uses react-lottie-player for reliable animation playback.
 */

interface LottieAsset {
  id: string;
  w: number;
  h: number;
  u: string;
  p: string;
  e: number;
  [key: string]: unknown;
}

interface LottieLayer {
  ddd: number;
  ind: number;
  ty: number;
  nm: string;
  sr: number;
  ks: Record<string, unknown>;
  ao: number;
  ip: number;
  op: number;
  st: number;
  bm: number;
  [key: string]: unknown;
}

interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: LottieAsset[];
  layers: LottieLayer[];
  [key: string]: unknown;
}

export const StatsAnimation = () => {
  const [animationData, setAnimationData] = useState<LottieAnimationData | null>(null);

  useEffect(() => {
    // Load the animation data from the public folder
    fetch('/vonoylottie.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load animation data');
        }
        return response.json();
      })
      .then((data) => {
        setAnimationData(data);
      })
      .catch((error) => {
        console.error('Error loading animation:', error);
      });
  }, []);

  return (
    <div className={styles.animationContainer}>
      {animationData && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
};
