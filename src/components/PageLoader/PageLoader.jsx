import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaAppleAlt, 
  FaLeaf, 
  FaHeart, 
  FaBolt, 
  FaCarrot,
  FaRunning,
  FaDumbbell,
  FaBullseye
} from 'react-icons/fa';
import { 
  GiHealthNormal,
  GiMeal
} from 'react-icons/gi';
import { 
  MdFitnessCenter,
  MdFavorite
} from 'react-icons/md';
import styles from './PageLoader.module.css';

const PageLoader = () => {
  const { t } = useTranslation();
  
  const healthIcons = [
    FaAppleAlt, FaLeaf, FaHeart, FaBolt, FaCarrot,
    GiMeal, MdFitnessCenter, GiHealthNormal
  ];
  
  return (
    <div className={styles.pageLoader}>
      <div className={styles.loaderBackground}>
        {/* Floating health particles */}
        {[...Array(20)].map((_, i) => {
          const IconComponent = healthIcons[i % healthIcons.length];
          return (
            <div 
              key={i} 
              className={styles.healthParticle} 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
      
      <div className={styles.loaderContent}>
        {/* Main loader container */}
        <div className={styles.loaderMain}>
          {/* Heartbeat monitor */}
          <div className={styles.heartbeatMonitor}>
            <div className={styles.heartbeatLine}>
              <svg viewBox="0 0 200 50" className={styles.heartbeatSvg}>
                <path 
                  d="M0,25 L40,25 L45,10 L50,40 L55,15 L60,35 L65,25 L200,25" 
                  className={styles.heartbeatPath}
                />
              </svg>
            </div>
            <div className={styles.heartIcon}>
              <MdFavorite />
            </div>
          </div>
          
          {/* Central health logo */}
          <div className={styles.healthLogo}>
            <div className={`${styles.logoRing} ${styles.ring1}`}></div>
            <div className={`${styles.logoRing} ${styles.ring2}`}></div>
            <div className={`${styles.logoRing} ${styles.ring3}`}></div>
            <div className={styles.logoCenter}>
              <div className={styles.healthCross}>
                <div className={styles.crossVertical}></div>
                <div className={styles.crossHorizontal}></div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.progressDots}>
              <span className={`${styles.dot} ${styles.dot1}`}></span>
              <span className={`${styles.dot} ${styles.dot2}`}></span>
              <span className={`${styles.dot} ${styles.dot3}`}></span>
            </div>
          </div>
          
          {/* Loading text */}
          <div className={styles.loaderTextContainer}>
            <h3 className={styles.loaderTitle}>SLIM MOM</h3>
            <p className={styles.loaderSubtitle}>{t('common.pageLoading')}</p>
          </div>
        </div>
        
        {/* Bottom health stats animation */}
        <div className={styles.healthStats}>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>
              <FaRunning />
            </span>
            <span className={styles.statValue}>98%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>
              <FaDumbbell />
            </span>
            <span className={styles.statValue}>85%</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statIcon}>
              <FaBullseye />
            </span>
            <span className={styles.statValue}>92%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader; 