import React from "react";
import { Card, CardBody, Input, Textarea } from "@material-tailwind/react";

export const ContactForm: React.FC = () => {
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
                  name={"name"}
                  crossOrigin="anonymous"
                  required
                  color="blue"
                />
              </div>
              <div>
                <Input
                  size={"md"}
                  label="Last Name"
                  name={"surname"}
                  crossOrigin="anonymous"
                  required
                  color="blue"
                />
              </div>
            </div>

            <div className="mt-4">
              <Input
                type="email"
                color="blue"
                label="Email Address"
                crossOrigin="anonymous"
                required
              />
            </div>

            <div className="mt-4">
              <Input
                maxLength={10}
                required
                crossOrigin="anonymous"
                label="Contact Number"
                //placeholder="e.g., 2321478631"
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
                      fill-rule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                }
              />
            </div>

            <div className="mt-4">
              <Textarea
                label="Your Message"
                rows={6}
                color="blue"
                name="message"
                required
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#1E293B] text-white font-medium rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
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
