import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  "en-US": {
    translation: {
      navbar: {
        home: "Home",
        about: "About",
        services: "Services",
        reservations: "My Reservations",
        contact: "Contact Us",
        book: "Book now",
      },
      header: {
        freeCall: "doll free",
      },
      hero: {
        threatment: "Car Rent Service In Costa Rica",
        extraText:
          "Discover the best car rental experience with a modern fleet, affordable prices, and exceptional customer service.",
        moreInfo: "Know More",
      },
    },
  },
  "es-ES": {
    translation: {
      navbar: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        reservations: "Mis Reservas",
        contact: "Contáctanos",
        book: "Reserva ahora",
      },
      header: {
        freeCall: "llama gratis",
      },
      hero: {
        threatment: "Servicio de Alquiler de Autos en Costa Rica",
        extraText:
          "Descubre la mejor experiencia en alquiler de autos con una flota moderna, precios accesibles y un servicio al cliente excepcional.",
        moreInfo: "Conoce más",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es-ES", // Idioma predeterminado
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
