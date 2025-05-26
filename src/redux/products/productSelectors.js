import { createSelector } from '@reduxjs/toolkit';

const selectProductsLoading = (state) => state.products.isLoading;
const selectProductsError = (state) => state.products.error;
const selectDiaryEntries = (state) => state.products.diaryEntries;
const selectSearchResults = (state) => state.products.searchResults;
const selectCurrentDate = (state) => state.products.currentDate;
const selectDailyCalories = (state) => state.products.dailyCalories;
const selectDailyCalorieNeeds = (state) => state.products.dailyCalorieNeeds;
const selectDailyRate = (state) => state.products.dailyRate;
const selectNotAllowedFoods = (state) => state.products.notAllowedFoods;

// New selectors for profile page
const selectWeeklyCalories = (state) => state.products.weeklyCalories;
const selectWeightProgress = (state) => state.products.weightProgress;
const selectUserStats = (state) => state.products.userStats;

// New selectors for comprehensive backend data
const selectActivityStats = (state) => state.products.activityStats;
const selectWeightHistory = (state) => state.products.weightHistory;
const selectMacroBreakdown = (state) => state.products.macroBreakdown;
const selectUserAchievements = (state) => state.products.achievements;
const selectDetailedWeeklyData = (state) => state.products.detailedWeeklyData;

// Calculated selectors for diary entries - memoized
const selectProcessedDiaryEntries = createSelector(
  [selectDiaryEntries],
  (diaryEntries) => {
    // Güvenli array kontrolü
    if (!diaryEntries || !Array.isArray(diaryEntries)) {
      return [];
    }
    
    return diaryEntries.map((entry) => ({
      _id: entry?._id || '',
      name: entry?.productId?.title || "Unknown Product",
      grams: entry?.productWeight || 0,
      calories: Math.round(
        ((entry?.productId?.calories || 0) * (entry?.productWeight || 0)) / 100
      ),
      categories: entry?.productId?.categories || "",
      date: entry?.date || '',
    }));
  }
);

const selectTotalCalories = createSelector(
  [selectProcessedDiaryEntries],
  (entries) => {
    return entries.reduce((sum, entry) => sum + entry.calories, 0);
  }
);

const selectLeftCalories = createSelector(
  [selectDailyRate, selectDailyCalories],
  (dailyRate, dailyCalories) => {
    return Math.max(0, dailyRate - dailyCalories);
  }
);

const selectPercentageConsumed = createSelector(
  [selectDailyRate, selectDailyCalories],
  (dailyRate, dailyCalories) => {
    if (dailyRate === 0) return 0;
    return Math.round((dailyCalories / dailyRate) * 100);
  }
);

// Enhanced selectors for profile page with backend data - memoized
const selectEnhancedUserStats = createSelector(
  [selectUserStats, selectActivityStats],
  (userStats, activityStats) => {
    // Güvenli obje kontrolü
    const safeUserStats = userStats || {};
    const safeActivityStats = activityStats || {};
    
    return {
      ...safeUserStats,
      ...safeActivityStats,
      // Combine both stats for comprehensive view
      totalDays: safeActivityStats.totalDays || safeUserStats.daysActive || 0,
      streak: safeActivityStats.currentStreak || safeUserStats.streak || 0,
    };
  }
);

const selectFormattedWeightHistory = createSelector(
  [selectWeightHistory],
  (weightHistory) => {
    if (!weightHistory || !Array.isArray(weightHistory) || weightHistory.length === 0) {
      return [];
    }
    
    return weightHistory.map((entry, index) => ({
      week: `Week ${index + 1}`,
      weight: entry?.weight || 0,
      date: entry?.date || '',
      change: index > 0 ? (entry?.weight || 0) - (weightHistory[index - 1]?.weight || 0) : 0,
    }));
  }
);

const selectFormattedMacroData = createSelector(
  [selectMacroBreakdown],
  (macroBreakdown) => {
    // Güvenli obje kontrolü
    const safeMacroBreakdown = macroBreakdown || {};
    
    return {
      labels: ['Carbs', 'Protein', 'Fat'],
      data: [
        safeMacroBreakdown.carbs || 45,
        safeMacroBreakdown.protein || 30,
        safeMacroBreakdown.fat || 25,
      ],
      total: (safeMacroBreakdown.carbs || 0) + (safeMacroBreakdown.protein || 0) + (safeMacroBreakdown.fat || 0),
    };
  }
);

export {
  selectProductsLoading,
  selectProductsError,
  selectDiaryEntries,
  selectSearchResults,
  selectCurrentDate,
  selectDailyCalories,
  selectDailyCalorieNeeds,
  selectDailyRate,
  selectNotAllowedFoods,
  selectWeeklyCalories,
  selectWeightProgress,
  selectUserStats,
  selectActivityStats,
  selectWeightHistory,
  selectMacroBreakdown,
  selectUserAchievements,
  selectDetailedWeeklyData,
  selectProcessedDiaryEntries,
  selectTotalCalories,
  selectLeftCalories,
  selectPercentageConsumed,
  selectEnhancedUserStats,
  selectFormattedWeightHistory,
  selectFormattedMacroData,
};
