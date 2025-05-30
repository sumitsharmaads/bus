import { Checkbox, FormControlLabel, IconButton, Slider } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const BRAND_COLOR = "#C22A54";
const BRAND_COLOR_HOVER = "#A82046"; // Darker for hover
const BRAND_TEXT_COLOR = "#C22A54"; // For text
const BRAND_COLOR_ULTRALIGHT_HOVER = "#FCE7F3"; // Slightly darker light for hover (Tailwind pink-100)

const SidebarFilters: React.FC<{
  onApply?: () => void;
  onClear?: () => void;
}> = ({ onApply, onClear }) => {
  const tourTypes = ["Family", "Devotional", "Adventure", "Luxury"];
  const inclusions = ["Bus", "Hotel", "Meals", "Flight"];
  const [priceRange, setPriceRange] = useState<number[]>([2000, 15000]);
  const handlePriceChange = (event: Event, newValue: number | number[]) =>
    setPriceRange(newValue as number[]);

  return (
    <aside className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 sticky top-6">
      <div
        className="h-1.5 rounded-t-md -mt-5 -mx-5 mb-4"
        style={{ backgroundColor: BRAND_COLOR }}
      />
      <h3 className="text-lg font-semibold mb-5 text-gray-800">Filters</h3>
      {/* Tour Types */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">Tour Types</h4>
        <div className="space-y-0.5">
          {tourTypes.map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    "&.Mui-checked": { color: BRAND_COLOR },
                    p: "4px 8px 4px 0px",
                  }}
                />
              }
              label={<span className="text-xs text-gray-700">{type}</span>}
            />
          ))}
        </div>
      </div>
      {/* Inclusions */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-2 text-sm">Inclusions</h4>
        <div className="space-y-0.5">
          {inclusions.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    "&.Mui-checked": { color: BRAND_COLOR },
                    p: "4px 8px 4px 0px",
                  }}
                />
              }
              label={<span className="text-xs text-gray-700">{item}</span>}
            />
          ))}
        </div>
      </div>
      {/* Price Range */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-1 text-sm">Price Range</h4>
        <p className="text-xs text-gray-500 mb-2">
          ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
        </p>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={35000}
          step={500}
          size="small"
          sx={{
            color: BRAND_COLOR,
            "& .MuiSlider-thumb": { width: 14, height: 14 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
              backgroundColor: BRAND_COLOR_HOVER,
            },
          }}
        />
      </div>
      <div className="mb-5">
        <h4 className="font-medium text-gray-700 mb-1 text-sm">Duration</h4>
        <p className="text-xs text-gray-500 mb-2">
          {priceRange[0].toLocaleString()}N - {priceRange[1].toLocaleString()}N
        </p>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={15}
          step={500}
          size="small"
          sx={{
            color: BRAND_COLOR,
            "& .MuiSlider-thumb": { width: 14, height: 14 },
            "& .MuiSlider-valueLabel": {
              fontSize: "0.7rem",
              backgroundColor: BRAND_COLOR_HOVER,
            },
          }}
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClear}
          className={`text-sm font-medium px-5 py-1.5 rounded-lg border transition hover:bg-[${BRAND_COLOR_ULTRALIGHT_HOVER}]`}
          style={{ borderColor: BRAND_COLOR, color: BRAND_TEXT_COLOR }}
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="text-white text-sm px-5 py-1.5 rounded-lg transition-colors shadow-md hover:shadow-lg font-medium"
          style={{ backgroundColor: BRAND_COLOR }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = BRAND_COLOR)
          }
        >
          Apply
        </button>
      </div>
    </aside>
  );
};

const SlideInMobileFilter: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => (
  <div
    className={`fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
      open ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 border-b flex justify-between items-center">
      <h2 className="text-lg font-semibold" style={{ color: BRAND_TEXT_COLOR }}>
        Filter Tours
      </h2>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{ color: "text.secondary" }}
      >
        <CloseIcon />
      </IconButton>
    </div>
    <div className="overflow-y-auto p-4 h-[calc(100%-60px)]">
      <SidebarFilters onApply={onClose} onClear={() => {}} />
    </div>
  </div>
);

export { SidebarFilters, SlideInMobileFilter };
