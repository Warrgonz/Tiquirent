import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import BookMenu from "./components/layout/Book";

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
      bookMenu: {
        title: "Make your trip",
        pickupLocation: "Pick-up location",
        pickupPlaceholder: "City, Airport, Station, etc.",
        dropoffLocation: "Drop-off location",
        dropoffPlaceholder: "City, Airport, Station, etc.",
        pickupDate: "Pick-up date",
        dropoffDate: "Drop-off date",
        rentNow: "Rent A Car Now",
        pickupStep: "Choose Your Pickup Location",
        selectStep: "Select the Best Deal",
        reserveStep: "Reserve Your Rental Car",
        reserveButton: "Reserve Your Perfect Car",

      },
      faq: {
        title: "Frequently Asked Questions",
        description: "Here you can find answers to common questions.",
        questions: {
          q1: "What are the requirements to rent a car?",
          q2: "Do I need a credit card to rent a car?",
          q3: "What is the minimum age to rent a car?",
          q4: "Is insurance included in the rental price?",
          q5: "Can I cancel my reservation?",
        },
        answers: {
          a1: "To rent a car, you need a valid driver's license, a passport or ID, and a credit card for the security deposit.",
          a2: "Yes, a credit card is required for the security deposit. Debit cards may not be accepted in some locations",
          a3: "The minimum age for renting a car is usually 18, with driver's license held fo at least 1 year",
          a4: "Basic insurance is included, but additional coverage options are available for purchase to ensure full protection.",
          a5: "Yes, you can cancell your reservation.",
        },

      },
      footer: {
        description: "At Tiquirent, we provide reliable and affordable car rental services in Costa Rica. Whether you're here for business or leisure, we ensure a smooth and comfortable journey with our modern fleet and excellent customer service.",
        information: "Information",
        
        links: {
          home: "Home",
          services: "Services",
          reservations: "My Reservations",
          contact: "Contact Us",
        },
        questions: "Have a Question?",
        address: "XQXW+739, San José, Airport",
        phone: "+506 72924188",
        email: "Warren0419@outlook.com",
        copyright:
          "Copyright ©{{year}} All rights reserved | Site made with ❤️ by Group #9",
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
      bookMenu: {
        title: "Haz tu viaje",
        pickupLocation: "Ubicación de recogida",
        pickupPlaceholder: "Ciudad, Aeropuerto, Estación, etc.",
        dropoffLocation: "Ubicación de entrega",
        dropoffPlaceholder: "Ciudad, Aeropuerto, Estación, etc.",
        pickupDate: "Fecha de recogida",
        dropoffDate: "Fecha de entrega",
        rentNow: "Alquilar un auto ahora",
        pickupStep: "Elige tu lugar de recogida",
        selectStep: "Selecciona la mejor oferta",
        reserveStep: "Reserva tu coche de alquiler",
        reserveButton: "Reserva tu auto perfecto",
      },
      faq: {
        title: "Preguntas Frecuentes",
        description: "Aquí puedes encontrar respuestas a las preguntas más comunes.",
        questions: {
          q1: "¿Cuáles son los requisitos para alquilar un auto?",
          q2: "¿Necesito una tarjeta de crédito para alquilar un auto?",
          q3: "¿Cuál es la edad mínima para alquilar un auto?",
          q4: "¿El seguro está incluido en el precio del alquiler?",
          q5: "¿Puedo cancelar mi reserva?",
        },
        answers: {
          a1: "Para alquilar un auto, necesitas una licencia de conducir válida, un pasaporte o identificación y una tarjeta de crédito para el depósito de seguridad.",
          a2: "Sí, se requiere una tarjeta de crédito para el depósito de seguridad. Es posible que las tarjetas de débito no sean aceptadas en algunos lugares",
          a3: "La edad mínima para alquilar un auto suele ser 18 años, con almenos 1 año con licencia de conducir.",
          a4: "El seguro básico está incluido, pero hay opciones de cobertura adicional disponibles para una protección completa.",
          a5: "Sí, puedes cancelar tu reserva. Las políticas de cancelación pueden variar según la empresa de alquiler y las condiciones de la reserva.",
        },
        
      },
      footer: {
        description:
          "En Tiquirent, ofrecemos servicios de alquiler de autos confiables y accesibles en Costa Rica. Ya sea que estés aquí por negocios o por placer, garantizamos un viaje cómodo y sin complicaciones con nuestra moderna flota y un excelente servicio al cliente.",
        information: "Información",
        links: {
          home: "Inicio",
          services: "Servicios",
          reservations: "Mis Reservas",
          contact: "Contáctanos",
        },
        questions: "¿Tienes Preguntas?",
        address: "XQXW+739, San José, Aeropuerto",
        phone: "+506 72924188",
        email: "Warren0419@outlook.com",
        copyright:
          "Copyright ©{{year}} Todos los derechos reservados | Sitio hecho con ❤️ por Grupo #8",
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
