// src/contexts/ReservationContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { ReservationData, ReservationContextType } from "../interface";

const defaultReservation: ReservationData = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  dropoffDate: "",
};

export const ReservationContext = createContext<ReservationContextType>({
  data: defaultReservation,
  update: () => {},
});

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ReservationData>(defaultReservation);

  const update = (fields: Partial<ReservationData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <ReservationContext.Provider value={{ data, update }}>
      {children}
    </ReservationContext.Provider>
  );
};

// 👇 Hook personalizado para usar el contexto sin importar el componente
export const useReservation = () => useContext(ReservationContext);
