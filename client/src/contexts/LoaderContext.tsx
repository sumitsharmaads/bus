import React, { createContext, useContext, useState } from "react";
import { FullPageLoader } from "../common";

interface LoaderContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}
export const LoaderContext = createContext<LoaderContextType>({
  loading: false,
  setLoading: () => undefined,
});

export const LoaderContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoaderContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
      {loading && <FullPageLoader />}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderContextProvider");
  }
  return context;
};
