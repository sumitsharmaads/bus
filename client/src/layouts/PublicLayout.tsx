import React from "react";
import { Outlet } from "react-router-dom";
import { Icon, SocialDrawer } from "../common";
import { WhatsappIcon, FacebookIcon, Instagram } from "../svg";
import { Header } from "../components";

export const PublicLayout: React.FC = () => {
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
