import HeroCTA from "../components/common/HeroCTA";
import CardServices from "../components/common/OptionCard";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";

export const Services = () => (
  //   const { t } = useTranslation();

  <>
    <Header />
    <Navbar />
    <HeroCTA title="Servicios" />
    <CardServices ruta_imagen={""} description={""} route={""} alt={""} />

    <section className="container-fluid bg-blue pt-5 pb-5">
      <div className="row d-flex text-center">
        <div className="col-md-4 text-light count-text">
          <h1>20k+</h1>
          <p>Happy Customers</p>
        </div>
        <div className="col-md-4 text-light count-text">
          <h1>100</h1>
          <p>Cars Available</p>
        </div>
        <div className="col-md-4 text-light count-text">
          <h1>25+</h1>
          <p>Years of experience</p>
        </div>
      </div>
    </section>
  </>
);

export default Services;
