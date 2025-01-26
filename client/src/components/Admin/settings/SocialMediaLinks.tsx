import React, { useState, useMemo, useEffect } from "react";
import { WebsiteSettings } from "../../../pages/admin";

type SocialLinks = {
  facebook: string;
  instagram: string;
  twitter: string;
  phone: string;
} | null;

const SocialMediaLinks: React.FC<{
  socialLinks: SocialLinks;
  onSave: (updatedSettings: Partial<WebsiteSettings>) => void;
}> = ({ socialLinks, onSave }) => {
  const [tempSettings, setTempSettings] = useState<SocialLinks>(socialLinks);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTempSettings(socialLinks);
  }, [socialLinks]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof NonNullable<SocialLinks>
  ) => {
    setTempSettings((prev: any) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const saveChanges = () => {
    onSave({ socialLinks: tempSettings });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempSettings(socialLinks);
    setIsEditing(false);
  };

  const memoizedSocialLinks = useMemo(() => {
    return (
      <div>
        {/* Facebook */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Facebook</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings?.facebook}
              onChange={(e) => handleInputChange(e, "facebook")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{tempSettings?.facebook}</p>
          )}
        </div>

        {/* Instagram */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Instagram</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings?.instagram}
              onChange={(e) => handleInputChange(e, "instagram")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{tempSettings?.instagram}</p>
          )}
        </div>

        {/* Twitter */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Twitter</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings?.twitter}
              onChange={(e) => handleInputChange(e, "twitter")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{tempSettings?.twitter}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings?.phone}
              onChange={(e) => handleInputChange(e, "phone")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{tempSettings?.phone}</p>
          )}
        </div>
      </div>
    );
  }, [isEditing, tempSettings]);

  return (
    <div>
      {memoizedSocialLinks}
      <div className="flex justify-end mt-4">
        {isEditing ? (
          <>
            <button
              onClick={saveChanges}
              className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SocialMediaLinks);
