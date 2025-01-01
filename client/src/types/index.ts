export type UserInfoType = {
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  _id: string;
  roleType: number;
  token: string;
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
