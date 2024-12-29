// src/components/contact/QuickInquiry.tsx
import { Input, Textarea } from "@material-tailwind/react";
import React, { useCallback, useMemo, useState } from "react";
import { emailRegex, nameRegex } from "../utils";
import { LabelError } from "../common";

type InqueryStateType = {
  name: string;
  email: string;
  inquery: string;
};
const Inquiry: React.FC = () => {
  const [inqueryState, setInqueryState] = useState<InqueryStateType>({
    name: "",
    email: "",
    inquery: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    inquery?: string;
  }>({
    name: undefined,
    email: undefined,
    inquery: undefined,
  });

  const [touched, setTouched] = useState<{
    email: boolean;
    name: boolean;
    inquery: boolean;
  }>({
    email: false,
    name: false,
    inquery: false,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setInqueryState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setTouched((prevState) => ({
        ...prevState,
        [name]: false,
      }));
    },

    []
  );

  const handleBlur = useCallback((field: keyof InqueryStateType) => {
    setTouched((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }, []);

  const validateState = useMemo(() => {
    console.log("it is get called");
    let emailError = "";
    let messageError = "";
    let nameError = "";
    if (!nameRegex.test(inqueryState.name || "")) {
      nameError = "Please enter a valid name.";
    }
    if (!emailRegex.test(inqueryState?.email || "")) {
      emailError = "Please enter a valid email address.";
    }
    const wordCount = inqueryState.inquery.trim().split(/\s+/).length;
    if (wordCount < 20 || wordCount > 200) {
      messageError = "Your message should be between 10 and 200 words.";
    }
    setErrors({ email: emailError, inquery: messageError, name: nameError });
    return !emailError && !messageError && !nameError;
  }, [inqueryState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSumit called");
    setTouched({ name: true, email: true, inquery: true });
    if (validateState) {
      //inside api call
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      style={{ backgroundImage: `url('images/heroImage.png')` }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4 font-poppins text-center text-gray-800">
          Quick Inquiry
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                size={"md"}
                label="Your Name"
                crossOrigin="anonymous"
                id="name"
                name="name"
                type="text"
                color="blue"
                required
                aria-required="true"
                onChange={handleChange}
                value={inqueryState.name}
                onBlur={() => handleBlur("name")}
              />
              {errors.name && touched.name && (
                <LabelError errorMessage={errors.name} color={"red"} />
              )}
            </div>
            <div>
              <Input
                type="email"
                color="blue"
                label="Email Address"
                crossOrigin="anonymous"
                required
                onChange={handleChange}
                value={inqueryState.email}
                id={"email"}
                name={"email"}
                onBlur={() => handleBlur("email")}
              />
              {errors.email && touched.email && (
                <LabelError errorMessage={errors.email} color={"red"} />
              )}
            </div>
          </div>

          <div>
            <Textarea
              label="Your Message*"
              rows={8}
              color="blue"
              required
              name={"inquery"}
              id={"inquery"}
              value={inqueryState.inquery}
              onChange={handleChange}
              onBlur={() => handleBlur("inquery")}
            />
            {errors.inquery && touched.inquery && (
              <LabelError errorMessage={errors.inquery} color={"red"} />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
              onClick={handleSubmit}
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
