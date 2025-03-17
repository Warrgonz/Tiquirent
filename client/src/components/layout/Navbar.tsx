import useStickyNavbar from "../../hooks/useStickyNavbar";
import logo from "../../assets/Tiquirentlogo.png";
import Button from "../common/Button";
import LanguageDropdown from "../common/LanguageDropdown";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { isSticky, navbarHeight } = useStickyNavbar();
  const { t } = useTranslation();

  return (
    <>
      {isSticky && <div style={{ height: navbarHeight }}></div>}

      <nav
        id="main-navbar"
        className={`navbar navbar-expand-lg navbar-light bg-body-tertiary ${
          isSticky ? "fixed-top shadow" : ""
        }`}
        style={{
          transition: "all 0.3s ease-in-out",
          backgroundColor: isSticky ? "#fff" : "transparent",
          zIndex: 1030,
        }}
      >
        <div className="container">
          {/* Logo a la izquierda */}
          <LanguageDropdown />
          <a className="navbar-brand" href="#">
            <img src={logo} height="60" alt="Tiquirent Logo" loading="lazy" />
          </a>

          {/* Botón del menú hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Menú centrado */}
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {t("navbar.home")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/services">
                  {t("navbar.services")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/reservations">
                  {t("navbar.reservations")}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  {t("navbar.contact")}
                </a>
              </li>

              {/* Botón SOLO dentro del menú hamburguesa en responsive */}
              <li className="nav-item d-lg-none text-center mt-3">
                <Button label="Reservar ahora" size="large" />
              </li>
            </ul>
          </div>

          {/* Botón a la derecha en pantallas grandes */}
          <div className="d-none d-lg-block">
            <a href="/book">
              <Button label={t("navbar.book")} size="large" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
