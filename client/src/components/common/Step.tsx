import { StepProps } from "../../interface";

const Step: React.FC<StepProps> = ({
  number,
  title,
  isActive,
  isCompleted,
}) => {
  const getStepClass = () => {
    if (isActive) return "bg-primary text-white";
    if (isCompleted) return "bg-success text-white";
    return "bg-light text-dark";
  };

  return (
    <div className="d-flex flex-column align-items-center position-relative">
      <div
        className={`rounded-circle d-flex justify-content-center align-items-center ${getStepClass()}`}
        style={{
          width: "50px",
          height: "50px",
          fontSize: "1.25rem",
          fontWeight: "bold",
        }}
      >
        {number}
      </div>
      <div
        className="mt-2 text-center"
        style={{ fontSize: "0.875rem", fontWeight: "bold" }}
      >
        {title}
      </div>
    </div>
  );
};

export default Step;
