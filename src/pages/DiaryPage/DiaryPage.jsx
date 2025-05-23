import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiaryPage.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import {
  addProduct,
  removeProduct,
} from "../../redux/products/productOperation.js";
import {
  selectDiaryEntries,
  selectCurrentDate,
  selectDailyRate,
  selectTotalCalories,
  selectProductsLoading,
} from "../../redux/products/productSelectors.js";
import { selectUser } from "../../redux/auth/authSelectors.js";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const diaryEntries = useSelector(selectDiaryEntries);
  const currentDate = useSelector(selectCurrentDate);
  const dailyRate = useSelector(selectDailyRate);
  const totalCalories = useSelector(selectTotalCalories);
  const isLoading = useSelector(selectProductsLoading);

  const [productName, setProductName] = useState("");
  const [grams, setGrams] = useState("");

  // Sample data for demo purposes (will be replaced with real data from API)
  useEffect(() => {
    // For demo purposes, we'll add some sample data if entries are empty
    if (diaryEntries.length === 0) {
      // You would normally dispatch getDiaryEntries(currentDate) here
      // For demo, we'll just show the sample data
    }
  }, [diaryEntries.length, currentDate, dispatch]);

  const handleAddProduct = () => {
    if (productName && grams) {
      const productData = {
        name: productName,
        grams: parseInt(grams),
        calories: Math.round(parseInt(grams) * 2.5), // Mock calculation
        date: currentDate,
      };

      dispatch(addProduct(productData));
      setProductName("");
      setGrams("");
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProduct(id));
  };

  // Get user's not recommended foods
  const notRecommendedFoods = user?.infouser?.notAllowedProducts || [
    "Flour products",
    "Milk",
    "Red meat",
    "Smoked meats",
  ];

  // For demo purposes, show sample data if no entries from Redux
  const displayEntries =
    diaryEntries.length > 0
      ? diaryEntries
      : [
          { id: 1, name: "Eggplant", grams: 100, calories: 320 },
          { id: 2, name: "Poultry meat", grams: 100, calories: 480 },
          { id: 3, name: "Bread", grams: 100, calories: 210 },
          { id: 4, name: "Nut", grams: 100, calories: 205 },
          { id: 5, name: "Pork meat", grams: 100, calories: 580 },
          { id: 6, name: "Potato", grams: 100, calories: 360 },
        ];

  const displayDailyRate = user?.infouser?.dailyRate || dailyRate;
  const displayTotalCalories =
    diaryEntries.length > 0
      ? totalCalories
      : displayEntries.reduce((sum, item) => sum + item.calories, 0);
  const displayLeftCalories = displayDailyRate - displayTotalCalories;
  const displayPercentageConsumed = Math.round(
    (displayTotalCalories / displayDailyRate) * 100
  );

  return (
    <div className={styles.diaryPage}>
      <div className={styles.leftSection}>
        <div className={styles.dateSection}>
          <h1 className={styles.dateTitle}>{currentDate}</h1>
          <BsCalendar4 className={styles.calendarIcon} />
        </div>

        <div className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={styles.productInput}
            disabled={isLoading}
          />
          <input
            type="number"
            placeholder="Grams"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            className={styles.gramsInput}
            disabled={isLoading}
          />
          <button
            onClick={handleAddProduct}
            className={styles.addButton}
            disabled={isLoading || !productName || !grams}
          >
            <IoMdAdd />
          </button>
        </div>

        <div className={styles.foodList}>
          {displayEntries.map((item) => (
            <div key={item.id} className={styles.foodItem}>
              <span className={styles.foodName}>{item.name}</span>
              <span className={styles.foodGrams}>{item.grams} g</span>
              <span className={styles.foodCalories}>{item.calories} kcal</span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className={styles.removeButton}
                disabled={isLoading}
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Summary for {currentDate}</h2>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Left</span>
            <span className={styles.summaryValue}>
              {displayLeftCalories} kcal
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Consumed</span>
            <span className={styles.summaryValue}>
              {displayTotalCalories} kcal
            </span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>Daily rate</span>
            <span className={styles.summaryValue}>{displayDailyRate} kcal</span>
          </div>
          <div className={styles.summaryItem}>
            <span className={styles.summaryLabel}>n% of normal</span>
            <span className={styles.summaryValue}>
              {displayPercentageConsumed} %
            </span>
          </div>
        </div>

        <div className={styles.notRecommendedSection}>
          <h3 className={styles.notRecommendedTitle}>Food not recommended</h3>
          <ul className={styles.notRecommendedList}>
            {notRecommendedFoods.map((food, index) => (
              <li key={index} className={styles.notRecommendedItem}>
                {food}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;
