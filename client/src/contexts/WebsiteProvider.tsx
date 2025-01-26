import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io from "socket.io-client";
import { domain } from "../api/axiosInstance";
import { websiteStorage, websiteStorageExpiry } from "../db";
import { WebsiteInfoType } from "../types";
import { get } from "../service";

type WebsiteContextType = { websiteInfo: WebsiteInfoType | null };
const WebsiteContext = createContext<WebsiteContextType>({
  websiteInfo: null,
});

export const WebsiteContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>(null);

  useEffect(() => {
    const loadWebsiteInfo = async () => {
      try {
        const cachedData = websiteStorage.getItem("website");
        const lastUpdated = websiteStorageExpiry.getItem("");
        const isDataValid = lastUpdated
          ? Date.now() - new Date(lastUpdated).getTime() < 45 * 60 * 1000
          : false;

        if (cachedData && isDataValid) {
          setWebsiteInfo(cachedData);
        } else {
          await fetchWebsiteInfo();
        }
      } catch (error) {
        console.error("Error loading website info:", error);
      }
    };

    loadWebsiteInfo();
  }, []);

  const fetchWebsiteInfo = async () => {
    try {
      const response = await get<{ result: WebsiteInfoType }>("config");
      if (response.data.result) {
        setWebsiteInfo(response.data.result);
        websiteStorage.setItem("website", response.data.result);
        websiteStorageExpiry.setItem("", new Date().toISOString());
      } else {
        setWebsiteInfo(null);
        websiteStorage.setItem("website", null);
        websiteStorageExpiry.removeItem("");
      }
    } catch (error) {
      console.error("Error fetching website info", error);
    }
  };

  return (
    <WebsiteContext.Provider value={{ websiteInfo }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used within a WebsiteContextProvider");
  }
  return context;
};
