import { Textarea } from "@material-tailwind/react";
import { Button, Grid, TextField, Box } from "@mui/material";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowBack,
  ArrowForward,
  Clear,
  Save,
  Search,
} from "@mui/icons-material";
import { SEOInformtionType, TourTravelsActionsType } from "../../types";
import { useCreateTours } from "../../../../contexts/TourTravelProvider";

const AddSEODetails = () => {
  const { state, dispatch } = useCreateTours();
  const [seo, setSeo] = useState<SEOInformtionType["seo"]>(
    state.tours?.seo || {
      title: "",
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSeo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isDisable = useMemo(
    () => !(seo?.title && seo?.keywords && seo?.description),
    [seo]
  );
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Add or Edit SEO Details
      </h1>
      <div className="grid gap-6">
        <section className=" p-6 rounded-lg shadow-md">
          <Grid container spacing={2}>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={seo?.title}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <Textarea
                label="Description"
                name="description"
                value={seo?.description}
                onChange={handleChange}
                variant="outlined"
                rows={4}
              />
            </Grid>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <Textarea
                label="Keywords"
                name="keywords"
                value={seo?.keywords ?? ""}
                onChange={handleChange}
                variant="outlined"
                rows={4}
              />
            </Grid>
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
                onClick={() => dispatch({ type: TourTravelsActionsType.NEXT })}
              >
                SKIP
              </Button>
              <Button
                endIcon={<ArrowForward />}
                variant="outlined"
                size="small"
                onClick={() =>
                  dispatch({
                    type: TourTravelsActionsType.SEO,
                    payload: { seo: seo },
                  })
                }
                disabled={isDisable}
              >
                Next
              </Button>
            </Box>
          </Box>
        </section>
      </div>
    </div>
  );
};

export default AddSEODetails;
