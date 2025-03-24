import { Images } from "../../constants/Images";
import { HeroCTAProps } from "../../interface";

export const HeroCTA: React.FC<HeroCTAProps> = ({ title }) => {
  return (
    <section
      className="position-relative container-fluid d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Images.CTA_BANNER})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: 500,
      }}
    >
      <div className="hero-title">
        <h2>{title}</h2>
      </div>
    </section>
  );
};

export default HeroCTA;
