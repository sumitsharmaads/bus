import axios, { AxiosError } from "axios";
import { tokenStorage, userStorage } from "../db";

export const domain = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: domain,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = tokenStorage.getItem("token");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    const responseData: any = error.response?.data;
    if (responseData?.status === 5001 && !originalRequest?._retry) {
      //adding concept of refresh token
      originalRequest._retry = true;
      try {
        const refreshToken = tokenStorage.getItem("token");
        const response = await axios.post("https://your.auth.server/refresh", {
          refreshToken,
        });
        const { refreshToken: newFreshToken } = response.data;
        if (newFreshToken) {
          tokenStorage.setItem("token", newFreshToken);
        }
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
          newFreshToken || refreshToken
        }`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        tokenStorage.removeItem("token");
        userStorage.removeItem("users");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (error?.response?.status === 401) {
      //my all token expired
      tokenStorage.removeItem("token");
      userStorage.removeItem("users");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
