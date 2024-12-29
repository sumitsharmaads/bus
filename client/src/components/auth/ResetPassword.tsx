import React, { useCallback, useMemo, useState } from "react";
import { passwordRegex } from "../../utils";
import { Input } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { LabelError } from "../../common";

interface ResetPasswordType {
  handleReset: (password: string, confirmPassword: string) => Promise<void>;
}
export const ResetPassword: React.FC<ResetPasswordType> = ({ handleReset }) => {
  const [isPasswordType, setIsPasswordType] = useState<boolean>(true);
  const [isConfirmPasswordType, setIsConfirmPasswordType] =
    useState<boolean>(true);

  const [resetPasswordState, setResetPasswordState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({
    password: undefined,
    confirmPassword: undefined,
  });

  const [touched, setTouched] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    confirmPassword: false,
    password: false,
  });

  const handleBlur = useCallback((field: "password" | "confirmPassword") => {
    setTouched((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  }, []);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setResetPasswordState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const validateState = useMemo(() => {
    let passwordError = "";
    let confirmPasswordError = "";

    if (!passwordRegex.test(resetPasswordState.password)) {
      passwordError =
        "Password must be 8-15 characters, including uppercase, lowercase, a number, and a special character.";
    }

    if (resetPasswordState.password !== resetPasswordState.confirmPassword) {
      confirmPasswordError = "Passwords do not match.";
    }

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });
    return !passwordError && !confirmPasswordError;
  }, [resetPasswordState]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateState) {
      handleReset(
        resetPasswordState.password,
        resetPasswordState.confirmPassword
      );
    }
  };
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="flex flex-col md:flex-row h-auto ">
        <div className="flex flex-1 flex-col justify-center items-center p-2 md:p-6 md:w-1/2">
          <div className="max-w-md w-full space-y-4">
            {/* Logo */}
            <div className="text-center">
              <img
                src="images/auth/forgot_password.gif"
                alt="Forgot password"
                className="mx-auto mb-4 w-20"
              />
            </div>

            {/* Title and Description */}
            <h2 className="text-3xl font-semibold text-gray-800 justify-center items-center flex">
              Set a password{" "}
            </h2>
            <p className="text-sm text-gray-600">
              Your previous password has been reseted. Please set a new password
              to your account.
            </p>

            <form className="space-y-4" onSubmit={submitHandler}>
              <div>
                <Input
                  label="Password"
                  name={"password"}
                  crossOrigin={""}
                  id={"password"}
                  color={"blue"}
                  variant={"static"}
                  placeholder="Enter your Password"
                  required
                  type={isPasswordType ? "password" : "text"}
                  error={!!errors.password && touched.password}
                  onBlur={() => handleBlur("password")}
                  value={resetPasswordState.password}
                  onChange={handleChange}
                  icon={
                    isPasswordType ? (
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
              <div>
                <Input
                  label="Confirm password"
                  name={"confirmPassword"}
                  crossOrigin={""}
                  id={"confirmPassword"}
                  color={"blue"}
                  variant={"static"}
                  placeholder="Enter your Password"
                  required
                  type={"password"}
                  //type={isConfirmPasswordType ? "password" : "text"}
                  error={!!errors.confirmPassword && touched.confirmPassword}
                  onBlur={() => handleBlur("confirmPassword")}
                  value={resetPasswordState.confirmPassword}
                  onChange={handleChange}
                  //   icon={
                  //     isConfirmPasswordType ? (
                  //       <EyeSlashIcon
                  //         onClick={() => setIsConfirmPasswordType(false)}
                  //       />
                  //     ) : (
                  //       <EyeIcon onClick={() => setIsConfirmPasswordType(true)} />
                  //     )
                  //   }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <LabelError
                    errorMessage={errors.confirmPassword}
                    color={"red"}
                  />
                )}
              </div>
              <button
                type="submit"
                disabled={!validateState}
                className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </form>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign up now!
              </a>
            </p>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 2xl:w-1/3 bg-gray-100">
          <img src="images/auth/auth_reset_password.jpg" alt="reset password" />
        </div>
      </div>
    </section>
  );
};
