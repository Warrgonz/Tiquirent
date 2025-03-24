import { useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";

export const useDateRange = () => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;

    setRange([
      {
        startDate: startDate ?? new Date(),
        endDate: endDate ?? addDays(new Date(), 1),
        key: "selection",
      },
    ]);
  };

  return { range, handleSelect };
};
