import React from "react";
import { PhoneProps } from "../../interface";

const Phone: React.FC<PhoneProps> = ({ className = "" }) => {
  return (
    <span className={className}>
      <i className="fa-solid fa-phone text-light"></i>
    </span>
  );
};

export default Phone;
