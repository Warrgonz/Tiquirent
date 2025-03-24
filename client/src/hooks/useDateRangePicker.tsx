import React, { useState } from "react";
import { useDateRange } from "../hooks/useDateRange";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker: React.FC = () => {
  const { range, handleSelect } = useDateRange();
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="position-relative">
      <input
        type="text"
        readOnly
        className="form-control"
        value={`${range[0].startDate.toLocaleDateString()} - ${range[0].endDate.toLocaleDateString()}`}
        onClick={() => setShowCalendar(!showCalendar)}
      />

      {showCalendar && (
        <div
          className="position-absolute bg-white shadow p-3"
          style={{ zIndex: 10 }}
        >
          <DateRange
            ranges={range}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            rangeColors={["#007bff"]}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={() => setShowCalendar(false)}
          >
            Confirmar Fechas
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
