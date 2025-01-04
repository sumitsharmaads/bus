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
  address1: string;
  address2: string | undefined;
  city: string;
  state: string;
  pincode: string;
};
export type WebsiteInfoType = {
  constactEmail: [string];
  rentalEmail: [string];
  inqueryEmail: [string];
  whatsappNumber: string;
  phone: string;
  facebook: string;
  instagram: string;
  logo: {
    id: string;
    url: string;
  };
  preLogo: {
    id: string;
    url: string;
  } | null;
  supportEmail: string;
  brandname: string;
  contactAddress: AddressType;
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
