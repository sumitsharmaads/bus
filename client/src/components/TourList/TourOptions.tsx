import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Tour } from "../../pages/TourDetailPage";

// Enhanced Brand Colors
const BRAND_COLOR = "#C22A54";
const BRAND_COLOR_HOVER = "#A82046"; // Darker for hover
const BRAND_TEXT_COLOR = "#C22A54"; // For text

// --- Tour Options Dialog ---
export const TourOptions: React.FC<{
  open: boolean;
  onClose: () => void;
  tourTitle: string;
  source?: Tour["source"];
  minFair: number | string;
}> = ({ open, onClose, tourTitle, source, minFair }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          minWidth: { xs: "90vw", sm: "380px" },
          m: 2,
        },
      }}
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-1">
          <h3
            className="text-lg font-semibold"
            style={{ color: BRAND_TEXT_COLOR }}
          >
            {tourTitle} - Options
          </h3>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: "text.secondary", mr: -1.5, mt: -1 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Select your preferred boarding location.
        </p>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {source?.map((option, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {option?.location?.name} {option?.location?.state}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {option?.onBoarding?.join(", ")}
                  </p>
                </div>
                {/* <button
                  className="text-xs text-white px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ml-2"
                  style={{ backgroundColor: BRAND_COLOR }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_COLOR_HOVER)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = BRAND_COLOR)
                  }
                >
                  Select
                </button> */}
              </div>
              {option.fare !== 0 && (
                <p
                  className={`text-xs mt-1 ${
                    option.fare > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {option.fare > 0
                    ? ` ₹${option.fare}`
                    : ` ₹${Math.abs(option.fare)}`}{" "}
                  / person
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};
