import {
  MapPin,
  Phone,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Heart,
} from "lucide-react";

import { Images } from "../../constants/Images";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Logo and Description */}
          <div className="col-md-4">
            <div className="mb-4 fs-4 fs-md-3">
              <img src={Images.FAVICON} width={200} alt="Tiquirent logo" />
            </div>
            <p className="text-white-50">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
              atque a vel cumque aliquam hic magni, eos reprehenderit voluptatum
              assumenda dignissimos nostrum perspiciatis ab ullam doloremque,
              ducimus, et cum accusamus.
            </p>
            <div className="d-flex mt-4 gap-2">
              <a href="#" className="me-3">
                <div
                  className="bg-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Twitter size={18} className="text-white" />
                </div>
              </a>
              <a href="#" className="me-3">
                <div
                  className="bg-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Facebook size={18} className="text-white" />
                </div>
              </a>
              <a href="#" className="me-3">
                <div
                  className="bg-dark rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Instagram size={18} className="text-white" />
                </div>
              </a>
            </div>
          </div>

          {/* Information */}
          <div className="col-md-4">
            <h5 className="mb-4 text-white">Information</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Inicio
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Servicios
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Mis reservas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-4">
            <h5 className="mb-4 text-white">Have a Questions?</h5>
            <ul className="list-unstyled">
              <li className="d-flex mb-3">
                <MapPin
                  className="me-3 flex-shrink-0 text-white-50"
                  size={20}
                />
                <span className="text-white-50">
                  XQXW+739, San José, Aeropuerto
                </span>
              </li>
              <li className="d-flex mb-3">
                <Phone className="me-3 flex-shrink-0 text-white-50" size={20} />
                <span className="text-white-50">+506 72924188</span>
              </li>
              <li className="d-flex mb-3">
                <Mail className="me-3 flex-shrink-0 text-white-50" size={20} />
                <span className="text-white-50">Warren0419@outoook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 mt-md-5 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <p className="small text-white-50">
              Copyright ©{new Date().getFullYear()} Derechos reservados | Sitio
              hecho con el{" "}
              <Heart size={14} className="text-danger" fill="currentColor" /> by
              Grupo #8
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
