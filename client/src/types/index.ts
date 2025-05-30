import { string } from "prop-types";

export type UserInfoType = {
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  _id: string;
  roleType: number;
  token: string;
  username: string;
};
type AddressType = {
  city: string;
  state: string;
  pincode: string;
  address1: string;
  address2: string;
};
export type WebsiteInfoType = {
  id: string;
  phone: string;
  logo: {
    id: string;
    url: string;
  } | null;
  preLogo: {
    id: string;
    url: string;
  } | null;
  brandname: string;
  contactAddress: AddressType;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    phone: string;
  } | null;
  emails: {
    supportEmail: string;
  } | null;
};

export type TokenType = {
  accessToken: string;
};

export type AddUpRequestTypes = {
  setLoading?: (status: boolean) => void;
  showSuccess?: boolean;
  successMessage?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type SignInType = {
  email: string;
  name: string;
  password: string;
};

export type ErrorResponse = {
  success: false;
  status: 400 | 401 | 403 | 404 | 500;
  message: string;
};

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export interface SEOInterface {
  _id?: string;
  route: string;
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  url?: string;
}
