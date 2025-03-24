import { JSX, useState } from "react";
import ReservationSteps from "../../components/layout/ReservationSteps";
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
} from "../../constants/ReservationViews";

const ReservationProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Pickup" },
    { title: "Tus Datos" },
    { title: "Select Vehicle" },
    { title: "Review & Book" },
    { title: "Check Email" },
    { title: "Confirmation" },
  ];

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep + 1) {
      setCurrentStep(stepIndex);
    }
  };

  const stepViews: Record<number, JSX.Element> = {
    0: <StepOne />,
    1: <StepTwo />,
    2: <StepThree />,
    3: <StepFour />,
    4: <StepFive />,
    5: <StepSix />,
  };

  return (
    <div className="container">
      {/* Navegación entre bolitas */}
      <ReservationSteps
        currentStep={currentStep}
        steps={steps}
        onStepClick={handleStepClick}
      />

      {/* Vista dinámica del paso actual */}
      <div className="card p-4 mb-4">{stepViews[currentStep]}</div>

      {/* Botones de navegación */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReservationProcess;
