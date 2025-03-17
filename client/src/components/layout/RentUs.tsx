import ImgDescription from "../common/ImgDescription";
import { Images } from "../../constants/Images";

export const RentUs = () => {
  return (
    <section className="container rentUs" style={{ paddingTop: "350px" }}>
      <h2 className="text-center">¿Por qué rentar con nosotros?</h2>
      <div className="row">
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_BRANDS}
            alt="Servicio muy completo a un precio accesible"
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_INSURANCE}
            alt="Tenemos los seguros más completos disponibles en el mercado"
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_PRICE}
            alt="Rentas por un día, un fin de semana, una semana, un mes, un año o a largo plazo"
          />
        </div>
        <div className="col-lg-3">
          <ImgDescription
            src={Images.ICON_RENT}
            alt="Tenemos las mejores marcas tales como Hyundai, Chevrolet, Suzuki, Geely, Mitsubishi, y Ford."
          />
        </div>
      </div>
    </section>
  );
};

export default RentUs;
