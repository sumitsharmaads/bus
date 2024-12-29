import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { ServiceStepper } from "./ServiceStepper";

export const ServiceTab: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("Local");

  const data = [
    {
      label: "Local",
      value: "Local",
      description: (
        <ServiceStepper
          totalSteps={2}
          stepsData={{
            1: <div>This is false</div>,
            2: <div>This is true</div>,
          }}
        />
      ),
    },
    {
      label: "OutStation",
      value: "OutStation",
      description: (
        <ServiceStepper
          totalSteps={2}
          stepsData={{
            1: <div>This is abc</div>,
            2: <div>This is dfgfd</div>,
          }}
        />
      ),
    },
  ];

  return (
    <div className="w-full md:w-2/3 py-4 px-8">
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`hover:border-gray-200 hover:bg-gray-200 py-2 px-4 ${
                activeTab === value
                  ? "rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white border-b-primary"
                  : ""
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, description }) => (
            <TabPanel key={value} value={value}>
              {description}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};
