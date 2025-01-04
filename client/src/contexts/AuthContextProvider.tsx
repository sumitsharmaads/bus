import { createContext, useContext, useEffect, useState } from "react";
import { UserInfoType } from "../types";
import User from "../utils/User";
import { useNavigate } from "react-router-dom";
import { setAuthHandlers } from "../api/axiosInstance";
import { get } from "../service";
import { useWebsite } from "./WebsiteProvider";
import { FullPageLoader } from "../common";
import { tokenExpiryStorage } from "../db";
import { parseExpirationToken } from "../utils";

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

  const refreshAccessToken = async () => {
    try {
      const response = await get<{
        result: {
          token: string;
        };
      }>("auth/refresh-token");
      if (response.data.result.token) {
        const expirationDuration = parseExpirationToken(
          process.env.REACT_APP_TOKEN_EXPIRY || "10m"
        );
        const expirationTime = Date.now() + expirationDuration;
        tokenExpiryStorage.setItem("", expirationTime);
        updateUserInfo({ token: response.data.result.token });
      }
    } catch (error) {}
  };

  const checkTokenExpiration = () => {
    const storedExpiration = tokenExpiryStorage.getItem("");
    if (storedExpiration) {
      const timeLeft = parseInt(storedExpiration.toString(), 10) - Date.now();
      if (timeLeft <= 0) {
        refreshAccessToken();
      }
    } else {
      refreshAccessToken();
    }
  };

  useEffect(() => {
    if (User.isLogin) {
      const intervalId = setInterval(() => {
        checkTokenExpiration();
      }, 30 * 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  useEffect(() => {
    setUser(User.user ? { ...User.user, token: "" } : null);
  }, []);

  const login = (user: UserInfoType) => {
    setUser({ ...user, token: "" });
    User.loginUser(user);
  };

  const logout = () => {
    User.logout();
    setUser(null);
    tokenExpiryStorage.removeItem("");
    navigate("/");
  };

  const updateUserInfo = (info: Partial<UserInfoType>) => {
    if (user) {
      setUser({ ...user, ...info });
    } else {
      setUser(info as any);
    }
    User.updateUserInfo(info);
  };
  useEffect(() => {
    setAuthHandlers(logout, updateUserInfo);
  }, []);

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
