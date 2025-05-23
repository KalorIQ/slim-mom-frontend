const selectProductsLoading = (state) => state.products.isLoading;
const selectProductsError = (state) => state.products.error;
const selectDiaryEntries = (state) => state.products.diaryEntries;
const selectSearchResults = (state) => state.products.searchResults;
const selectCurrentDate = (state) => state.products.currentDate;
const selectDailyCalories = (state) => state.products.dailyCalories;
const selectDailyRate = (state) => state.products.dailyRate;
const selectNotAllowedFoods = (state) => state.products.notAllowedFoods;

// Calculated selectors for diary entries
const selectProcessedDiaryEntries = (state) => {
  return state.products.diaryEntries.map((entry) => ({
    _id: entry._id,
    name: entry.productId?.title || "Unknown Product",
    grams: entry.productWeight,
    calories: Math.round(
      ((entry.productId?.calories || 0) * entry.productWeight) / 100
    ),
    categories: entry.productId?.categories || "",
    date: entry.date,
  }));
};

const selectTotalCalories = (state) => {
  const entries = selectProcessedDiaryEntries(state);
  return entries.reduce((sum, entry) => sum + entry.calories, 0);
};

const selectLeftCalories = (state) => {
  const totalCalories =
    state.products.dailyCalories || selectTotalCalories(state);
  const dailyRate = selectDailyRate(state);
  return Math.max(0, dailyRate - totalCalories);
};

const selectPercentageConsumed = (state) => {
  const totalCalories =
    state.products.dailyCalories || selectTotalCalories(state);
  const dailyRate = selectDailyRate(state);
  if (dailyRate === 0) return 0;
  return Math.round((totalCalories / dailyRate) * 100);
};

export {
  selectProductsLoading,
  selectProductsError,
  selectDiaryEntries,
  selectSearchResults,
  selectCurrentDate,
  selectDailyCalories,
  selectDailyRate,
  selectNotAllowedFoods,
  selectProcessedDiaryEntries,
  selectTotalCalories,
  selectLeftCalories,
  selectPercentageConsumed,
};
