export type UserInfoType = {
  firtName: string;
  lastName: string;
  email: string;
  username: string;
  id: string;
  role: number;
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
