import axios, { AxiosError } from "axios";
import User from "../utils/User";
export const domain = process.env.REACT_APP_API_URL;

let logout: Function | null = null;
let updateUserInfo: Function | null = null;

const axiosInstance = axios.create({
  baseURL: domain,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const setAuthHandlers = (
  logoutHandler: Function,
  updateUserInfoHandler: Function
) => {
  logout = logoutHandler;
  updateUserInfo = updateUserInfoHandler;
};

// --- Refresh Token Queue ---
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

function onTokenRefreshed(token: string) {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
}

function addSubscriber(callback: (token: string) => void) {
  subscribers.push(callback);
}

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
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken: string) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
      isRefreshing = true;

      try {
        const refreshToken = User.getToken();
        const response = await axios.get(`${domain}auth/refresh-token`);
        const newToken = response?.data?.result?.token;
        if (newToken) {
          if (updateUserInfo) {
            updateUserInfo({ token: newToken });
          } else {
            User.updateUserInfo({ token: newToken });
          }
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newToken}`;
          isRefreshing = false;

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          throw new Error("No token received from refresh");
        }
      } catch (refreshError) {
        isRefreshing = false;
        if (logout) {
          logout();
        } else {
          User.logout();
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    if (error?.response?.status === 401) {
      isRefreshing = false;
      if (logout) {
        logout();
      } else {
        User.logout();
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
