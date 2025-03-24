import { useState } from "react";
import { FormData } from "../interface";

export const useMultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    pickupLocation: "",
    dropoffLocation: "",
    startDate: null,
    endDate: null,
  });

  const steps = ["Datos del Cliente", "Ubicación", "Fechas"];

  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
  const goToStep = (index: number) => setStep(index);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "date" && value ? new Date(value) : value,
    }));
  };

  return { step, steps, formData, handleChange, nextStep, prevStep, goToStep };
};
