import React, { useMemo, useState } from "react";

export type OTPtype = {
  handleOTP: (num: number) => Promise<void>;
};
export const OTP: React.FC<OTPtype> = ({ handleOTP }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const validateOTP = useMemo((): boolean => {
    return otp.every(
      (d) => d && d.toString().length === 1 && !isNaN(Number(d))
    );
  }, [otp]);

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleOTP(Number(otp.join("").trim()));
  };
  return (
    <section>
      <div className="px-2 h-[2px] bg-primary transition-all duration-300 ease-in-out" />
      <div className="flex flex-col md:flex-row h-auto ">
        <div className="flex flex-1 flex-col justify-center items-center p-2 md:p-6 md:w-1/2">
          <div className="max-w-md w-full space-y-4 p-6 rounded-lg bg-gray-100">
            <h2 className="text-3xl font-semibold text-gray-800 justify-center items-center flex">
              Verify OTP{" "}
            </h2>
            <p className="text-sm text-gray-600">
              An authentication code has been sent on your email.
            </p>
            <form className="space-y-4" onSubmit={handleOTPSubmit}>
              <div>
                <div className="flex items-center justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength={1}
                      autoComplete="off"
                      value={digit}
                      className="w-10 h-10 bg-white text-center placeholder:text-slate-400 text-slate-700 text-lg border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                    />
                  ))}
                </div>
              </div>
              <span className="flex justify-start">
                Didn't receive a code? Resend
              </span>
              <button
                type="submit"
                disabled={!validateOTP}
                className={`w-full py-2 px-4 text-white font-medium rounded-lg bg-secondary ${
                  !validateOTP
                    ? "text-gray-dark bg-drak-light"
                    : "bg-[#1E293B] hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
              >
                Verify
              </button>
            </form>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100">
          <img
            src="images/auth/auth_verify_otp.jpg"
            alt="verify "
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
