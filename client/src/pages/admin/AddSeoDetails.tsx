import { Textarea } from "@material-tailwind/react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { routeOptions } from "../../utils/constant";
import { useParams } from "react-router-dom";
import { AdminSEOInterface } from "./AdminSEODetailsList";
import { Clear, Search } from "@mui/icons-material";
import { get, post, put } from "../../service";
import { useLoader } from "../../contexts/LoaderContext";

const AddSEODetails = () => {
  const { id } = useParams();
  const { setLoading } = useLoader();
  const [seo, setSeo] = useState<AdminSEOInterface>({
    route: "",
    title: "",
  });

  useEffect(() => {
    if (id) {
      fetchSEOData();
    }
  }, [id]);

  const fetchSEOData = async () => {
    try {
      const data = await get<{
        success: boolean;
        data: AdminSEOInterface;
      }>(`seo/${id}`);
      if (data.data.data) {
        setSeo(data.data.data);
      }
    } catch (error) {
      //
    }
  };

  const addUpdateSeo = async () => {
    if (id) {
      await put(
        `seo/${id}`,
        seo,
        {},
        {
          setLoading,
          showSuccess: true,
          successMessage: "Data updated successfully",
        }
      );
    } else {
      const data = await post(
        "seo",
        seo,
        {},
        {
          setLoading,
          showSuccess: true,
          successMessage: "Data saved successfully",
        }
      );
      if (data.data) {
        setSeo(() => ({
          route: "",
          title: "",
          keywords: "",
          description: "",
        }));
      }
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setSeo((prev) => ({ ...prev, [e.target.name]: e.target.value ?? "" }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSeo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Add or Edit SEO Details
      </h1>
      <div className="grid gap-6">
        <section className=" p-6 rounded-lg shadow-md">
          <Grid container spacing={2}>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel>Routes</InputLabel>
                <Select
                  name="route"
                  value={seo.route ?? ""}
                  onChange={handleSelectChange}
                  disabled={Boolean(id)}
                >
                  <MenuItem value="">All Routes</MenuItem>
                  {Object.entries(routeOptions).map(([route, path]) => (
                    <MenuItem key={route} value={path}>
                      {route}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={seo.title}
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <Textarea
                label="Description"
                name="description"
                value={seo.description}
                onChange={handleChange}
                variant="outlined"
                rows={4}
              />
            </Grid>
            <Grid item className="mb-2" xs={12} sm={12} md={12}>
              <Textarea
                label="Keywords"
                name="keywords"
                value={seo.keywords ?? ""}
                onChange={handleChange}
                variant="outlined"
                rows={4}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search />}
              onClick={addUpdateSeo}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<Clear />}
              onClick={() => {
                if (id) fetchSEOData();
                else
                  setSeo({
                    route: "",
                    title: "",
                  });
              }}
            >
              Cancel
            </Button>
            {!id && (
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Clear />}
                onClick={() => {
                  setSeo({
                    route: "",
                    title: "",
                  });
                }}
              >
                Clear
              </Button>
            )}
          </Grid>
        </section>
      </div>
    </div>
  );
};

export default AddSEODetails;
