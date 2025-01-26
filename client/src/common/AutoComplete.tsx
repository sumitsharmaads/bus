import { Input } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { classNameOrEmptyString } from "../utils";
import { color } from "./types";

interface DefaultOption {
  name: string;
  value: string;
}
interface AutoComplete<T = DefaultOption> {
  label?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  name?: string;
  defaultOptions?: T[];
  field?: (data: T) => React.ReactNode;
  handleSearch?: (
    input: string,
    setOptions: Dispatch<SetStateAction<T[] | undefined>>
  ) => void;
  handleSelect: (data: T, setValue: Dispatch<SetStateAction<string>>) => void;
  color?: color;
  defaultValue?: string;
  handleBlur?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputSelectionFlag?: boolean
  ) => void;
}
export function AutoComplete<TOptions = DefaultOption>({
  wrapperClassName,
  inputClassName,
  defaultOptions,
  field,
  handleSelect,
  handleSearch,
  name = "",
  label = "",
  color = "blue",
  handleBlur,
  defaultValue,
}: AutoComplete<TOptions>): React.ReactElement {
  const [value, setValue] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState<TOptions[] | undefined>([]);
  const [inputSelection, setInputSelection] = useState(false);

  useEffect(() => {
    setOptions(defaultOptions);
  }, [defaultOptions]);

  const handleSearh = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = event.target.value;
    setShowDropdown(() => (_value.length >= 3 ? true : false));
    if (_value.length >= 3) {
      handleSearch?.(_value, setOptions);
    }
    if (_value === "" || _value.length < 3) {
      setOptions([]);
    }
    setInputSelection(false);
  };
  const handleChange = useDebounce(handleSearh, 500);

  const renderOptions = (option: DefaultOption) => option.name;

  const onselect = (option: TOptions) => {
    setInputSelection(true);
    setShowDropdown(false);
    handleSelect?.(option, setValue);
  };
  return (
    <div
      className={`relative w-full ${classNameOrEmptyString(wrapperClassName)}`}
    >
      <Input
        name={name}
        label={label}
        id={name}
        crossOrigin={""}
        className={`z-1 ${classNameOrEmptyString(inputClassName)}`}
        required={true}
        value={value}
        type="search"
        color={"blue"}
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e);
        }}
        onBlur={(e) => handleBlur?.(e, inputSelection)}
      />
      {showDropdown && options && options.length > 0 && (
        <ul className="z-50 absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => onselect(option)}
              className="z-50 flex d-flex border-blue-gray-50 border-b pl-1 pr-1"
            >
              {!field ? renderOptions(option as DefaultOption) : field(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
