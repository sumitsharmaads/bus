import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import {
  ContactFormStateType,
  LocalServiceType,
  OutStationServiceType,
} from "../types/forms";

type Step1StateType = LocalServiceType | OutStationServiceType | undefined;
type step2StateType = ContactFormStateType | undefined;
type RenetalServiceContextType = {
  state: {
    1: Step1StateType;
    2: step2StateType;
  };
  steps: number;
  busService: "local" | "outstation" | null;
  onChange: (
    step: 1 | 2,
    data: LocalServiceType | OutStationServiceType | ContactFormStateType
  ) => void;
  changeStep: Dispatch<SetStateAction<number>>;
  changeBusService: Dispatch<SetStateAction<"local" | "outstation" | null>>;
};

export const RentalServiceContext = createContext<RenetalServiceContextType>({
  state: {
    1: undefined,
    2: undefined,
  },
  onChange: () => undefined,
  steps: 1,
  changeStep: () => undefined,
  busService: null,
  changeBusService: () => undefined,
});

export const RentalServiceContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [busService, setBusService] = useState<"local" | "outstation" | null>(
    null
  );
  const [state, setState] = useState<RenetalServiceContextType["state"]>({
    1: undefined,
    2: undefined,
  });
  const [steps, setSteps] = useState<number>(1);
  const onChange = (
    step: 1 | 2,
    data: LocalServiceType | OutStationServiceType | ContactFormStateType
  ) => {
    setState((prevState) => {
      return {
        ...prevState,
        [step]: data,
      };
    });
  };

  return (
    <RentalServiceContext.Provider
      value={{
        state,
        onChange,
        steps: steps,
        changeStep: setSteps,
        busService,
        changeBusService: setBusService,
      }}
    >
      {children}
    </RentalServiceContext.Provider>
  );
};

export const useRentalServiceContext = () => {
  const context = useContext(RentalServiceContext);
  if (!context) {
    throw new Error(
      "useRentalServiceContext must be used within RentalServiceContextProvider"
    );
  }
  return context;
};
