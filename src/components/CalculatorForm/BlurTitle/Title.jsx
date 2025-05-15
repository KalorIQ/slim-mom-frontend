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
      className="font-bold mb-8" 
      style={{
        fontFamily: 'Verdana, sans-serif',
        fontSize: '34px',
        lineHeight: '140%',
        fontWeight: 700,
        color: '#212121',
        maxWidth: '600px'
      }}
    />
  );
};

export default Title;