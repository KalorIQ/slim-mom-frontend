// src/utils/axiosInstance.js
import axios from "axios";
import store from "../redux/store.js"; // Redux store'un yolunu doğru ver

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Vite ortam değişkeni
  withCredentials: true, // Çerezle refresh yapılacaksa şart
});

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // refreshToken'ı dinamik olarak import et
          const { refreshToken } = await import("../redux/auth/authOperation.js");
          const result = await store.dispatch(refreshToken()).unwrap();

          // Yeni token'ı al
          const newAccessToken = result.data.accessToken;

          // Yeni token'ı Authorization header'a koy
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          // Orijinal isteği yeniden gönder
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          isRefreshing = false;
          return axiosInstance(originalRequest);
        } catch (err) {
          isRefreshing = false;
          // Refresh başarısız olduysa logout veya yönlendirme yapılabilir
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
