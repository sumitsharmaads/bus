import React, { createContext, useState } from "react";

type SignInType = {
  email: string;
  password: string;
};

type OtpType = {
  otp: number;
};
type SignInStateType = {
  login: SignInType | null;
  otp: OtpType | null;
  steps: number;
};

type SignInAddonFunctionsType = {
  handleStep: (num: number) => void;
  handleState: (key: "login" | "otp", state: SignInType | OtpType) => void;
};
export const SignInContext = createContext<
  SignInStateType & SignInAddonFunctionsType
>({
  login: null,
  otp: null,
  steps: 1,
  handleStep: () => undefined,
  handleState: () => undefined,
});

export const SignInContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<SignInStateType>({
    login: null,
    otp: null,
    steps: 1,
  });

  const handleStep = (num: number) =>
    setState((prev) => ({ ...prev, steps: num }));

  const handleState = (key: "login" | "otp", state: SignInType | OtpType) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: state,
      };
    });
  };

  return (
    <SignInContext.Provider
      value={{
        ...state,
        handleStep,
        handleState,
      }}
    >
      {children}
    </SignInContext.Provider>
  );
};
