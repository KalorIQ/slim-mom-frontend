import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
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
import Loader from "../../components/Loader/Loader.jsx";

const DiaryPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const diaryEntries = useSelector(selectProcessedDiaryEntries);
  const currentDate = useSelector(selectCurrentDate);
  const searchResults = useSelector(selectSearchResults);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectProductsLoading);

  const userInfo = user?.infouser || {
    currentWeight: null,
    height: null,
    age: null,
    desireWeight: null,
    bloodType: null,
  };
  
  // Check if user info is complete
  const isUserInfoComplete = userInfo.currentWeight !== null && 
                            userInfo.height !== null && 
                            userInfo.age !== null && 
                            userInfo.desireWeight !== null && 
                            userInfo.bloodType !== null;
                   
  const [showCalculateModal, setShowCalculateModal] = useState(!isUserInfoComplete);
  const [showBlockMessage, setShowBlockMessage] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  // Update modal state when user info changes
  useEffect(() => {
    if (isUserInfoComplete) {
      setShowCalculateModal(false);
      setShowBlockMessage(false);
    } else {
      setShowCalculateModal(true);
      setShowBlockMessage(false);
    }
  }, [isUserInfoComplete]);
  
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

  const handleRemoveItem = (itemId) => {
    dispatch(removeProduct({ productId: itemId, date: currentDate })).then(() => {
      dispatch(getDiaryEntries(currentDate));
      dispatch(getDailyCalories(currentDate));
    }).catch((error) => {
      console.error("- Delete operation failed:", error);
    });
  };

  const handleProductSearch = (value) => {
    setProductName(value);
    setSelectedProduct(null);

    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    if (value.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        dispatch(searchProducts(value.trim()));
        setShowSearchResults(true);
      }, 300);
      setSearchTimeoutId(timeoutId);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleDateChange = (date) => {
    // Timezone sorununu çözmek için yerel tarih formatlaması kullanıyoruz
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    dispatch({ type: 'products/setCurrentDate', payload: formattedDate });
    setShowCalendar(false);
  };

  const formatDisplayDate = (dateString) => {
    // Timezone sorununu önlemek için tarih string'ini doğrudan parse ediyoruz
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // month - 1 çünkü JS'de aylar 0-11 arası
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayDate = formatDisplayDate(currentDate);

  return (
    <div className={styles.diaryPageContainer}>
      {isLoading && <Loader />}
      <div className={styles.diaryPage}>
        <div className={styles.leftSection}>
          {showCalculateModal ? (
            <ModalWrapper isOpen={showCalculateModal} onClose={() => {
              if (isUserInfoComplete) {
                setShowCalculateModal(false);
              } else {
                setShowBlockMessage(true);
              }
            }}>
              <CalculateModal 
                key={t('calculator.dailyCalorieNeeds')}
                onClose={() => {
                  if (isUserInfoComplete) {
                    setShowCalculateModal(false);
                  } else {
                    setShowBlockMessage(true);
                  }
                }} 
              />
            </ModalWrapper>
          ) : showBlockMessage ? (
            <div className={styles.blockMessageWrapper}>
              <div className={styles.blockMessageBox}>
                <h2 className={styles.blockMessageTitle}>{t('diary.blockTitle')}</h2>
                <p className={styles.blockMessageText}>
                  {t('diary.blockMessage')}
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
                        value={(() => {
                          // currentDate string'ini güvenli bir şekilde Date objesine çeviriyoruz
                          const [year, month, day] = currentDate.split('-');
                          return new Date(year, month - 1, day);
                        })()}
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
                    value={productName}
                    onChange={(e) => handleProductSearch(e.target.value)}
                    placeholder={t('diary.searchPlaceholder')}
                    className={styles.productInput}
                  />
                  
                  {showSearchResults && searchResults.length > 0 && (
                    <div className={styles.searchResults}>
                      {searchResults.slice(0, 10).map((product) => (
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
                  
                  {showSearchResults && searchResults.length === 0 && productName.trim() && (
                    <div className={styles.noResults}>
                      {t('diary.noResults')}
                    </div>
                  )}
                </div>

                <input
                  type="number"
                  value={grams}
                  onChange={(e) => setGrams(e.target.value)}
                  placeholder={t('diary.grams')}
                  className={styles.gramsInput}
                />

                <button
                  onClick={handleAddProduct}
                  disabled={!selectedProduct || !grams}
                  className={styles.addButton}
                >
                  <IoMdAdd className={styles.addIcon} />
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
                        aria-label={t('diary.removeItem')}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noEntriesMessage}>
                  {t('diary.emptyMessage')}
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