import React, { useState, useMemo, useEffect } from "react";
import { WebsiteSettings } from "../../../pages/admin";

const GeneralDetails: React.FC<{
  settings: WebsiteSettings;
  onSave: (updatedSettings: WebsiteSettings) => void;
}> = ({ settings, onSave }) => {
  const [tempSettings, setTempSettings] = useState<WebsiteSettings>(settings);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTempSettings(settings);
  }, [settings]);
  const handleNestedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WebsiteSettings["contactAddress"]
  ) => {
    setTempSettings((prev) => ({
      ...prev,
      contactAddress: {
        ...prev.contactAddress,
        [field]: e.target.value,
      },
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof WebsiteSettings
  ) => {
    setTempSettings((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const saveChanges = () => {
    onSave(tempSettings);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const memoizedDetails = useMemo(() => {
    return (
      <div>
        {/* Contact Address */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Contact Address</label>
          {isEditing ? (
            <>
              <input
                type="text"
                placeholder="Address Line 1"
                value={tempSettings.contactAddress?.address1 || ""}
                onChange={(e) => handleNestedChange(e, "address1")}
                className="block w-full mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Address Line 2"
                value={tempSettings.contactAddress?.address2 || ""}
                onChange={(e) => handleNestedChange(e, "address2")}
                className="block w-full mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="City"
                value={tempSettings.contactAddress?.city || ""}
                onChange={(e) => handleNestedChange(e, "city")}
                className="block w-full mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="State"
                value={tempSettings.contactAddress?.state || ""}
                onChange={(e) => handleNestedChange(e, "state")}
                className="block w-full mt-1 p-2 border rounded-md"
              />
              <input
                type="text"
                placeholder="Pincode"
                value={tempSettings.contactAddress?.pincode || ""}
                onChange={(e) => handleNestedChange(e, "pincode")}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            </>
          ) : (
            <p>
              {settings.contactAddress?.address1},{" "}
              {settings.contactAddress?.address2},{" "}
              {settings.contactAddress?.city}, {settings.contactAddress?.state}{" "}
              - {settings.contactAddress?.pincode}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone Number</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings.phone || ""}
              onChange={(e) => handleInputChange(e, "phone")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{settings.phone}</p>
          )}
        </div>

        {/* Brand Name */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Brand Name</label>
          {isEditing ? (
            <input
              type="text"
              value={tempSettings.brandname || ""}
              onChange={(e) => handleInputChange(e, "brandname")}
              className="block w-full mt-1 p-2 border rounded-md"
            />
          ) : (
            <p>{settings.brandname}</p>
          )}
        </div>
      </div>
    );
  }, [isEditing, settings, tempSettings]);

  return (
    <div>
      {memoizedDetails}
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

export default React.memo(GeneralDetails);
