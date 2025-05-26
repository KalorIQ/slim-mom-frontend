import { useState, useRef, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Settings.module.css';

const Settings = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const settingsRef = useRef(null);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    setCurrentTheme(theme);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
          setCurrentTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSettings = () => {
    setIsOpen(!isOpen);
  };

  const getThemeDisplayText = () => {
    return currentTheme === 'dark' ? t('settings.dark') : t('settings.light');
  };

  return (
    <div className={styles.settingsContainer} ref={settingsRef}>
      <button 
        className={styles.settingsButton}
        onClick={toggleSettings}
        aria-label={t('settings.openSettings')}
      >
        <FaCog className={styles.settingsIcon} />
        <span className={styles.settingsText}>{t('settings.settings')}</span>
      </button>
      
      {isOpen && (
        <div className={styles.settingsDropdown}>
          <div className={styles.settingsItem}>
            <div className={styles.settingsLabelContainer}>
              <span className={styles.settingsLabel}>{t('settings.language')}</span>
            </div>
            <LanguageSwitcher />
          </div>
          
          <div className={styles.settingsItem}>
            <div className={styles.settingsLabelContainer}>
              <span className={styles.settingsLabel}>{t('settings.theme')}</span>
              <span className={styles.themeStatus}>{getThemeDisplayText()}</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings; 