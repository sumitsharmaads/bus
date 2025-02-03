import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Container } from "@mui/material";
import { Save } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { get, post } from "../../service";

const TermsAdminPage: React.FC = () => {
  const [terms, setTerms] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await get<{ data: { text: string } }>("terms");
      setTerms(response.data?.data?.text || "");
    } catch (error) {
      console.error("Error fetching terms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (value: string) => {
    setTerms(value);
  };

  const handleSave = async () => {
    try {
      const response = await post<{ data: { text: string } }>("terms/update", {
        text: terms,
      });
      setTerms(response?.data?.data?.text);
    } catch (error) {
      console.error("Error saving terms:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edit Terms & Conditions
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Box mt={2}>
              <ReactQuill
                theme="snow"
                value={terms}
                onChange={handleTextChange}
                style={{ width: "100%" }}
              />
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="success"
                startIcon={<Save />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default TermsAdminPage;
