// Summary.jsx - Bu dosya değişmedi, önceki verdiğim kodla aynı.
import styles from "./Summary.module.css";
import {
    selectDailyRate,
    selectDailyCalories,
    selectLeftCalories,
    selectPercentageConsumed,
    selectNotAllowedFoods,
    selectCurrentDate,
} from "../../redux/products/productSelectors.js";
import { useSelector } from "react-redux";

const Summary = () => {
    const dailyRate = useSelector(selectDailyRate);
    const dailyCalories = useSelector(selectDailyCalories);
    const leftCalories = useSelector(selectLeftCalories);
    const percentageConsumed = useSelector(selectPercentageConsumed);
    const notAllowedFoods = useSelector(selectNotAllowedFoods);
    const currentDate = useSelector(selectCurrentDate);

    // Ekran görüntüsündeki tarih formatı "5/24/2025"
    const displayDate = currentDate ? new Date(currentDate).toLocaleDateString("en-US") : "";

    return (
        <div className={styles.summary}>
            <div className={styles.summaryContainer}>
                <h3 className={styles.title}>Summary for {displayDate}</h3>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Left <span>{leftCalories || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        Consumed <span>{dailyCalories || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        Daily rate <span>{dailyRate || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        n% of normal <span>{percentageConsumed || 0}%</span>
                    </p>
                </div>
            </div>
            <div className={styles.summaryContainerAlt}>
                <h3 className={styles.notRecommendedTitle}>Food not recommended</h3>
                {notAllowedFoods && notAllowedFoods.length > 0 ? (
                    <ul className={styles.notRecommendedList}>
                        {notAllowedFoods.map((food, index) => (
                            <li key={index} className={styles.notRecommendedItem}>
                                {food}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noFoodsMessage}>Your diet will be displayed here</p>
                )}
            </div>
        </div>
    );
};

export default Summary;