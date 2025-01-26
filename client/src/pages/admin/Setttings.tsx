import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  EmailSettings,
  GeneralSettings,
  LogoSettings,
  SocialMediaSettings,
} from "../../components/Admin/settings";
import { useWebsite } from "../../contexts/WebsiteProvider";
import { get, put } from "../../service";
import { SuccessResponse, WebsiteInfoType } from "../../types";

export type Address = {
  city: string;
  state: string;
  pincode: string;
  address1: string;
};

export type Logo = {
  url: string;
  id: string;
};

export type WebsiteSettings = Omit<WebsiteInfoType, "id"> & {
  emails: {
    infoEmails: string[];
    supportEmail: string;
  } | null;
};

export const AdminSettings: React.FC = () => {
  const { websiteInfo } = useWebsite();
  const [settings, setSettings] = useState<WebsiteSettings>({
    logo: null,
    preLogo: null,
    emails: null,
    contactAddress: {
      city: "",
      state: "",
      pincode: "",
      address1: "",
      address2: "",
    },
    phone: "",
    brandname: "",
    socialLinks: null,
  });

  const info = useMemo(() => settings, [settings]);
  const fetchOnce = useRef(false); // Flag to ensure the API call happens only once

  const handleSaveChanges = useCallback(
    async (
      updatedSettings: any,
      type: "logo" | "email" | "general" | "social links"
    ) => {
      let webInfo: WebsiteSettings = { ...settings };

      switch (type) {
        case "email":
          webInfo = {
            ...webInfo,
            emails: {
              ...webInfo.emails, // Preserve existing email fields
              ...updatedSettings.emails,
            },
          };
          break;

        case "logo":
          webInfo = {
            ...webInfo,
            logo: {
              ...(webInfo.logo || {}),
              ...(updatedSettings.logo || {}),
            },
            preLogo: {
              ...(webInfo.preLogo || {}),
              ...(updatedSettings.preLogo || {}),
            },
          };
          break;

        case "general":
          webInfo = {
            ...webInfo,
            ...updatedSettings,
            contactAddress: {
              ...webInfo.contactAddress,
              ...updatedSettings.contactAddress,
            },
          };
          break;

        case "social links":
          webInfo = {
            ...webInfo,
            socialLinks: {
              ...(webInfo.socialLinks || {}),
              ...(updatedSettings.socialLinks || {}),
            },
          };
          break;

        default:
          console.warn(`Unknown update type: ${type}`);
          return;
      }

      try {
        const response = await put<{ data: WebsiteSettings }>(
          `config/${websiteInfo?.id}`,
          webInfo
        );
        if (response.data.data) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error("Error saving settings:", error);
      }
    },
    [settings, websiteInfo?.id]
  );

  const getWebsiteInfo = async () => {
    try {
      const response = await get<SuccessResponse<WebsiteSettings>>(
        `config/${websiteInfo?.id}`
      );
      if (response.data.data) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching website info:", error);
    }
  };

  useEffect(() => {
    if (websiteInfo?.id && !fetchOnce.current) {
      fetchOnce.current = true; // Prevent further calls
      getWebsiteInfo();
    }
  }, [websiteInfo?.id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Admin Settings
      </h1>

      <div className="grid gap-6">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Email Settings
          </h2>
          <EmailSettings
            emails={info.emails}
            onSave={(data) => handleSaveChanges(data, "email")}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Logo Settings
          </h2>
          <LogoSettings
            settings={info}
            onSave={(data) => handleSaveChanges(data, "logo")}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            General Settings
          </h2>
          <GeneralSettings
            settings={info}
            onSave={(data) => handleSaveChanges(data, "general")}
          />
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Social Media Settings
          </h2>
          <SocialMediaSettings
            socialLinks={info.socialLinks}
            onSave={(data) => handleSaveChanges(data, "social links")}
          />
        </section>
      </div>
    </div>
  );
};
