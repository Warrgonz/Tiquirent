import React from "react";
import { ReservationStepsProps } from "../../interface";
import Step from "../common/Step";

const ReservationSteps: React.FC<ReservationStepsProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  return (
    <div className="container my-4">
      {/* Desktop view */}
      <div className="d-none d-md-flex justify-content-between position-relative">
        <div
          className="position-absolute"
          style={{
            top: "25px",
            left: "50px",
            right: "50px",
            height: "2px",
            backgroundColor: "#dee2e6",
            zIndex: 0,
          }}
        />
        {steps.map((step, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center position-relative"
            style={{ zIndex: 1, cursor: onStepClick ? "pointer" : "default" }}
            onClick={() => onStepClick && onStepClick(index)}
          >
            <Step
              number={index + 1}
              title={step.title}
              isActive={currentStep === index}
              isCompleted={currentStep > index}
            />
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="d-md-none position-relative">
        <div className="overflow-auto pb-2">
          <div
            className="d-flex position-relative"
            style={{ minWidth: "max-content" }}
          >
            <div
              className="position-absolute"
              style={{
                top: "25px",
                left: "25px",
                right: "25px",
                height: "2px",
                backgroundColor: "#dee2e6",
                zIndex: 0,
              }}
            />
            {steps.map((step, index) => (
              <div
                key={index}
                className="d-flex flex-column align-items-center position-relative mx-3"
                style={{
                  zIndex: 1,
                  cursor: onStepClick ? "pointer" : "default",
                }}
                onClick={() => onStepClick && onStepClick(index)}
              >
                <Step
                  number={index + 1}
                  title={step.title}
                  isActive={currentStep === index}
                  isCompleted={currentStep > index}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-2 text-muted small">
          <em>Scroll horizontally to see all steps</em>
        </div>
      </div>
    </div>
  );
};

export default ReservationSteps;
