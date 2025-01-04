import React from "react";
import { PhoneIcon, InboxIcon } from "@heroicons/react/20/solid";
import { IconButton } from "@material-tailwind/react";
import { useWebsite } from "../../contexts/WebsiteProvider";

export const ContactInfo: React.FC = () => {
  const { websiteInfo } = useWebsite();
  return (
    <div className="md:w-1/2 mb-6 md:mb-0 justify-center items-center justify-items-center">
      <h2 className="text-2xl font-semibold mb-4 font-poppins justify-center">
        Let's talk with us
      </h2>
      <p className="mb-4 font-poppins font-normal">
        Questions, comments, or suggestions? Simply fill in the form and we'll
        be in touch shortly.
      </p>
      <address className="not-italic mb-2 flex w-full">
        <div className="d-flex justify-start justify-items-start text-left">
          <p className="font-bold">
            {websiteInfo?.brandname || "Dadhich Bus Service"}
          </p>
          <p>
            {websiteInfo?.contactAddress?.address1 ||
              "Tau Devi Lal Market Near Bansal Hospital"}
          </p>
          <p>
            {websiteInfo?.contactAddress?.city || "Fatehabad"},{" "}
            {websiteInfo?.contactAddress?.state || "Haryana"} -{" "}
            {websiteInfo?.contactAddress?.pincode || 125050}
          </p>
          <div className="mt-4">
            <p className="mb-1 flex">
              <span className="h-4 w-8 ">
                <PhoneIcon color={"light-blue"} className="h-5" />
              </span>
              <a href={`tel:${websiteInfo?.phone || "+919479600044"}`}>
                {websiteInfo?.phone || "+919479600044"}
              </a>
            </p>
            <p className="flex">
              <span className="h-4 w-8">
                <InboxIcon color={"light-blue"} className="h-5 inline-block" />
              </span>
              <a href="mailto:dadhichbus@gmail.com">dadhichbus@gmail.com</a>
            </p>
          </div>
        </div>
      </address>
    </div>
  );
};
