import { useTranslation } from 'react-i18next';
import BlurText from "./BlurText";
import './Title.css';

const Title = () => {
  const { t, i18n } = useTranslation();

  return (
    <BlurText
      key={i18n.language}
      text={t('calculator.title')}
      delay={280}
      animateBy="words"
      direction="top"
      className="calculator-title" 
      style={{
        fontFamily: 'Verdana, sans-serif',
        fontSize: '34px',
        lineHeight: '140%',
        fontWeight: 700,
        color: 'var(--text-primary)',
        maxWidth: '600px',
        marginTop: '0',
        marginBottom: '40px'
      }}
    />
  );
};

export default Title;