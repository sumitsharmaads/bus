import React, { useCallback, useMemo, useState } from "react";
import { emailRegex } from "../utils";
import { LabelError } from "../common";
import { OTP, ResetPassword } from "../components/auth";
import { Link, useNavigate } from "react-router-dom";
import { PublicRoutes } from "../navigation";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [steps, setSteps] = useState(1);
  const [errors, setErrors] = useState<{ email?: string }>({
    email: undefined,
  });
  const [touched, setTouched] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setEmail(value);
    },
    []
  );
  const validateState = useMemo(() => {
    let emailError = "";
    if (!emailRegex.test(email || "")) {
      emailError = "Please enter a valid email address.";
    }
    setErrors({ email: emailError });
    return !emailError;
  }, [email]);

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateState) {
      setSteps(2);
    }
  };

  const onSubmitOTP = async (num: number) => {
    setSteps(3);
  };

  const handlePasswordReset = async (
    password: string,
    confirmPassword: string
  ) => {
    navigate("/login");
  };

  if (steps === 1) {
    return (
      <section>
        <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
        <div className="flex flex-col md:flex-row h-auto ">
          <div className="flex flex-1 flex-col justify-center items-center p-2 md:p-6 md:w-1/2">
            <div className="max-w-md w-full space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800 justify-center items-center flex">
                Forgot your password?{" "}
              </h2>
              <p className="text-sm text-gray-600">
                Don't worry happens to all of us. Enter your email below to
                recover your password.
              </p>
              <form className="space-y-4" onSubmit={handleSubmitEmail}>
                <div>
                  <label
                    htmlFor="email"
                    className="font-bold mb-2 block text-gray-700 text-xs"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleChange}
                    onBlur={() => setTouched(true)}
                  />
                  {errors.email && touched && (
                    <LabelError errorMessage={errors.email} color={"red"} />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!validateState}
                  className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </form>
              <p className="text-sm text-center text-gray-600">
                Do you remember your password then?{" "}
                <Link
                  to={PublicRoutes.LOGIN}
                  className="text-blue-600 hover:underline"
                >
                  Log in now!
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100">
            <img
              src="images/auth/auth_forgot_password.jpg"
              alt="forgot password"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    );
  }
  if (steps === 2) {
    return <OTP handleOTP={onSubmitOTP} />;
  }
  if (steps === 3) {
    return <ResetPassword handleReset={handlePasswordReset} />;
  }
  return <></>;
};

export default ForgotPassword;
