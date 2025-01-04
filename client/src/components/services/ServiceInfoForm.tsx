import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import {
  ContactFormStateType,
  ContactFormTouchedState,
} from "../../types/forms";
import { emailRegex, nameRegex, phoneRegex } from "../../utils";
import { LabelError } from "../../common";
import { useRentalServiceContext } from "../../contexts/RentealServiceContext";
import { post } from "../../service";
import { useLoader } from "../../contexts/LoaderContext";

export const ServiceInfoForm: React.FC<{ handleClose?: () => void }> = ({
  handleClose,
}) => {
  const { onChange, changeStep, state, busService } = useRentalServiceContext();
  const { setLoading } = useLoader();
  const [formState, setFormState] = useState<ContactFormStateType>(
    (state[2] as ContactFormStateType) || {
      firstname: "",
      lastname: "",
      email: "",
      phone: undefined,
      message: "",
    }
  );

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

  const handleBlur = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const key = event.target.name;
      setTouched((prevState) => ({
        ...prevState,
        [key]: true,
      }));
    },
    []
  );

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
    if (formState?.email && !emailRegex.test(formState?.email || "")) {
      emailError = "Please enter a valid email address.";
    }

    if (formState.message && (wordCount < 2 || wordCount > 200)) {
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

  const onSave = async () => {
    setTouched({
      firstname: true,
      lastname: true,
      email: true,
      phone: true,
      message: true,
    });
    if (validateState) {
      onChange(2, formState);
      try {
        await post(
          `forms/${busService === "outstation" ? "outstation" : "local"}`,
          {
            ...state[1],
            ...formState,
          },
          {},
          {
            setLoading,
            showSuccess: true,
          }
        );
        handleClose?.();
      } catch (error) {}
    }
  };
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
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
              onBlur={handleBlur}
            />
            {errors?.firstname && touched.firstname && (
              <LabelError errorMessage={errors.firstname} color={"red"} />
            )}
          </div>
          <div>
            <Input
              size={"md"}
              label="Last Name"
              name={"lastname"}
              crossOrigin="anonymous"
              required
              color="blue"
              value={formState.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
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
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            onBlur={handleBlur}
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
            pattern="^\d{10}$"
            color="blue"
            className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-blue-gray-600"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            name="phone"
            id="phone"
            value={formState.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.phone && touched.phone && (
            <LabelError errorMessage={errors.phone} color={"red"} />
          )}
        </div>

        <div className="mt-4">
          <Textarea
            label="Your Message"
            rows={2}
            color="blue"
            name="message"
            required
            id="message"
            value={formState.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors?.message && touched.message && (
            <LabelError errorMessage={errors.message} color={"red"} />
          )}
        </div>
      </form>
      <div className="mt-4 flex items-center w-full">
        <Button
          onClick={() => {
            changeStep((num) => num - 1);
            onChange(2, formState);
          }}
        >
          Prev
        </Button>
        <div className="ml-auto flex space-x-4">
          <Button
            onClick={onSave}
            className="w-full text-white font-medium rounded-lg bg-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Book
          </Button>
        </div>
      </div>
    </div>
  );
};
