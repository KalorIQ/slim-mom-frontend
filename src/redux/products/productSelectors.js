const selectProductsLoading = (state) => state.products.isLoading;
const selectProductsError = (state) => state.products.error;
const selectDiaryEntries = (state) => state.products.diaryEntries;
const selectSearchResults = (state) => state.products.searchResults;
const selectCurrentDate = (state) => state.products.currentDate;
const selectDailyRate = (state) => state.products.dailyRate;

// Calculated selectors
const selectTotalCalories = (state) => {
  return state.products.diaryEntries.reduce(
    (sum, entry) => sum + entry.calories,
    0
  );
};

const selectLeftCalories = (state) => {
  const totalCalories = selectTotalCalories(state);
  const dailyRate = selectDailyRate(state);
  return dailyRate - totalCalories;
};

const selectPercentageConsumed = (state) => {
  const totalCalories = selectTotalCalories(state);
  const dailyRate = selectDailyRate(state);
  return Math.round((totalCalories / dailyRate) * 100);
};

export {
  selectProductsLoading,
  selectProductsError,
  selectDiaryEntries,
  selectSearchResults,
  selectCurrentDate,
  selectDailyRate,
  selectTotalCalories,
  selectLeftCalories,
  selectPercentageConsumed,
};
