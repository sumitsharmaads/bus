import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

interface ISection {
  title: string;
  titleMain: string;
  details: string;
  priority: number;
  heading: string;
  keywords: string;
  metatags: string;
}

const AdminTouristPlaces = () => {
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [cityState, setCityState] = useState("");
  const [type, setType] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState("");
  const [sections, setSections] = useState<ISection[]>([]);

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        titleMain: "",
        details: "",
        priority: sections.length + 1,
        heading: "",
        keywords: "",
        metatags: "",
      },
    ]);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSectionChange = (
    index: number,
    field: keyof ISection,
    value: string | number
  ) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Tourist Place</h2>

      <TextField
        label="Place Name"
        fullWidth
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        className="mb-3"
      />
      <TextField
        label="Short Description"
        fullWidth
        multiline
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3"
      />
      <TextField
        label="Cities & State"
        fullWidth
        value={cityState}
        onChange={(e) => setCityState(e.target.value)}
        className="mb-3"
      />

      <TextField
        select
        label="Type"
        fullWidth
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mb-3"
      >
        {["Devotion", "Budget Friendly", "Adventures", "Family", "Group"].map(
          (option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
        )}
      </TextField>

      <TextField
        label="Nearby Places"
        fullWidth
        value={nearbyPlaces}
        onChange={(e) => setNearbyPlaces(e.target.value)}
        className="mb-3"
      />

      <h3 className="text-xl font-semibold mt-5">Dynamic Sections</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={addSection}
        startIcon={<Add />}
        className="mt-2 mb-4"
      >
        Add Section
      </Button>

      {sections.map((section, index) => (
        <Card key={index} className="mb-3">
          <CardContent>
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold">Section {index + 1}</h4>
              <IconButton color="error" onClick={() => removeSection(index)}>
                <Delete />
              </IconButton>
            </div>
            <TextField
              label="Title"
              fullWidth
              value={section.title}
              onChange={(e) =>
                handleSectionChange(index, "title", e.target.value)
              }
              className="mb-3"
            />
            <TextField
              label="Title Main"
              fullWidth
              value={section.titleMain}
              onChange={(e) =>
                handleSectionChange(index, "titleMain", e.target.value)
              }
              className="mb-3"
            />
            <TextField
              label="Details"
              fullWidth
              multiline
              rows={3}
              value={section.details}
              onChange={(e) =>
                handleSectionChange(index, "details", e.target.value)
              }
              className="mb-3"
            />
            <TextField
              label="Priority"
              type="number"
              fullWidth
              value={section.priority}
              onChange={(e) =>
                handleSectionChange(index, "priority", Number(e.target.value))
              }
              className="mb-3"
            />
            <TextField
              label="Heading"
              fullWidth
              value={section.heading}
              onChange={(e) =>
                handleSectionChange(index, "heading", e.target.value)
              }
              className="mb-3"
            />
            <TextField
              label="Keywords"
              fullWidth
              value={section.keywords}
              onChange={(e) =>
                handleSectionChange(index, "keywords", e.target.value)
              }
              className="mb-3"
            />
            <TextField
              label="Meta Tags"
              fullWidth
              value={section.metatags}
              onChange={(e) =>
                handleSectionChange(index, "metatags", e.target.value)
              }
              className="mb-3"
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminTouristPlaces;
