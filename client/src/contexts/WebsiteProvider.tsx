import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import io from "socket.io-client";
import { domain } from "../api/axiosInstance";
import { websiteStorage } from "../db";
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
    const _websiteInfo = websiteStorage.getItem("website");
    if (_websiteInfo) setWebsiteInfo(_websiteInfo);
    else fetchWebsiteInfo();
  }, []);

  const url = useMemo(() => {
    return domain?.split("/api")[0];
  }, []);

  const socket = useMemo(() => {
    return io(url, {
      transports: ["websocket"],
    });
  }, [url]);

  const fetchWebsiteInfo = async () => {
    try {
      const response = await get<{ result: WebsiteInfoType }>("config");
      if (response.data.result) {
        setWebsiteInfo(response.data.result);
        websiteStorage.setItem("website", response.data.result);
      } else {
        setWebsiteInfo(null);
        websiteStorage.setItem("website", null);
      }
    } catch (error) {
      console.error("Error fetching website info", error);
    }
  };

  useEffect(() => {
    if (!websiteInfo) return;

    socket.on("website-updated", (updatedInfo: WebsiteInfoType) => {
      setWebsiteInfo(updatedInfo);
      websiteStorage.setItem("website", updatedInfo);
    });

    return () => {
      socket.disconnect();
    };
  }, [websiteInfo, socket]);

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
