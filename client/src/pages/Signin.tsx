import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PublicRoutes } from "../navigation";
import { Input } from "@material-tailwind/react";
import { OTP } from "../components/auth/OTP";
import { LoginType } from "../types";
import { emailRegex, passwordRegex } from "../utils";
import { LabelError } from "../common";
import { EyeSlashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/solid";

export const SignIn: React.FC = () => {
  const [ispasswordType, setIsPasswordType] = useState<boolean>(true);
  const [loginState, setLoginState] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: undefined,
    password: undefined,
  });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    {
      email: false,
      password: false,
    }
  );

  const validateState = useMemo(() => {
    console.log("validateState");
    let emailError = "";
    let passwordError = "";
    if (!emailRegex.test(loginState?.email || "")) {
      emailError = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(loginState?.password || "")) {
      passwordError =
        "Password must be 8-15 characters, including uppercase, lowercase, a number, and a special character.";
    }
    setErrors({ email: emailError, password: passwordError });
    return !emailError && !passwordError;
  }, [loginState]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback((field: "email" | "password") => {
    setTouched((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateState) {
      setSteps(2);
    }
  };

  const onSubmitOTP = async (num: number) => {
    alert(`otp is ${num}`);
  };

  if (steps === 1) {
    return (
      <section>
        <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
        <div className="flex flex-col md:flex-row h-auto ">
          {/* Left Section - Images */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 2xl:w-1/3 bg-gray-100">
            <img src="images/auth/auth.jpg" alt="Dadhich bus travel" />
          </div>

          {/* Right Section - Form */}
          <div className="flex flex-1 flex-col justify-center items-center p-2 md:p-6 md:w-1/2">
            <div className="max-w-md w-full space-y-4">
              {/* Logo */}
              <div className="text-center">
                <img
                  src="images/auth/signin.gif"
                  alt="Sign In"
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
                Sign in now to start your adventure with exclusive travel deals
                and tips!
              </p>

              <form className="space-y-4" onSubmit={submitHandler}>
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
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    value={loginState.email}
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
                    placeholder="Enter your Password"
                    required
                    onChange={handleChange}
                    value={loginState.password}
                    error={!!(errors.password && touched.password)}
                    onBlur={() => handleBlur("password")}
                    icon={
                      ispasswordType ? (
                        <EyeSlashIcon
                          onClick={() => setIsPasswordType(false)}
                        />
                      ) : (
                        <EyeIcon onClick={() => setIsPasswordType(true)} />
                      )
                    }
                  />
                  <LabelError
                    errorMessage={
                      errors.password ||
                      `Password must be 10-15 characters, including uppercase,
                    lowercase, a number, and a special character.`
                    }
                    color={
                      errors.password && touched.password ? "red" : "black"
                    }
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 px-4 text-white font-medium rounded-lg bg-secondary ${
                    !validateState
                      ? "text-gray-dark bg-drak-light"
                      : "bg-[#1E293B] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                  disabled={!validateState}
                >
                  Log In
                </button>
              </form>

              {/* Login Link */}
              <p className="text-sm text-center text-gray-600">
                Don't remember your password? don't worry 😊{" "}
                <Link
                  to={PublicRoutes.FORGOT_PASSWORD}
                  className="text-blue-600 hover:underline"
                >
                  Reset password!
                </Link>
              </p>
              <p className="flex justify-center items-center text-sm font-bold text-center text-gray-600">
                OR
              </p>
              <p className="text-sm text-center text-gray-600">
                Don't have an account?{" "}
                <Link
                  to={PublicRoutes.SIGNUP}
                  className="text-blue-600 hover:underline"
                >
                  Sign up now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (steps === 2) {
    return <OTP handleOTP={onSubmitOTP} />;
  }
  return <></>;
};
