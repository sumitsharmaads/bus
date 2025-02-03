import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Container,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add, Delete, Save, ExpandMore } from "@mui/icons-material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { get, post } from "../../service";

interface FAQ {
  question: string;
  answer: string;
}

const FAQsAdminPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(false);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await get<{
        data: {
          questions: FAQ[];
        };
      }>("faqs");
      setFaqs(response.data.data?.questions || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleDeleteFAQ = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updatedFAQs = [...faqs];
    updatedFAQs[index][field] = value;
    setFaqs(updatedFAQs);
  };

  const handleAccordionChange = (index: number) => {
    setExpandedIndex(expandedIndex === index ? false : index);
  };

  const handleTextFieldClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents the accordion from collapsing when typing
  };

  const handleSave = async () => {
    try {
      const updatedData = await post<{
        data: {
          questions: FAQ[];
        };
      }>("faqs/update", { questions: faqs });
      console.log("updatedData", updatedData.data.data.questions);
    } catch (error) {
      console.error("Error saving FAQs:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Manage FAQs
        </Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expandedIndex === index}
                onChange={() => handleAccordionChange(index)}
                sx={{ marginBottom: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <TextField
                    fullWidth
                    label="Question"
                    value={faq.question}
                    onClick={handleTextFieldClick} // Stops event from propagating
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                    variant="outlined"
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <ReactQuill
                    value={faq.answer}
                    onChange={(value) =>
                      handleInputChange(index, "answer", value)
                    }
                    theme="snow"
                    style={{ minHeight: "120px" }}
                  />
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteFAQ(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
            <Box mt={3} display="flex" gap={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                onClick={handleAddFAQ}
              >
                Add FAQ
              </Button>
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

export default FAQsAdminPage;
