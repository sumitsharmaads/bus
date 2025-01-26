import React, { useEffect, useState } from "react";
import { WebsiteSettings } from "../../../pages/admin";

const FIELD_CONFIG: {
  [key: string]: { label: string; isArray: boolean };
} = {
  infoEmails: { label: "Info Emails", isArray: true },
  supportEmail: { label: "Support Email", isArray: false },
};

type Emails = {
  infoEmails: string[];
  supportEmail: string;
} | null;

const EmailSettings: React.FC<{
  emails: Emails;
  onSave: (updatedEmails: Partial<WebsiteSettings>) => void;
}> = ({ emails, onSave }) => {
  const [tempSettings, setTempSettings] = useState<Emails>(
    emails ?? { infoEmails: [], supportEmail: "" }
  );
  const [newEmail, setNewEmail] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const addEmail = () => {
    if (!tempSettings || !newEmail.trim()) return;

    setTempSettings({
      ...tempSettings,
      infoEmails: [...(tempSettings.infoEmails || []), newEmail.trim()],
    });

    setNewEmail("");
  };

  useEffect(() => {
    setTempSettings(emails);
  }, [emails]);

  const removeEmail = (index: number) => {
    if (!tempSettings) return;

    const updatedEmails = [...tempSettings.infoEmails];
    updatedEmails.splice(index, 1);

    setTempSettings({
      ...tempSettings,
      infoEmails: updatedEmails,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Emails
  ) => {
    if (!tempSettings) return;

    setTempSettings({
      ...tempSettings,
      [field]: e.target.value,
    });
  };

  const saveChanges = () => {
    onSave({ emails: tempSettings });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setTempSettings(emails ?? { infoEmails: [], supportEmail: "" });
    setNewEmail("");
    setIsEditing(false);
  };

  const renderFields = () => {
    return Object.entries(FIELD_CONFIG).map(([field, config]) => {
      const { label, isArray } = config;
      const fieldKey = field as keyof Emails;

      return (
        <div className="mb-4" key={field}>
          <label className="block font-semibold mb-1">{label}</label>
          {isEditing ? (
            isArray ? (
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter an email"
                    className="block w-full p-2 border rounded-md"
                  />
                  <button
                    onClick={addEmail}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>

                <ul className="mt-2">
                  {(tempSettings?.[fieldKey] as string[] | undefined)?.map(
                    (email, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-2"
                      >
                        <span>{email}</span>
                        <button
                          onClick={() => removeEmail(index)}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <input
                type="email"
                value={(tempSettings?.[fieldKey] || "") as string}
                onChange={(e) => handleInputChange(e, fieldKey)}
                className="block w-full mt-1 p-2 border rounded-md"
              />
            )
          ) : (
            <p>
              {isArray
                ? ((tempSettings?.[fieldKey] || []) as string[]).join(", ") ||
                  "No emails added yet"
                : ((tempSettings?.[fieldKey] || "") as string) || "Not set"}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {renderFields()}
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

export default React.memo(EmailSettings);
