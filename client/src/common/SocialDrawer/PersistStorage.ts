import { createStorage } from "../../db";
import { PersistStorageType } from "../types";

export const drawerStorage = createStorage<PersistStorageType>("drawer");

export const setSocialDrawerState = (data: PersistStorageType) =>
  drawerStorage.setItem("drawer", data);

export const getSocialDrawerState = () => drawerStorage.getItem("drawer");
