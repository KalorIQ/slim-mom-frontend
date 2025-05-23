const selectLoading = (state) => state.auth.loading;
const selectError = (state) => state.auth.error;
const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
const selectUser = (state) => state.auth.user;
const selectUserName = (state) => state.auth.user.name;
const selectUserEmail = (state) => state.auth.user.email;

export { selectLoading, selectError, selectIsLoggedIn, selectUser, selectUserName, selectUserEmail };