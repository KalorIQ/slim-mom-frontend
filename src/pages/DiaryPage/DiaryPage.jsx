import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiaryPage.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import {
  addProduct,
  removeProduct,
  getDiaryEntries,
  getDailyCalories,
  getDailyCalorieNeeds,
  searchProducts,
} from "../../redux/products/productOperation.js";
import {
  selectProcessedDiaryEntries,
  selectCurrentDate,
  selectDailyRate,
  selectDailyCalories,
  selectLeftCalories,
  selectPercentageConsumed,
  selectNotAllowedFoods,
  selectSearchResults,
  selectProductsLoading,
} from "../../redux/products/productSelectors.js";
import { selectUser } from "../../redux/auth/authSelectors.js";
import CalculateModal from "../../components/CalculateModal/CalculateModal.jsx";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper.jsx";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const diaryEntries = useSelector(selectProcessedDiaryEntries);
  const currentDate = useSelector(selectCurrentDate);
  const dailyRate = useSelector(selectDailyRate);
  const dailyCalories = useSelector(selectDailyCalories);
  const leftCalories = useSelector(selectLeftCalories);
  const percentageConsumed = useSelector(selectPercentageConsumed);
  const notAllowedFoods = useSelector(selectNotAllowedFoods);
  const searchResults = useSelector(selectSearchResults);
  const isLoading = useSelector(selectProductsLoading);
  const user = useSelector(selectUser);

  const userInfo = user.infouser;

  const showModal = userInfo.currentWeight === null || userInfo.height === null || userInfo.age === null || userInfo.desireWeight === null || userInfo.bloodType === null;
  const [showCalculateModal, setShowCalculateModal] = useState(showModal);
  const [showBlockMessage, setShowBlockMessage] = useState(false);
    
  
  const [productName, setProductName] = useState("");
  const [grams, setGrams] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);

  // Load diary data when component mounts or date changes
  useEffect(() => {
    if (currentDate) {
      dispatch(getDiaryEntries(currentDate));
      dispatch(getDailyCalories(currentDate));
      dispatch(getDailyCalorieNeeds(currentDate));
    }
  }, [dispatch, currentDate]);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setProductName(product.title);
    setShowSearchResults(false);
  };

  const handleAddProduct = () => {
    if (selectedProduct && grams) {
      const productData = {
        productId: selectedProduct._id,
        productWeight: parseInt(grams),
        date: currentDate,
      };

      dispatch(addProduct(productData)).then(() => {
        // Refresh diary entries and daily calories after adding
        dispatch(getDiaryEntries(currentDate));
        dispatch(getDailyCalories(currentDate));
      });

      setProductName("");
      setGrams("");
      setSelectedProduct(null);
    }
  };

  const handleRemoveItem = (entryId) => {
    dispatch(removeProduct({ productId: entryId, date: currentDate })).then(
      () => {
        // Refresh daily calories after removing
        dispatch(getDailyCalories(currentDate));
      }
    );
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (selectedProduct && value !== selectedProduct.title) {
      setSelectedProduct(null);
    }

    // Clear previous timeout
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    // Start searching when user types at least 3 letters
    if (value.length >= 3 && !selectedProduct) {
      const timeoutId = setTimeout(() => {
        dispatch(searchProducts(value));
        setShowSearchResults(true);
      }, 500);
      setSearchTimeoutId(timeoutId);
    } else {
      setShowSearchResults(false);
      setSearchTimeoutId(null);
    }
  };

  const displayDate = new Date(currentDate).toLocaleDateString("en-GB");

  return (
    <div className={styles.diaryPage}>
      {showCalculateModal ? (
        <ModalWrapper isOpen={showCalculateModal} onClose={() => {
          setShowCalculateModal(false);
          setShowBlockMessage(true);
        }}>
          <CalculateModal onClose={() => {
            setShowCalculateModal(false);
            setShowBlockMessage(true);
          }} />
        </ModalWrapper>
      ) : showBlockMessage ? (
        <div className={styles.blockMessageWrapper}>
          <div className={styles.blockMessageBox}>
            <h2 className={styles.blockMessageTitle}>We're Sorry!</h2>
            <p className={styles.blockMessageText}>
            To proceed with adding products, please calculate your daily calorie needs first. This helps us personalize your experience.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.leftSection}>
          <div className={styles.dateSection}>
            <h1 className={styles.dateTitle}>{displayDate}</h1>
            <BsCalendar4 className={styles.calendarIcon} />
          </div>

          <div className={styles.addProductForm}>
            <div className={styles.productInputContainer}>
              <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={handleProductNameChange}
                className={styles.productInput}
                disabled={isLoading}
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className={styles.searchResults}>
                  {searchResults.slice(0, 5).map((product) => (
                    <div
                      key={product._id}
                      className={styles.searchResultItem}
                      onClick={() => handleProductSelect(product)}
                    >
                      <span className={styles.productTitle}>{product.title}</span>
                      <span className={styles.productCalories}>
                        {product.calories} kcal/100g
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              disabled={isLoading || !selectedProduct || !grams}
            >
              <IoMdAdd />
            </button>
          </div>

          <div className={styles.foodList}>
            {diaryEntries.map((item) => (
              <div key={item._id} className={styles.foodItem}>
                <span className={styles.foodName}>{item.name}</span>
                <span className={styles.foodGrams}>{item.grams} g</span>
                <span className={styles.foodCalories}>{item.calories} kcal</span>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className={styles.removeButton}
                  disabled={isLoading}
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      

      <div className={styles.rightSection}>
        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Summary for {displayDate}</h2>
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
    </div>
  );
};

export default DiaryPage;
