// GoogleMapProvider.tsx
import React, { ReactNode } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapProviderProps {
  children: ReactNode;
}

export const GoogleMapProvider: React.FC<GoogleMapProviderProps> = ({
  children,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};
