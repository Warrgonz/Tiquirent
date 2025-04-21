import { Images } from "../../constants/Images";
import Button from "../common/Button";

export const Tour = () => {
  return (
    <section
      className="position-relative container-fluid d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Images.CTA_TOUR})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: 500,
      }}
    >
      <div className="tour-text">
        <h2>Guía turistico</h2>
        <p className="py-3">
          Regístrate ahora y ofrece tus servicios a turistas nacionales e
          internacionales. Conéctate con viajeros, muestra tus experiencias y
          haz crecer tu negocio como guía turístico
        </p>
        <Button label={"Registrarme"} size="large" />
      </div>
    </section>
  );
};

export default Tour;
