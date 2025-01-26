import { TokenType, UserInfoType, WebsiteInfoType } from "../../types";
import { decryptData, encryptData } from "../../utils/encryption";

const storage = window.localStorage;

const createStorage = function createStorage<T>(subPrefix: string = "") {
  const prefix = `${subPrefix}`;
  return {
    getItem(itemName: string): T | null {
      const items = storage.getItem(`${prefix}_${itemName}`);
      if (items) {
        const decryptedData = decryptData(items);
        try {
          return JSON.parse(decryptedData) as T;
        } catch (e) {
          return null;
        }
      }
      return null;
    },
    setItem(itemName: string, value: T): void {
      const stringValue = JSON.stringify(value);
      const encryptedData = encryptData(stringValue);
      storage.setItem(`${prefix}_${itemName}`, encryptedData);
    },
    removeItem(itemName: string): void {
      storage.removeItem(`${prefix}_${itemName}`);
    },
  };
};

const DefaultStore = createStorage<unknown>("default");

export const tokenStorage = createStorage<TokenType>("token");
export const userStorage = createStorage<UserInfoType>("users");
export const websiteStorage = createStorage<WebsiteInfoType | null>("website");
export const tokenExpiryStorage = createStorage<string | null>("expiry");
export { createStorage };
export default DefaultStore;
