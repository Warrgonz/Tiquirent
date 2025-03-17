import React from "react";
import { ImgDescriptionProps } from "../../interface";

const ImgDescription: React.FC<ImgDescriptionProps> = ({ src, alt }) => {
  return (
    <div className="text-center">
      <img src={src} alt={alt} className="img-fluid" />
      <p>{alt}</p>
    </div>
  );
};

export default ImgDescription;
