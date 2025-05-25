import { useTranslation } from 'react-i18next';
import BlurText from "./BlurText";

const Title = () => {
  const { t } = useTranslation();
  
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <BlurText
      text={t('calculator.title')}
      delay={280}
      animateBy="words"
      direction="top"
      onAnimationComplete={handleAnimationComplete}
      className="font-bold" 
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