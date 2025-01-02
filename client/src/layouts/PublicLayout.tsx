import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Icon, SocialDrawer } from "../common";
import { WhatsappIcon, FacebookIcon, Instagram } from "../svg";
import { Header } from "../components";
import User from "../utils/User";
import { get } from "../service";

export const PublicLayout: React.FC = () => {
  const refreshAccessToken = async () => {
    const response = await get("auth/refresh-token");
    console.log(response);
  };

  useEffect(() => {
    console.log("login useEffect");
    if (User.isLogin) {
      refreshAccessToken();
      const intervalId = setInterval(() => {
        refreshAccessToken();
      }, 1 * 60 * 1000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <SocialDrawer>
        <SocialDrawer.Item
          id={1}
          iconJSX={<WhatsappIcon />}
          link={{
            address: "https://wa.me/your-phone-number",
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
        <SocialDrawer.Item
          id={2}
          iconJSX={<FacebookIcon />}
          link={{
            address: "https://facebook.com",
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
        <SocialDrawer.Item
          id={3}
          iconJSX={<Instagram />}
          link={{
            address: "https://instagram.com",
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
      </SocialDrawer>
    </div>
  );
};
