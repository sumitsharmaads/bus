import React from "react";
import { PhoneIcon, InboxIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";

export const ContactInfo: React.FC = () => {
  return (
    <div className="md:w-1/2 mb-6 md:mb-0 justify-center items-center justify-items-center">
      <h2 className="text-2xl font-semibold mb-4 font-poppins justify-center">
        Let's talk with us
      </h2>
      <p className="mb-4 font-poppins font-normal">
        Questions, comments, or suggestions? Simply fill in the form and we'll
        be in touch shortly.
      </p>
      <address className="not-italic mb-2">
        <p className="font-bold">Dadhich Bus Service</p>
        <p>Tau Devi Lal Market Near Bansal Hospital</p>
        <p>Fatehabad - 125050</p>
        <div className="mt-4">
          <p className="mb-1">
            <span className="h-4 w-8 mr-2 mb-1">
              <IconButton size={"sm"} color={"light-blue"}>
                P
              </IconButton>
            </span>
            <strong>Phone:</strong> <a href="tel:+919479600044">9479600044</a>,{" "}
            <a href="tel:+919479700044">9479700044</a>
          </p>
          <p>
            <span className="h-4 w-8 mr-2">
              <IconButton size={"sm"}>E</IconButton>
            </span>
            <strong>Email:</strong>{" "}
            <a href="mailto:dadhichbus@gmail.com">dadhichbus@gmail.com</a>
          </p>
        </div>
      </address>
    </div>
  );
};
