import { CardProps } from "../../interface";
import Button from "./Button";

export const CardServices: React.FC<CardProps> = ({
  description,
  ruta_imagen,
  route,
  alt,
}) => {
  return (
    <>
      <div>
        <div>
          <img src={ruta_imagen} alt={alt} />
        </div>
        <div>
          <p>{description}</p>
        </div>
        <a href={route}>
          <Button label={"Leer Más"} size="medium" />
        </a>
      </div>
    </>
  );
};

export default CardServices;
