import { createStorage } from "../../db";
import { PersistStorageType } from "../types";

const socialDrawerState = createStorage<PersistStorageType>("drawer");

export const setSocialDrawerState = (data: PersistStorageType) =>
  socialDrawerState.setItem("drawer", data);

export const getSocialDrawerState = () => socialDrawerState.getItem("drawer");
