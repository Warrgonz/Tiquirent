import { Dispatch, SetStateAction } from "react";

export interface PhoneProps {
  className?: string;
}

export interface ButtonProps {
  label: string;
  size?: "small" | "medium" | "large";
}

export interface ImgDescriptionProps {
  src: string;
  alt: string;
}

export interface AccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

export interface HeroCTAProps {
  title: string;
}

export interface CardProps {
  ruta_imagen: string;
  description: string;
  route: string;
  alt: string;
}

export interface FormData {
  name: string;
  email: string;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: Date | null;
  endDate: Date | null;
}

export interface Step {
  title: string;
}

export interface StepProps {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface ReservationStepsProps {
  currentStep: number;
  steps: Step[];
  onStepClick?: (stepIndex: number) => void;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
}

export interface VehicleFiltersState {
  [key: string]: string[];
}

export interface VehicleFiltersProps {
  categories: FilterCategory[];
  onFilterChange?: (filters: VehicleFiltersState) => void;
}

export interface VehicleSpec {
  icon: React.ReactNode;
  text: string;
}

export interface VehicleCardProps {
  vehicleName: string;
  price: number;
  currency?: string;
  imageUrl: string;
  onSelect?: () => void;
}

export interface VehicleSpec {
  text: string;
}

export interface VehicleCardProps {
  vehicleName: string;
  price: number;
  currency?: string;
  imageUrl: string;
  seats: string;
  doors: string;
  traction: string;
  transmission: string;
}

export interface StepFourProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

export interface ReservationData {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  fullName?: string;
  nationality?: string;
  idType?: string;
  idNumber?: string;
  email?: string;
  phone?: string;
  licenseNumber?: string;
  vehicle?: {
    name: string;
    imageUrl: string;
    seats: string;
    doors: string;
    traction: string;
    transmission: string;
    price: number;
    currency: string;
  };
}
