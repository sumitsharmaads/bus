import { createContext, useContext, useEffect, useState } from "react";
import { UserInfoType } from "../types";
import User from "../utils/User";
import { useNavigate } from "react-router-dom";
import { get } from "../service";
import { useWebsite } from "./WebsiteProvider";
import { FullPageLoader } from "../common";
import { tokenExpiryStorage } from "../db";

type AuthContextType = {
  state: UserInfoType | null;
  updateUserInfo: (user: Partial<UserInfoType>) => void;
  login: (user: UserInfoType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  state: null,
  updateUserInfo: () => undefined,
  login: () => undefined,
  logout: () => undefined,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { websiteInfo } = useWebsite();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfoType | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * Utility: Calculates time difference in milliseconds
   */
  const calculateRemainingTime = (): number => {
    const storedExpiration = tokenExpiryStorage.getItem("");
    if (storedExpiration) {
      const expirationDate = new Date(storedExpiration).getTime();
      const currentTime = Date.now();
      return expirationDate - currentTime; // Remaining time in ms
    }
    return 0;
  };

  /**
   * Function: Refresh Access Token
   */
  const refreshAccessToken = async () => {
    if (isRefreshing) return; // Prevent overlapping calls
    setIsRefreshing(true);

    try {
      const response = await get<{
        result: {
          token: string;
          expiryTime: string;
        };
      }>("auth/refresh-token");

      if (response.data.result.token) {
        tokenExpiryStorage.setItem("", response.data.result.expiryTime);
        updateUserInfo({ token: response.data.result.token });
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  /**
   * Function: Start a timer to check remaining time
   */
  const startTokenCheckTimer = () => {
    const timer = setInterval(() => {
      const remainingTime = calculateRemainingTime();
      if (remainingTime <= 10000) {
        console.log("this is called");
        // Call refresh token if time is less than or equal to 10 seconds
        refreshAccessToken();
      }
    }, 1000);

    return timer;
  };

  /**
   * Function: Handle visibility changes
   */
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      const remainingTime = calculateRemainingTime();
      if (remainingTime <= 10000) {
        console.log("this is called beacuse visisble");
        refreshAccessToken();
      }
    }
  };

  /**
   * useEffect: Initialize timer and event listeners
   */
  useEffect(() => {
    if (User.isLogin) {
      console.log("this is called beacuse useEffect");
      const timer = startTokenCheckTimer(); // Start the timer for periodic checks

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        clearInterval(timer); // Cleanup timer on unmount
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }
  }, [User.isLogin]);

  /**
   * useEffect: Set user state on initial load
   */
  useEffect(() => {
    setUser(User.user ? { ...User.user, token: "" } : null);
  }, []);

  /**
   * Function: Login user and start timer
   */
  const login = (user: UserInfoType) => {
    setUser({ ...user, token: "" });
    User.loginUser(user);
    const timer = startTokenCheckTimer();
    return () => clearInterval(timer); // Cleanup on logout
  };

  /**
   * Function: Logout user and cleanup
   */
  const logout = () => {
    User.logout();
    setUser(null);
    tokenExpiryStorage.removeItem("");
    navigate("/");
  };

  /**
   * Function: Update user info
   */
  const updateUserInfo = (info: Partial<UserInfoType>) => {
    if (user) {
      setUser({ ...user, ...info });
    } else {
      setUser(info as any);
    }
    User.updateUserInfo(info);
  };

  if (!websiteInfo) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        state: user,
        login,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};
