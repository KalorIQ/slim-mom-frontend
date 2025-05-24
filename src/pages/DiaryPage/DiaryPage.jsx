import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiaryPage.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { BsCalendar4 } from "react-icons/bs";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
  selectSearchResults,
  selectProductsLoading,
} from "../../redux/products/productSelectors.js";
import { selectUser } from "../../redux/auth/authSelectors.js";
import CalculateModal from "../../components/CalculateModal/CalculateModal.jsx";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper.jsx";
import Summary from "../../components/Summary/Summary.jsx";

const DiaryPage = () => {
  const dispatch = useDispatch();
  const diaryEntries = useSelector(selectProcessedDiaryEntries);
  const currentDate = useSelector(selectCurrentDate);
  const searchResults = useSelector(selectSearchResults);
  const isLoading = useSelector(selectProductsLoading);
  const user = useSelector(selectUser);

  const userInfo = user.infouser;
  const showModal = userInfo.currentWeight === null || userInfo.height === null || userInfo.age === null || userInfo.desireWeight === null || userInfo.bloodType === null;
  const [showCalculateModal, setShowCalculateModal] = useState(showModal);
  const [showBlockMessage, setShowBlockMessage] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const [productName, setProductName] = useState("");
  const [grams, setGrams] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState(null);

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
        dispatch(getDiaryEntries(currentDate));
        dispatch(getDailyCalories(currentDate));
      });

      setProductName("");
      setGrams("");
      setSelectedProduct(null);
    }
  };

  const handleRemoveItem = (entryId) => {
    dispatch(removeProduct({ productId: entryId, date: currentDate }))
      .unwrap()
      .then(() => {
        dispatch(getDiaryEntries(currentDate));
        dispatch(getDailyCalories(currentDate));
      })
      .catch((error) => {
        console.error('Failed to remove product:', error);
      });
  };

  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);

    if (selectedProduct && value !== selectedProduct.title) {
      setSelectedProduct(null);
    }

    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

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

  const displayDate = new Date(currentDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    dispatch({ type: 'products/setCurrentDate', payload: formattedDate });
    setShowCalendar(false);
  };

  return (
    <div className={styles.diaryPageContainer}>
      <div className={styles.diaryPage}>
        <div className={styles.leftSection}>
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
            <div className={styles.diaryContent}>
              <div className={styles.dateSection}>
                <h1 className={styles.dateTitle}>{displayDate}</h1>
                <div className={styles.calendarWrapper}>
                  <BsCalendar4 
                    className={styles.calendarIcon} 
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                  {showCalendar && (
                    <div className={styles.calendarPopup}>
                      <Calendar
                        onChange={handleDateChange}
                        value={new Date(currentDate)}
                        className={styles.calendar}
                      />
                    </div>
                  )}
                </div>
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
                      {searchResults.slice(0, 15).map((product) => (
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

              {diaryEntries.length > 0 ? (
                <div className={styles.foodList}>
                  {diaryEntries.map((item) => (
                    <div key={item._id} className={styles.foodItem}>
                      <span className={styles.foodName}>{item.name}</span>
                      <span className={styles.foodGrams}>{item.grams} g</span>
                      <span className={styles.foodCalories}>{item.calories} kcal</span>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className={styles.removeButton}
                        aria-label="Remove item"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noEntriesMessage}>
                  Your food diary is empty. Add your first product!
                </p>
              )}
            </div>
          )}
        </div>
        <div className={styles.rightSection}>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default DiaryPage;