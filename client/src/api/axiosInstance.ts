import axios, { AxiosError } from "axios";
import User from "../utils/User";

export const domain = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: domain,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    request.withCredentials = true;
    const accessToken = User.getToken();
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
        const refreshToken = User.getToken();
        const response = await axios.get(`${domain}auth/refresh-token`);
        const { token: newFreshToken } = response?.data?.result;
        if (newFreshToken) {
          User.updateUserInfo({ token: newFreshToken });
        }
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${
          newFreshToken || refreshToken
        }`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        User.logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (error?.response?.status === 401) {
      User.logout();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
