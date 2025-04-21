import { createContext, useContext, useState, ReactNode } from "react";
import { ReservationData } from "../interface";

const defaultData: ReservationData = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  dropoffDate: "",
};

const ReservationContext = createContext<{
  data: ReservationData;
  update: (partialData: Partial<ReservationData>) => void;
}>({
  data: defaultData,
  update: () => {},
});

interface ReservationProviderProps {
  children: ReactNode;
}

export const ReservationProvider = ({ children }: ReservationProviderProps) => {
  const [data, setData] = useState<ReservationData>(defaultData);

  const update = (partialData: Partial<ReservationData>) => {
    setData((prev) => ({ ...prev, ...partialData }));
  };

  return (
    <ReservationContext.Provider value={{ data, update }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = () => useContext(ReservationContext);
