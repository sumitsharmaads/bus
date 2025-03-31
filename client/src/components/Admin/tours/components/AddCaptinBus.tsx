import { useEffect, useMemo, useState } from "react";
import { get, post } from "../../../../service";
import {
  CaptinType,
  MAIN_User,
  TourBusType,
  TourTravelsActionsType,
} from "../../types";
import { useCreateTours } from "../../../../contexts/TourTravelProvider";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { debounce } from "lodash";
import { ArrowBack, ArrowForward, Save } from "@mui/icons-material";

export const AddCaptinBus: React.FC = () => {
  const { state, dispatch } = useCreateTours();
  const [bus, setBus] = useState<TourBusType["bus"]>(state?.tours?.bus);
  const [captin, setCaptin] = useState<CaptinType["captin"]>(
    state?.tours?.captin
  );
  const [captinOptions, setCaptinOptions] = useState<CaptinType["captin"][]>(
    []
  );
  const [busOptions, setBusOptions] = useState<TourBusType["bus"][]>([]);

  useEffect(() => {
    void fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const condition = {
      isCount: false,
      items: 50,
      page: 1,
      search: {},
      roleTypes: 2,
    };
    const response = await post<{
      result: {
        count: number | null;
        users: CaptinType["captin"][];
      };
      status: number;
    }>("users/getAll", condition);
    if (response?.data?.result?.users) {
      setCaptinOptions(response.data.result.users);
    }
  };

  const handleBusSearch = debounce(async (query: string) => {
    try {
      const res = await get<{
        success: boolean;
        buses: TourBusType["bus"][];
      }>(`buses?q=${query}`);
      setBusOptions(res?.data?.buses || []);
    } catch (err) {
      console.error("Failed to fetch buses", err);
    }
  }, 300);

  const disableBtn = useMemo(() => !(bus?._id && captin?._id), [bus, captin]);
  return (
    <Box maxWidth="lg" mx="auto" px={2} py={4}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Assign Captain to Bus
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Autocomplete
                options={captinOptions}
                getOptionLabel={(option) =>
                  `${option?.fullname} ${option?.phone}`
                }
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option?.fullname
                      ?.toLowerCase()
                      ?.includes(inputValue.toLowerCase())
                  )
                }
                value={
                  captinOptions.find((u) => u?._id === captin?._id) || null
                }
                onChange={(event, newValue) => {
                  if (newValue) {
                    setCaptin(newValue);
                  } else {
                    setCaptin(undefined);
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Captain" fullWidth />
                )}
                isOptionEqualToValue={(option, value) =>
                  option?._id === value?._id
                }
              />
            </FormControl>
          </Grid>
          {captin?._id && (
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Captain Details
                </Typography>
                <Typography variant="body2">Name: {captin.fullname}</Typography>
                <Typography variant="body2">Phone: {captin.phone}</Typography>
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Autocomplete
              options={busOptions}
              getOptionLabel={(option) => `${option?.busNumber}`}
              value={bus}
              onChange={(event, newValue) => setBus(newValue || undefined)}
              onInputChange={(event, newInputValue) =>
                handleBusSearch(newInputValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search & Select Bus"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Grid>
          {bus?._id && (
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Bus Details
                </Typography>
                <Typography variant="body2">
                  Bus Number: {bus.busNumber}
                </Typography>
                <Typography variant="body2">Type: {bus.busType}</Typography>
                <Typography variant="body2">
                  Capacity: {bus.seatingCapacity}
                </Typography>
                <Typography variant="body2">
                  Facilities:{" "}
                  {Array.isArray(bus.facilities)
                    ? bus.facilities.join(", ")
                    : "-"}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
        <Box display="flex" justifyContent="space-between" mt={3}>
          {/* Back aligned to the left */}
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            size="small"
            onClick={() =>
              dispatch({
                type: TourTravelsActionsType.BACK,
              })
            }
          >
            Back
          </Button>

          {/* Save and Next aligned to the right */}
          <Box display="flex" gap={1}>
            <Button
              startIcon={<Save />}
              variant="contained"
              color="success"
              size="small"
              onClick={() =>
                dispatch({
                  type: TourTravelsActionsType.NEXT,
                })
              }
            >
              SKIP
            </Button>
            <Button
              endIcon={<ArrowForward />}
              variant="outlined"
              size="small"
              onClick={() =>
                dispatch({
                  type: TourTravelsActionsType.BUS_CAPTIN,
                  payload: { bus, captin },
                })
              }
              disabled={disableBtn}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
