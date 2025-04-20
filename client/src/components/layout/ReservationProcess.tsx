import { JSX, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReservationSteps from "../../components/layout/ReservationSteps";
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
} from "../../constants/ReservationViews";
import { useReservation } from "../../contexts/ReservationContext";

const ReservationProcess = () => {
  const { t } = useTranslation();
  const { data } = useReservation();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log("🧭 Datos del contexto ReservationContext:", data);

    const isComplete =
      data.pickupLocation &&
      data.dropoffLocation &&
      data.pickupDate &&
      data.dropoffDate;

    console.log("✅ ¿Datos completos para avanzar?", !!isComplete);

    if (isComplete) {
      setCurrentStep(1); // Si hay datos, iniciamos en el paso 2
    } else {
      setCurrentStep(0); // Si no, iniciamos en el paso 1
    }
  }, [data]);

  const steps = [
    { title: t("reservationProcess.pickup") },
    { title: t("reservationProcess.personalData") },
    { title: t("reservationProcess.selectVehicle") },
    { title: t("reservationProcess.reviewBook") },
    { title: t("reservationProcess.checkEmail") },
    { title: t("reservationProcess.confirmation") },
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
      {/* Navegación de pasos */}
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
          {t("reservationProcess.previous")}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
        >
          {t("reservationProcess.next")}
        </button>
      </div>
    </div>
  );
};

export default ReservationProcess;
