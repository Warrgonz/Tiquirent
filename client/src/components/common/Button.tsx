import React from "react";
import { ButtonProps } from "../../interface";

const Button: React.FC<ButtonProps> = ({ label, size = "medium" }) => {
  const baseClass = "btn-default";

  const sizeClass = {
    small: "px-2 py-1",
    medium: "px-4 py-2",
    large: "px-4 py-3",
  };

  return <button className={`${baseClass} ${sizeClass[size]}`}>{label}</button>;
};

export default Button;
