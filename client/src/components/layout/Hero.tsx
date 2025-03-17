import logo from "../../assets/Hero.png";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <section
      className="hero-image"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundAttachment: "fixed",
        height: 1080,
      }}
    >
      <div className="hero-text">
        <h1>
          <span>#1</span> {t("hero.threatment")}
        </h1>
        <p className="col-md-11">
          {t("hero.extraText")} <br />
        </p>
        <Button label={t("navbar.book")} size="medium" />
        <button type="button" className="mx-3 btn btn-outline-light btn-lg">
          {t("hero.moreInfo")}
        </button>
      </div>
    </section>
  );
};

export default Hero;
