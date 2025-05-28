import React from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const dailyRate = useSelector(selectDailyRate);
    const dailyCalories = useSelector(selectDailyCalories);
    const leftCalories = useSelector(selectLeftCalories);
    const percentageConsumed = useSelector(selectPercentageConsumed);
    const notAllowedFoods = useSelector(selectNotAllowedFoods);
    const currentDate = useSelector(selectCurrentDate);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        
        const formattedMonth = date.getMonth() + 1;
        const formattedDay = date.getDate();
        const formattedYear = date.getFullYear();
        return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    };

    const displayDate = currentDate ? formatDate(currentDate) : "";

    return (
        <div className={styles.summary}>
            <div className={styles.summaryContainer}>
                <h3 className={styles.title}>{t('summary.title')} {displayDate}</h3>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        {t('summary.leftToEat')} <span>{leftCalories || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        {t('summary.consumed')} <span>{dailyCalories || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        {t('summary.dailyRate')} <span>{dailyRate || 0} kcal</span>
                    </p>
                    <p className={styles.text}>
                        {t('summary.percentOfNormal')} <span>{percentageConsumed || 0}%</span>
                    </p>
                </div>
            </div>
            <div className={styles.summaryContainerAlt}>
                <h3 className={styles.notRecommendedTitle}>{t('summary.foodNotRecommended')}</h3>
                {notAllowedFoods && notAllowedFoods.length > 0 ? (
                    <ul className={styles.notRecommendedList}>
                        {notAllowedFoods.map((food, index) => (
                            <li key={index} className={styles.notRecommendedItem}>
                                {food}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noFoodsMessage}>{t('summary.noFoodsMessage')}</p>
                )}
            </div>
        </div>
    );
};

export default Summary;