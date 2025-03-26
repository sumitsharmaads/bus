import React from "react";

const DummyFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
      <div className="text-lg font-medium text-gray-700 animate-pulse">
        Loading, please wait...
      </div>
    </div>
  );
};

export default DummyFallback;
