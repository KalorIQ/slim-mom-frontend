import styles from "./Summary.module.css";
import {
    selectDailyRate,
    selectDailyCalories,
    selectLeftCalories,
    selectPercentageConsumed,
    selectNotAllowedFoods,
} from "../../redux/products/productSelectors.js";
import { useSelector } from "react-redux";

const Summary = () => {
    const dailyRate = useSelector(selectDailyRate);
    const dailyCalories = useSelector(selectDailyCalories);
    const leftCalories = useSelector(selectLeftCalories);
    const percentageConsumed = useSelector(selectPercentageConsumed);
    const notAllowedFoods = useSelector(selectNotAllowedFoods);

    return ( 
        <>
        <div className={styles.background}></div>
        <div className={styles.rightSection}>
        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Summary for </h2>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Left</span>
            <span className={styles.summaryValue}>{leftCalories} kcal</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Consumed</span>
            <span className={styles.summaryValue}>{dailyCalories} kcal</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Daily rate</span>
            <span className={styles.summaryValue}>{dailyRate} kcal</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>n% of normal</span>
            <span className={styles.summaryValue}>{percentageConsumed} %</span>
          </div>
        </div>

        <div className={styles.notRecommendedSection}>
          <h3 className={styles.notRecommendedTitle}>Food not recommended</h3>
          <ul className={styles.notRecommendedList}>
            {notAllowedFoods.map((food, index) => (
              <li key={index} className={styles.notRecommendedItem}>
                {food}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </>
    )
}

export default Summary;