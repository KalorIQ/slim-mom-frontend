const intakeCalorie = ({ currentWeight, height, age, desiredWeight }) => {
  if (!currentWeight || !height || !age || !desiredWeight) {
    return null;
  }

  return (
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight)
  );
};

export default intakeCalorie;
