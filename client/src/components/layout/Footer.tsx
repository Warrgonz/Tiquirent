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
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

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
            {t("footer.description")}
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
            <h5 className="mb-4 text-white">{t("footer.information")}</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-white-50">
                {t("navbar.home")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/services" className="text-decoration-none text-white-50">
                {t("navbar.services")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/reservations" className="text-decoration-none text-white-50">
                {t("navbar.reservations")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-white-50">
                {t("navbar.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-4">
            <h5 className="mb-4 text-white">{t("footer.questions")}</h5>
            <ul className="list-unstyled">
              <li className="d-flex mb-3">
                <MapPin
                  className="me-3 flex-shrink-0 text-white-50"
                  size={20}
                />
                <span className="text-white-50">
                {t("footer.address")}
                </span>
              </li>
              <li className="d-flex mb-3">
                <Phone className="me-3 flex-shrink-0 text-white-50" size={20} />
                <span className="text-white-50">{t("footer.phone")}</span>
              </li>
              <li className="d-flex mb-3">
                <Mail className="me-3 flex-shrink-0 text-white-50" size={20} />
                <span className="text-white-50">{t("footer.email")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 mt-md-5 pt-4 border-top border-secondary">
          <div className="col-12 text-center">
            <p className="small text-white-50">
            {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
              <Heart size={14} className="text-danger" fill="currentColor" /> by
              
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
