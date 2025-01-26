import React from "react";
import { SocialDrawer } from "../common";
import { FacebookIcon, Instagram, WhatsappIcon } from "../svg";
import { useWebsite } from "../contexts/WebsiteProvider";

export const SocialFixedDrawer: React.FC = () => {
  const { websiteInfo } = useWebsite();
  return (
    <SocialDrawer persistState={true}>
      <SocialDrawer.Item
        id={1}
        iconJSX={<WhatsappIcon />}
        link={{
          address: `https://wa.me/${
            websiteInfo?.socialLinks?.phone
              ? encodeURIComponent(websiteInfo?.socialLinks?.phone)
              : "your-phone-number"
          }`,
        }}
        className="bg-transparent hover:bg-transparent shadow-none"
      />
      <SocialDrawer.Item
        id={2}
        iconJSX={<FacebookIcon />}
        link={{
          address: websiteInfo?.socialLinks?.facebook || "https://facebook.com",
        }}
        className="bg-transparent hover:bg-transparent shadow-none"
      />
      <SocialDrawer.Item
        id={3}
        iconJSX={<Instagram />}
        link={{
          address:
            websiteInfo?.socialLinks?.instagram || "https://instagram.com",
        }}
        className="bg-transparent hover:bg-transparent shadow-none"
      />
    </SocialDrawer>
  );
};
