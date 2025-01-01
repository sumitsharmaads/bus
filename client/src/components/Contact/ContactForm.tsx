import { useCallback, useMemo, useState } from "react";
import { Card, CardBody, Input, Textarea } from "@material-tailwind/react";
import { emailRegex, nameRegex, phoneRegex } from "../../utils";
import { LabelError } from "../../common";
import { post } from "../../service";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../contexts/LoaderContext";
import {
  ContactFormStateType,
  ContactFormTouchedState,
} from "../../types/forms";

export const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoader();
  const [formState, setFormState] = useState<ContactFormStateType>({
    firstname: "",
    lastname: "",
    email: "",
    phone: undefined,
    message: "",
  });

  const [touched, setTouched] = useState<ContactFormTouchedState>({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    message: false,
  });

  const [errors, setErrors] = useState<ContactFormStateType>();
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback((field: keyof ContactFormStateType) => {
    setTouched((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }, []);

  const validateState = useMemo(() => {
    const wordCount = (formState?.message || " ")?.trim()?.split(/\s+/).length;
    let emailError = "";
    let messageError = "";
    let firstNameError = "";
    let lastNameError = "";
    let phoneError = "";
    if (!nameRegex.test(formState.firstname || "")) {
      firstNameError = "Please enter a valid name.";
    }
    if (!nameRegex.test(formState.lastname || "")) {
      lastNameError = "Please enter a valid name.";
    }
    if (!emailRegex.test(formState?.email || "")) {
      emailError = "Please enter a valid email address.";
    }

    if (wordCount < 5 || wordCount > 200) {
      messageError = "Your message should be between 5 and 200 words.";
    }
    if (!phoneRegex.test((formState.phone || "").toString())) {
      phoneError = "Enter a valid phone number with 10 digits";
    }
    setErrors({
      email: emailError,
      phone: phoneError,
      firstname: firstNameError,
      lastname: lastNameError,
      message: messageError,
    });
    return (
      !emailError &&
      !messageError &&
      !phoneError &&
      !firstNameError &&
      !lastNameError
    );
  }, [formState]);

  const handleSumit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      firstname: true,
      email: true,
      phone: true,
      lastname: true,
      message: true,
    });
    if (validateState) {
      try {
        await post(
          "forms/contact",
          formState,
          {},
          {
            setLoading,
            showSuccess: true,
          }
        );
        navigate("/");
      } catch (error) {}
    }
  };
  return (
    <div className="md:w-1/2 p-6 rounded-lg">
      <Card className="bg-gray-100">
        <CardBody>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  size={"md"}
                  label="First Name"
                  name={"firstname"}
                  id={"firstname"}
                  crossOrigin="anonymous"
                  required
                  color="blue"
                  value={formState.firstname}
                  onChange={handleChange}
                  onBlur={() => handleBlur("firstname")}
                />
                {errors?.firstname && touched.firstname && (
                  <LabelError errorMessage={errors.firstname} color={"red"} />
                )}
              </div>
              <div>
                <Input
                  size={"md"}
                  label="Last Name"
                  crossOrigin="anonymous"
                  required
                  color="blue"
                  name={"lastname"}
                  id={"lastname"}
                  value={formState.lastname}
                  onChange={handleChange}
                  onBlur={() => handleBlur("lastname")}
                />
                {errors?.lastname && touched.lastname && (
                  <LabelError errorMessage={errors.lastname} color={"red"} />
                )}
              </div>
            </div>

            <div className="mt-4">
              <Input
                type="email"
                color="blue"
                label="Email Address"
                crossOrigin="anonymous"
                required
                name="email"
                id={"email"}
                value={formState.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
              />
              {errors?.email && touched.email && (
                <LabelError errorMessage={errors.email} color={"red"} />
              )}
            </div>

            <div className="mt-4">
              <Input
                maxLength={10}
                required
                crossOrigin="anonymous"
                label="Contact Number"
                name="phone"
                id="phone"
                pattern="^\d{10}$"
                color="blue"
                value={formState.phone || ""}
                onChange={handleChange}
                onBlur={() => handleBlur("phone")}
                className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4 text-blue-gray-600"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
              {errors?.phone && touched.phone && (
                <LabelError errorMessage={errors.phone} color={"red"} />
              )}
            </div>

            <div className="mt-4">
              <Textarea
                label="Your Message"
                rows={6}
                color="blue"
                required
                name="message"
                id="message"
                value={formState.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
              />
              {errors?.message && touched.message && (
                <LabelError errorMessage={errors.message} color={"red"} />
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleSumit}
              >
                Send Message
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
