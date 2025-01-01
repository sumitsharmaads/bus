import React, { useCallback, useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../navigation";
import { Input, Typography } from "@material-tailwind/react";
import { SignInType } from "../types";
import { LabelError } from "../common";
import { emailRegex, nameRegex, passwordRegex } from "../utils";
import { post } from "../service";
import { useLoader } from "../contexts/LoaderContext";

export const Signup: React.FC = () => {
  const { setLoading } = useLoader();
  const [ispasswordType, setIsPasswordType] = useState<boolean>(true);
  const navigate = useNavigate();
  const [signupState, setSignupState] = useState<SignInType>({
    name: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
    name: boolean;
  }>({
    email: false,
    password: false,
    name: false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({
    email: undefined,
    password: undefined,
    name: undefined,
  });

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setSignupState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback((field: "email" | "password" | "name") => {
    setTouched((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }, []);

  const validateState = useMemo(() => {
    let emailError = "";
    let passwordError = "";
    let nameError = "";
    if (!nameRegex.test(signupState.name || "")) {
      nameError =
        "Please enter a valid name. It should only contain letters, spaces, hyphens, or apostrophes.";
    }
    if (!emailRegex.test(signupState?.email || "")) {
      emailError = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(signupState?.password || "")) {
      passwordError =
        "Password must be 8-15 characters, including uppercase, lowercase, a number, and a special character.";
    }
    setErrors({ email: emailError, password: passwordError, name: nameError });
    return !emailError && !passwordError && !nameError;
  }, [signupState]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, email: true, name: true });
    if (validateState) {
      try {
        await post(
          "auth/register",
          {
            fullname: signupState.name,
            email: signupState.email,
            password: signupState.password,
          },
          {},
          { setLoading }
        );
        navigate("/login");
      } catch (error) {
        //error occuerd
      }
    }
  };
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="flex flex-col md:flex-row h-auto">
        {/* Left Section - Images */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100">
          <img
            src="images/auth/auth.jpg"
            alt="Dadhich bus travel"
            className="object-cover"
          />
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-1 flex-col justify-center items-center p-2 md:p-6 md:w-1/2">
          <div className="max-w-md w-full space-y-4">
            {/* Logo */}
            <div className="text-center">
              <img
                src="images/auth/signup.gif"
                alt="Dadhich Travels"
                className="mx-auto mb-4 w-20"
              />
            </div>

            {/* Title and Description */}
            <h2 className="text-3xl font-semibold text-gray-800">
              Join us today{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h2>
            <p className="text-sm text-gray-600">
              Sign up now to start your adventure with exclusive travel deals
              and tips!
            </p>

            {/* Google Sign-Up Button */}
            {/* <button className="bg-[#1E293B] flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-white hover:bg-gray-50 hover:text-black">
              <img
                src="path/to/google-icon.png"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign up with Google
            </button> */}

            {/* Form Fields */}
            <form className="space-y-4" onSubmit={submitHandler}>
              <div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  color={"blue"}
                  variant={"static"}
                  label="First & Last Name"
                  crossOrigin={""}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  value={signupState.name}
                  onBlur={() => handleBlur("name")}
                />
                {errors.name && touched.name && (
                  <LabelError errorMessage={errors.name} color={"red"} />
                )}
              </div>
              <div>
                <Input
                  id="email"
                  name="email"
                  type={"email"}
                  required
                  color={"blue"}
                  variant={"static"}
                  label="Email"
                  crossOrigin={""}
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  value={signupState.email}
                  onBlur={() => handleBlur("email")}
                />
                {errors.email && touched.email && (
                  <LabelError errorMessage={errors.email} color={"red"} />
                )}
              </div>
              <div>
                <Input
                  type={ispasswordType ? "password" : "text"}
                  label="Password"
                  name={"password"}
                  crossOrigin={""}
                  id={"password"}
                  color={"blue"}
                  variant={"static"}
                  placeholder="Enter Password"
                  required
                  onChange={handleChange}
                  value={signupState.password}
                  onBlur={() => handleBlur("password")}
                  icon={
                    ispasswordType ? (
                      <EyeSlashIcon onClick={() => setIsPasswordType(false)} />
                    ) : (
                      <EyeIcon onClick={() => setIsPasswordType(true)} />
                    )
                  }
                />
                <LabelError
                  errorMessage={`Password must be 10-15 characters, including uppercase,
                    lowercase, a number, and a special character.`}
                  color={errors.password && touched.password ? "red" : "black"}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2"
              >
                Create Account
              </button>
            </form>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to={PublicRoutes.LOGIN}
                className="text-blue-600 hover:underline"
              >
                Log in now!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
