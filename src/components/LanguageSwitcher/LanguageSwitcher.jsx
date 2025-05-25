import { useTranslation } from 'react-i18next';
import style from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'tr', name: 'TR', flag: '🇹🇷' },
    { code: 'ru', name: 'RU', flag: '🇷🇺' }
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className={style.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`${style.languageButton} ${
            i18n.language === lang.code ? style.active : ''
          }`}
        >
          <span className={style.flag}>{lang.flag}</span>
          <span className={style.name}>{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 