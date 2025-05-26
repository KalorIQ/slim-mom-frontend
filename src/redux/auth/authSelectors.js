export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

export const selectUserName = (state) => state.auth.user?.name;

const selectUser = (state) => state.auth.user;
const selectUserEmail = (state) => state.auth.user?.email || null;
const selectUserInfo = (state) => state.auth.user?.infouser || null;
const selectAccessToken = (state) => state.auth.accessToken;

// Additional selectors for user info
const selectUserCurrentWeight = (state) => state.auth.user?.infouser?.currentWeight || null;
const selectUserHeight = (state) => state.auth.user?.infouser?.height || null;
const selectUserAge = (state) => state.auth.user?.infouser?.age || null;
const selectUserDesiredWeight = (state) => state.auth.user?.infouser?.desireWeight || null;
const selectUserBloodType = (state) => state.auth.user?.infouser?.bloodType || null;
const selectUserDailyRate = (state) => state.auth.user?.infouser?.dailyRate || null;
const selectUserNotAllowedProducts = (state) => state.auth.user?.infouser?.notAllowedProducts || null;
const selectUserNotAllowedProductsAll = (state) => state.auth.user?.infouser?.notAllowedProductsAll || null;

export { 
  selectUser, 
  selectUserEmail,
  selectUserInfo,
  selectAccessToken,
  selectUserCurrentWeight,
  selectUserHeight,
  selectUserAge,
  selectUserDesiredWeight,
  selectUserBloodType,
  selectUserDailyRate,
  selectUserNotAllowedProducts,
  selectUserNotAllowedProductsAll
};