import React, { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api"; // This hook will load the API

interface SelectedPlace {
  name: string;
  formatted_address: string;
}

export const AutoCompletePlaces: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null); // Reference to the input field
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(
    null
  );

  // UseJsApiLoader hook from @react-google-maps/api to load Google Maps API
  console.log(
    "process.env.REACT_APP_GOOGLE_API_KEY",
    process.env.REACT_APP_GOOGLE_API_KEY
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCc4C4R3CiaHm-dcczCiHhBc-vCW-f81No",
    libraries: ["places"], // Ensure that the places library is included
  });

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    // Initialize Autocomplete when the API is loaded
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["address_components", "geometry", "name", "formatted_address"],
        types: ["geocode"], // Restrict to geocode addresses
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setSelectedPlace({
          name: place.name || "N/A",
          formatted_address: place.formatted_address || "N/A",
        });
      }
    });

    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [isLoaded]);

  return (
    <div className="max-w-md mx-auto p-4">
      {isLoaded ? (
        <>
          {/* Input field for searching places */}
          <input
            ref={inputRef}
            type="text"
            className="w-full p-3 border border-blue-500 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a place"
          />
          {selectedPlace && (
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Selected Place</h3>
              <div className="bg-white p-4 shadow-md rounded-lg mt-2">
                <p className="text-lg">Name: {selectedPlace.name}</p>
                <p className="text-lg">
                  Address: {selectedPlace.formatted_address}
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
