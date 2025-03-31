import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoader } from "../../../../contexts/LoaderContext";
import {
  BasicTourInterface,
  TourTravelsActionsType,
  TourTravelType,
} from "../../types";
import { useCreateTours } from "../../../../contexts/TourTravelProvider";
import { post } from "../../../../service";
import { Input } from "@material-tailwind/react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { getTourDayNight } from "../../../../utils";
import { ArrowForward, Save } from "@mui/icons-material";

const getBasicDefaults = (
  input?: Partial<BasicTourInterface>
): BasicTourInterface => ({
  tourname: input?.tourname ?? "",
  minfair: input?.minfair ?? 0,
  startDate: input?.startDate ?? null,
  endDate: input?.endDate ?? null,
  capacity: input?.capacity ?? 0,
  inclusive: input?.inclusive ?? [],
  type: input?.type ?? [],
  days: input?.days,
  night: input?.night,
  description: input?.description,
});

export const BasicTour = () => {
  const { setLoading } = useLoader();
  const { state, dispatch, isEdit } = useCreateTours();
  const [basicDetails, setBasicDetails] = useState<BasicTourInterface>(
    getBasicDefaults(state.tours || {})
  );

  useEffect(() => {
    if (basicDetails.startDate && basicDetails.endDate) {
      const { days, nights } = getTourDayNight(
        basicDetails.startDate,
        basicDetails.endDate
      );
      setBasicDetails((prev) => ({
        ...prev,
        days,
        night: nights,
      }));
    }
  }, [basicDetails.startDate, basicDetails.endDate]);

  const handleOnchange = useCallback(
    (name: keyof BasicTourInterface, value: any) => {
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
              url: response.data.data?.url,
              id: response.data.data?.public_id,
            },
          }));
        }
      } catch (error) {}
    },
    []
  );

  const calculateDaysNights = useMemo(() => {
    if (basicDetails.startDate && basicDetails.endDate) {
      const { label } = getTourDayNight(
        basicDetails.startDate,
        basicDetails.endDate
      );
      return label;
    }
    return "0 Days / 0 Nights";
  }, [basicDetails.startDate, basicDetails.endDate]);

  const handleToggleChange = (
    index: number,
    value: string,
    key: "inclusive" | "type"
  ) => {
    const data = basicDetails[key];
    const tempData = data.includes(value)
      ? data.filter((v) => v !== value)
      : [...data, value];
    setBasicDetails((prev) => ({ ...prev, [key]: tempData }));
  };

  const onNext = () => {
    dispatch({
      type: TourTravelsActionsType.BASIC_DETAILS,
      payload: basicDetails,
    });
  };

  const disableBtn = useMemo(() => {
    const { tourname, minfair, capacity, startDate, endDate, inclusive, type } =
      basicDetails;
    if (
      tourname &&
      minfair &&
      capacity &&
      startDate &&
      endDate &&
      inclusive?.length > 0 &&
      type?.length > 0
    )
      return false;
    else return true;
  }, [basicDetails]);
  return (
    <div className="container mx-auto p-6">
      <section className="bg-white p-6 rounded-lg shadow-md mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <Input
              crossOrigin=""
              className="bg-white"
              label="Tour Name (*)"
              color="blue"
              type="text"
              value={basicDetails.tourname}
              onChange={(e) => handleOnchange("tourname", e.target.value)}
            />
          </div>
          <div>
            <Input
              crossOrigin=""
              className="bg-white"
              label="Capacity (*)"
              color="blue"
              type="number"
              value={basicDetails.capacity}
              onChange={(e) => handleOnchange("capacity", e.target.value)}
            />
          </div>
          <div>
            <Input
              crossOrigin=""
              type="number"
              className="bg-white"
              value={basicDetails.minfair}
              onChange={(e) => handleOnchange("minfair", e.target.value)}
              label="Minimum Fare (*)"
              color="blue"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
            <label
              htmlFor="tour-description"
              className="text-sm font-semibold text-gray-700"
            >
              Tour Description <span className="text-red-500 text-base">*</span>
            </label>

            <TextField
              id="tour-description"
              fullWidth
              multiline
              variant="outlined"
              placeholder="Write about the tour here..."
              onChange={(e) => handleOnchange("description", e.target.value)}
              value={basicDetails.description || ""}
              InputProps={{
                inputComponent: TextareaAutosize,
                rows: 4,
                style: {
                  padding: "12px",
                  fontSize: "0.95rem",
                  fontFamily: "inherit",
                  borderRadius: "8px",
                },
              }}
            />

            <Typography
              variant="subtitle2"
              className="text-xs text-gray-500 italic"
            >
              Please limit your description to 90–100 words.
            </Typography>
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
                  crossOrigin="anonymous"
                />
              </div>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <Grid item xs={12} className="!bg-white" md={12} lg={12}>
              <Typography variant="subtitle2" gutterBottom>
                <b> Select Inclusive (*)</b>
              </Typography>
              {[
                "Transfer",
                "Flight",
                "Sightseeing",
                "Hotel",
                "Meal",
                "Bus",
                "Guide",
              ].map((facility, index) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      checked={basicDetails.inclusive.includes(facility)}
                      onChange={(e) =>
                        handleToggleChange(index, e.target.value, "inclusive")
                      }
                      value={facility}
                    />
                  }
                  label={facility}
                />
              ))}
            </Grid>
          </div>
          <div className="col-span-1 md:col-span-2">
            <Grid item xs={12} className="!bg-white">
              <Typography variant="subtitle2" gutterBottom>
                <b> Tour Type (*)</b>
              </Typography>
              {[
                "Family",
                "Adventure",
                "Devotional",
                "Group",
                "Hills",
                "Budget",
              ].map((facility, index) => (
                <FormControlLabel
                  key={facility}
                  control={
                    <Checkbox
                      checked={basicDetails.type.includes(facility)}
                      onChange={(e) =>
                        handleToggleChange(index, e.target.value, "type")
                      }
                      value={facility}
                    />
                  }
                  label={facility}
                />
              ))}
            </Grid>
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
        <Box display="flex" justifyContent="space-between" mt={3}>
          {/* Back aligned to the left */}
          <div></div>
          {/* Save and Next aligned to the right */}
          <Box display="flex" gap={1}>
            {isEdit && (
              <Button
                startIcon={<Save />}
                variant="contained"
                color="success"
                size="small"
                onClick={() => dispatch({ type: TourTravelsActionsType.NEXT })}
              >
                SKIP
              </Button>
            )}
            <Button
              endIcon={<ArrowForward />}
              variant="outlined"
              size="small"
              onClick={onNext}
              disabled={disableBtn}
            >
              Next
            </Button>
          </Box>
        </Box>
      </section>
    </div>
  );
};
