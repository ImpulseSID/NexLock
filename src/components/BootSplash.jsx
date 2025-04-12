import React, { useEffect, useState } from 'react';
import styles from './BootSplash.module.css';
import { FaLock } from 'react-icons/fa';

const BootSplash = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start the exit animation after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(true);
      // Remove the component from DOM after animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`${styles.container} ${isAnimating ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <FaLock className={styles.logo} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>NexLock</h1>
          <p className={styles.subtitle}>Secure Password Manager</p>
        </div>
        <div className={styles.loader}>
          <div className={styles.loaderBar}></div>
        </div>
      </div>
    </div>
  );
};

export default BootSplash; 