import BlurText from "./BlurText";

const Title = () => {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <BlurText
      text="Calculate your daily calorie intake right now!"
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