import { Dispatch, SetStateAction } from "react";
import { post } from "../../../service";
import { AutoComplete } from "../../../common";
import { MapPinIcon } from "@heroicons/react/20/solid";

type OptionType = {
  name: string;
  state: string;
};

export const SearchPlaces: React.FC<{
  handleChange: (name: any, value: string) => void;
  value: string;
  name: string;
  label: string;
  className: string;
}> = ({ handleChange, value, name, label, className }) => {
  const handlePlaceSearch = async (
    value: string,
    setOptions: Dispatch<SetStateAction<OptionType[] | undefined>>
  ) => {
    try {
      const response = await post<{
        result: {
          result: OptionType[];
        };
      }>("places/cities", {
        condition: {
          search: { name: value },
        },
      });
      if (response?.data?.result?.result) {
        setOptions(response.data.result.result || []);
      } else {
        setOptions([]);
      }
    } catch (error) {
      setOptions([]);
    }
  };

  return (
    <AutoComplete<OptionType>
      label={label}
      name={name}
      handleSelect={(data) => handleChange(name, data.name)}
      defaultOptions={[]}
      handleSearch={handlePlaceSearch}
      defaultValue={value}
      inputClassName={className}
      field={(option) => (
        <div className="col flex items-center">
          <MapPinIcon className="mr-2 text-gray-500 h-3" />
          <div>
            <h5 className="row text-base">{option.name}</h5>
            <p className="row text-xs">{option.state}</p>
          </div>
        </div>
      )}
    />
  );
};
