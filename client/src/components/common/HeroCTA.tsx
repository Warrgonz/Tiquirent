import { useTranslation } from "react-i18next";
import { Images } from "../../constants/Images";

export const HeroCTA = () => {
  const { t } = useTranslation();
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
      <div className="hero-title">
        <h2>Guía turistico</h2>
      </div>
    </section>
  );
};

export default HeroCTA;
