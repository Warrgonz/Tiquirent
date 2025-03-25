import ImgDescription from "../common/ImgDescription";
import { Images } from "../../constants/Images";
import { useTranslation } from "react-i18next"; 

export const RentUs = () => {
  const { t } = useTranslation();
  return (
    <section className="container rentUs" style={{ paddingTop: "350px" }}>
      <h2 className="text-center">{t("rentUs.title")}</h2>
      <div className="row">
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_BRANDS}
            alt={t("rentUs.iconBrands")}
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_INSURANCE}
            alt={t("rentUs.iconInsurance")}
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_PRICE}
            alt={t("rentUs.iconPrice")}
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_RENT}
            alt={t("rentUs.iconRent")}
          />
        </div>
      </div>
    </section>
  );
};

export default RentUs;
