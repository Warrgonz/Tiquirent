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
