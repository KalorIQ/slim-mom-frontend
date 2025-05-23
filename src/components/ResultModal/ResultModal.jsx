import React from "react";
import style from "./ResultModal.module.css";

const ResultModal = ({ calorieResult, onClose }) => {
  // Eğer calorieResult undefined/null ise gösterme
  if (calorieResult === null || calorieResult === undefined || isNaN(calorieResult)) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <button onClick={onClose} className={style.closeBtn}>×</button>
        <h2 className={style.title}>Your recommended daily calorie intake is</h2>
        <p className={style.calorie}>{Math.round(Number(calorieResult))} Kalori</p>
        <h3 className={style.subtitle}>Foods you should not eat</h3>
        <ol className={style.list}>
          <li className={style.listItem}>Flour products</li>
          <li className={style.listItem}>Milk</li>
          <li className={style.listItem}>Red meat</li>
          <li className={style.listItem}>Smoked meats</li>
        </ol>
        <button className={style.button} onClick={onClose}>
          Start losing weight
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
