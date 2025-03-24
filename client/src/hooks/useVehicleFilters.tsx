import { useState } from "react";
import { VehicleFiltersState } from "../interface";

export const useVehicleFilters = (initialFilters: VehicleFiltersState) => {
  const [selectedFilters, setSelectedFilters] =
    useState<VehicleFiltersState>(initialFilters);

  const handleCheckboxChange = (
    categoryId: string,
    optionId: string,
    checked: boolean
  ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (checked) {
        updatedFilters[categoryId] = [...updatedFilters[categoryId], optionId];
      } else {
        updatedFilters[categoryId] = updatedFilters[categoryId].filter(
          (id) => id !== optionId
        );
      }

      return updatedFilters;
    });
  };

  const isOptionSelected = (categoryId: string, optionId: string): boolean => {
    return selectedFilters[categoryId]?.includes(optionId);
  };

  return { selectedFilters, handleCheckboxChange, isOptionSelected };
};
