import { useState } from "react";
import { Step } from "../interface";

export const useMultiStep = (steps: Step[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex <= currentStep + 1) setCurrentStep(stepIndex);
  };

  return { currentStep, nextStep, prevStep, goToStep };
};
