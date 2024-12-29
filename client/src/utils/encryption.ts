import CryptoJS from "crypto-js";

export const encryptData = (data: string): string => {
  const secretKey =
    process.env.REACT_APP_ENCRYPT_SECRET_TOKEN ||
    "katsmFy3mEkNBRGOjN9l0jKpwXDTqEyr";
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
  const secretKey =
    process.env.REACT_APP_ENCRYPT_SECRET_TOKEN ||
    "katsmFy3mEkNBRGOjN9l0jKpwXDTqEyr";
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
