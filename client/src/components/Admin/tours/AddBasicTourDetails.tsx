import { Input } from "@material-tailwind/react";
import React, { useState, useCallback, useMemo } from "react";
import { SearchPlaces } from "./SearchPlaces";
import { post } from "../../../service";
import { useLoader } from "../../../contexts/LoaderContext";

type BasicDetailsType = {
  tourname: string;
  image: {
    url: string;
    id: string;
  } | null;
  minfair: number;
  startDate: string | null;
  endDate: string | null;
  source: string[];
  destination: string;
  places: string[];
};

export const AddBasicTourDetails = () => {
  const { setLoading } = useLoader();
  const [basicDetails, setBasicDetails] = useState<BasicDetailsType>({
    tourname: "",
    minfair: 0,
    image: null,
    startDate: null,
    endDate: null,
    source: [],
    destination: "",
    places: [],
  });
  console.log("hello");
  const handleOnchange = useCallback(
    (name: keyof BasicDetailsType, value: any) => {
      setBasicDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await post<any>("images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.data) {
          setBasicDetails((prev) => ({
            ...prev,
            image: {
              url: response.data.data?.secure_url,
              id: response.data.data?.public_id,
            },
          }));
        }
      } catch (error) {}
    },
    []
  );

  const handleRemoveFromList = useCallback(
    (name: "source" | "places", value: string) => {
      setBasicDetails((prev) => ({
        ...prev,
        [name]: prev[name].filter((item) => item !== value),
      }));
    },
    []
  );

  const calculateDaysNights = useMemo(() => {
    if (basicDetails.startDate && basicDetails.endDate) {
      const startDate = new Date(basicDetails.startDate);
      const endDate = new Date(basicDetails.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "0 Days / 0 Nights";
      }

      const differenceInTime = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
      const nights = days > 1 ? days - 1 : 0;

      return `${days} Days / ${nights} Nights`;
    }
    return "0 Days / 0 Nights";
  }, [basicDetails.startDate, basicDetails.endDate]);

  const saveChanges = async () => {
    try {
      await post(
        "tours",
        { ...basicDetails, duration: calculateDaysNights },
        {},
        { setLoading }
      );
    } catch (error) {}
  };

  const handleChange = useCallback(
    (name: "source" | "places" | "destination", value: string) => {
      if (name === "source" || name === "places") {
        setBasicDetails((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        setBasicDetails((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    []
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Tour Details
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            crossOrigin=""
            className="bg-white"
            label="Tour Name"
            color="blue"
            type="text"
            value={basicDetails.tourname}
            onChange={(e) => handleOnchange("tourname", e.target.value)}
          />
        </div>
        <div>
          <Input
            crossOrigin=""
            type="number"
            className="bg-white"
            value={basicDetails.minfair}
            onChange={(e) => handleOnchange("minfair", e.target.value)}
            label="Minimum Fare"
            color="blue"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Upload Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          {basicDetails.image?.url && (
            <div className="mt-4">
              <img
                src={basicDetails.image.url}
                alt="Tour Logo"
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>
        <div className="col-span-1 md:col-span-2">
          <SearchPlaces
            value={basicDetails.destination}
            handleChange={(name, value) => handleChange(name, value)}
            label="Destination"
            name="destination"
            className="bg-white"
          />
        </div>
        <div>
          <SearchPlaces
            value={""}
            handleChange={(name, value) => handleChange(name, value)}
            label="Source"
            name="source"
            className="bg-white"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {basicDetails.source &&
              basicDetails.source.length > 0 &&
              basicDetails.source.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 shadow-md"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveFromList("source", item)}
                    className="absolute top-0 -right-1 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div>
          <SearchPlaces
            value={""}
            handleChange={(name, value) => handleChange(name, value)}
            label="Places"
            name="places"
            className="bg-white"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {basicDetails.places &&
              basicDetails.places.length > 0 &&
              basicDetails.places.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 shadow-md"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveFromList("places", item)}
                    className="absolute top-0 -right-1 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div>
          <Input
            crossOrigin=""
            type="datetime-local"
            color="blue"
            label="Start Date"
            value={basicDetails.startDate || ""}
            onChange={(e) => handleOnchange("startDate", e.target.value)}
            className="bg-white"
          />
        </div>
        <div>
          <Input
            crossOrigin=""
            type="date"
            color="blue"
            label="Return Date"
            value={basicDetails.endDate || ""}
            onChange={(e) => handleOnchange("endDate", e.target.value)}
            className="bg-white"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Duration</label>
          <p>{calculateDaysNights}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={saveChanges}
          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};
