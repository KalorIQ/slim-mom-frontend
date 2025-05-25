import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoHome, IoArrowBack } from 'react-icons/io5';
import { GiHealthNormal, GiMeal, GiWeightScale } from 'react-icons/gi';
import { FaAppleAlt, FaCarrot, FaLeaf } from 'react-icons/fa';
import { MdFitnessCenter, MdLocalDining } from 'react-icons/md';
import { BiHeart } from 'react-icons/bi';
import { TbSalad } from 'react-icons/tb';
import { GiFruitBowl, GiWaterBottle } from 'react-icons/gi';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.floatingElements}>
        {[...Array(25)].map((_, i) => (
          <div key={i} className={styles.floatingIcon} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`
          }}>
            {i % 8 === 0 && <FaAppleAlt />}
            {i % 8 === 1 && <FaCarrot />}
            {i % 8 === 2 && <FaLeaf />}
            {i % 8 === 3 && <GiMeal />}
            {i % 8 === 4 && <MdFitnessCenter />}
            {i % 8 === 5 && <BiHeart />}
            {i % 8 === 6 && <TbSalad />}
            {i % 8 === 7 && <GiFruitBowl />}
          </div>
        ))}
      </div>
      
      <div className={styles.notFoundContent}>
        <div className={styles.errorCodeContainer}>
          <div className={styles.errorCode}>4</div>
          <div className={styles.errorCodeMiddle}>
            <div className={styles.healthIcon}>
              <GiHealthNormal />
              <div className={styles.healthPulse}></div>
            </div>
          </div>
          <div className={styles.errorCode}>4</div>
        </div>
        
        <h1 className={styles.errorTitle}>{t('notFound.title')}</h1>
        <p className={styles.errorMessage}>
          {t('notFound.message')}
        </p>
        
        <div className={styles.buttonGroup}>
          <button 
            onClick={handleGoHome}
            className={styles.primaryButton}
          >
            <IoHome className={styles.buttonIcon} />
            {t('notFound.goHome')}
          </button>
          <button 
            onClick={handleGoBack}
            className={styles.secondaryButton}
          >
            <IoArrowBack className={styles.buttonIcon} />
            {t('notFound.goBack')}
          </button>
        </div>

        <div className={styles.healthScene}>
          <div className={styles.plateContainer}>
            <div className={styles.plate}>
              <div className={styles.plateFood}>
                <FaAppleAlt className={styles.apple} />
                <FaCarrot className={styles.carrot} />
                <FaLeaf className={styles.salad} />
              </div>
              <div className={styles.plateGlow}></div>
            </div>
          </div>
          
          <div className={styles.scaleContainer}>
            <GiWeightScale className={styles.scale} />
            <div className={styles.scaleDisplay}>
              <span>404</span>
            </div>
          </div>
          
          <div className={styles.heartContainer}>
            <BiHeart className={styles.heartbeat} />
            <div className={styles.heartRipple}></div>
          </div>
          
          <div className={styles.fitnessContainer}>
            <MdFitnessCenter className={styles.fitness} />
          </div>
          
          <div className={styles.waterContainer}>
            <GiWaterBottle className={styles.water} />
            <div className={styles.waterDrops}>
              <span>💧</span>
              <span>💧</span>
              <span>💧</span>
            </div>
          </div>
        </div>
        
        <div className={styles.motivationalText}>
          <p>{t('notFound.motivation')}</p>
          <div className={styles.motivationDecor}>
            <span>🌿</span>
            <span>✨</span>
            <span>🌿</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 