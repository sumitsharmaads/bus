import React from "react";

import { Spinner } from "@material-tailwind/react";

export const FullPageLoader: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      style={{ zIndex: 10000 }}
    >
      <Spinner className="h-16 w-16 text-blue-900/50" />
    </div>
  );
};
