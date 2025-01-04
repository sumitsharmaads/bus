import React from "react";
import { Outlet } from "react-router-dom";
import { SocialDrawer } from "../common";
import { WhatsappIcon, FacebookIcon, Instagram } from "../svg";
import { Header } from "../components";
import { useWebsite } from "../contexts/WebsiteProvider";
import { Footer } from "../components/Footer";

export const PublicLayout: React.FC = () => {
  const { websiteInfo } = useWebsite();
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <Footer />
      <SocialDrawer persistState={true}>
        <SocialDrawer.Item
          id={1}
          iconJSX={<WhatsappIcon />}
          link={{
            address: `https://wa.me/${
              websiteInfo?.whatsappNumber || "your-phone-number"
            }`,
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
        <SocialDrawer.Item
          id={2}
          iconJSX={<FacebookIcon />}
          link={{
            address: websiteInfo?.facebook || "https://facebook.com",
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
        <SocialDrawer.Item
          id={3}
          iconJSX={<Instagram />}
          link={{
            address: websiteInfo?.instagram || "https://instagram.com",
          }}
          className="bg-transparent hover:bg-transparent shadow-none"
        />
      </SocialDrawer>
    </div>
  );
};
