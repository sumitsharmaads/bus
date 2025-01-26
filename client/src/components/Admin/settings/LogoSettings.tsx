import React, { useState, useMemo, useEffect } from "react";
import { WebsiteSettings } from "../../../pages/admin/Setttings";
import { post } from "../../../service";

const LogoSettings: React.FC<{
  settings: WebsiteSettings;
  onSave: (updatedSettings: WebsiteSettings) => void;
}> = ({ settings, onSave }) => {
  const [logoUrl, setLogoUrl] = useState(settings.logo);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setLogoUrl(settings.logo);
  }, [settings.logo]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WebsiteSettings
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", file);
      const response = await post<any>("images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.data) {
        console.log("response.data.data", response.data.data);
        setLogoUrl({
          url: response.data.data?.url,
          id: response.data.data?.public_id,
        });
      }
    } catch (error) {}
  };

  const saveChanges = () => {
    onSave({ logo: logoUrl } as any);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const memoizedLogos = useMemo(() => {
    return (
      <div>
        {/* Logo */}
        <div>
          <label>Logo</label>
          {isEditing ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "logo")}
            />
          ) : (
            <img
              src={logoUrl?.url || ""}
              alt="Logo"
              className="h-16 w-16 rounded-md object-cover"
            />
          )}
        </div>

        {/* PreLogo logic is similar */}
      </div>
    );
  }, [isEditing, settings]);

  return (
    <div>
      {memoizedLogos}
      <div className="flex justify-end">
        {isEditing ? (
          <>
            <button onClick={saveChanges} className="px-4 py-2 bg-green-500">
              Save
            </button>
            <button onClick={cancelEdit} className="px-4 py-2 bg-gray-300">
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(LogoSettings);
