import { FC, useState } from "react";
import PropertyFormPortal from "../forms";
import {
  InspectProperty,
  RequestProperty,
  VerifyProperty,
} from "../forms/sidebarForms";
import { SingleProperty } from "../helpers/interfaces";

interface IProps {
  property: SingleProperty;
  data: {
    heading: string;
    description: string;
    button: string;
  };
}

const SidebarCard: FC<IProps> = ({ data, property }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    { component: RequestProperty, label: "Request Property" },
    { component: InspectProperty, label: "Inspect Property" },
    { component: VerifyProperty, label: "Verify Property" },
  ];

  const handleModal = (selectedForm: string) => {
    setIsOpen(true);
    if (selectedForm === "Request") {
      const requestForm = steps.find(
        (step: { label: string }) => step.label === "Request Property"
      );
      setSelectedStep(steps.indexOf(requestForm!));
    } else if (selectedForm === "Inspect") {
      const inspectForm = steps.find(
        (step: { label: string }) => step.label === "Inspect Property"
      );
      setSelectedStep(steps.indexOf(inspectForm!));
    } else {
      const verifyForm = steps.find(
        (step: { label: string }) => step.label === "Verify Property"
      );
      setSelectedStep(steps.indexOf(verifyForm!));
    }
  };

  return (
    <div className="flex justify-center pb-6 sticky top-24">
      <div className="rounded-lg shadow-md bg-white max-w-sm">
        <div className="p-4">
          <h4 className="text-center text-gray-900 text-2xl font-medium mb-2">
            {data.heading}
          </h4>
          <p className="text-gray-900 text-center text-lg font-light mb-2">
            {data.description}
          </p>
          <div className="flex justify-center my-6">
            <button
              onClick={() => handleModal(data.button)}
              className="flex justify-center shadow-lg py-2 px-6 mt-3 sm:mt-0 sm:-ml-4 font-heading font-medium tracking-tighter text-xl text-white text-center bg-primary rounded-xl"
            >
              {data.button}
            </button>
          </div>
        </div>
      </div>
      <PropertyFormPortal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        steps={steps}
        selectedStep={selectedStep}
        property={property}
      />
    </div>
  );
};

export default SidebarCard;
