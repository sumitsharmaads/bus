import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useMemo, useState, useCallback } from "react";
import { get } from "../service";
import DOMPurify from "dompurify";

interface FAQItem {
  question: string;
  answer: string; // rich text HTML
}

export const FaqAndTerms: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [terms, setTerms] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | false>(0);
  const [showAll, setShowAll] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [faqRes, termsRes] = await Promise.all([
        get<{
          data: {
            questions: FAQItem[];
          };
        }>("faqs"),
        get<{
          data: {
            text: string;
          };
        }>("terms"),
      ]);

      if (faqRes?.data?.data?.questions) {
        setFaqs(faqRes.data.data.questions);
      }
      if (termsRes?.data?.data?.text) {
        setTerms(termsRes.data.data.text);
      }
    } catch (error) {
      console.error("Error fetching FAQ or Terms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const displayedFaqs = useMemo(() => {
    return showAll ? faqs : faqs.slice(0, 3);
  }, [faqs, showAll]);

  const handleAccordionChange = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? false : index));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-20 px-4">
      {/* FAQ Section */}
      <div className="mb-12" id="faq-section">
        <h2 className="text-3xl font-semibold text-gray-800 text-start mb-8">
          Frequently Asked Questions
        </h2>

        <div className="rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {displayedFaqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expandedIndex === index}
              onChange={() => handleAccordionChange(index)}
              disableGutters
              className="bg-white hover:bg-gray-50 transition-all shadow-sm rounded-md "
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                className="bg-white"
              >
                <Typography className="font-semibold text-gray-800">
                  Q. {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className="bg-gray-50 text-gray-600 text-sm">
                <Typography
                  component="div"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(faq.answer),
                  }}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        {/* Toggle FAQs Button */}
        {faqs.length > 3 && (
          <div className="text-right mt-4">
            <Button
              variant="text"
              onClick={() => setShowAll((prev) => !prev)}
              className="!text-[#c1121f] font-medium"
            >
              {showAll ? "Hide FAQs" : "View all FAQs"}
            </Button>
          </div>
        )}
      </div>

      {/* Terms and Conditions Section */}
      <div id="term-condition">
        <h2 className="text-3xl font-semibold text-gray-800 text-start mb-8">
          Terms & Conditions
        </h2>
        <div
          className="bg-gray-100 p-6 rounded-xl shadow-md text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(terms),
          }}
        />
      </div>
    </div>
  );
};
