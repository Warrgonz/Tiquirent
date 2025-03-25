import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import BookMenu from "./components/layout/Book";
import { StepOne, StepThree } from "./constants/ReservationViews";

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
      rentUs: {
        title: "Why rent with us?",
        iconBrands: "Comprehensive service at an affordable price",
        iconInsurance: "We offer the most complete insurance available on the market",
        iconPrice: "Rentals for a day, weekend, week, month, year, or long term",
        iconRent: "We have the best brands such as Hyundai, Chevrolet, Suzuki, Geely, Mitsubishi, and Ford."
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
      reservationProcess: {
        pickup: "Pickup",
        personalData: "Your Data",
        selectVehicle: "Select Vehicle",
        reviewBook: "Review & Book",
        checkEmail: "Check Email confirmation",
        confirmation: "Confirmation",
        previous: "Back",
        next: "Next"
      },
      stepOne:{
        "title": "Select Your Travel Dates",
        "pickupLocation": "Pick-up Location",
        "dropoffLocation": "Drop-off Location",
        "dateRange": "Date Range"

      },
      locations:{
        "sjo": "San José",
        "syq": "San Isidro",
        "lir": "Liberia"
      },
      useDateRangePicker:{
        confirmdate:"Confirm Dates",

      },
      stepTwo:{
        personalInfo: "Personal Information",
        fullName: "Full Name",
        nationality: "Nationality",
        idType: "ID Type",
        idNumber: "ID Number",

      },
      idTypes: {
        national: "National ID",
        dimex: "DIMEX",
        passport: "Passport",
      },
      stepThree:{
        availableVehicles:"Available Vehicles",
      },
      filterCategories: {
        capacity: "Capacity",
        transmission: "Transmission",
        traction: "Traction",
        options: {
          seats1_4: "1-4 seats",
          seats5_6: "5-6 seats",
          seats7plus: "7 or more seats",
          manual: "Manual",
          automatic: "Automatic",
          traction4wd: "4WD",
          traction2wd: "2WD",
        },
      },
      vehicleFilters:{
        filterby: "Filter by",
      },
      vehicleCard:{
        total: "total",
        select: "Select",
        viewCharges: "View mandatory charges",
        seats: "seats",
        doors: "doors",
        traction:{
          "4X2": "4X2",
          "4X4": "4X4",
        },
        transmission:{
          manual: "Manual",
          automatic: "Automatic",
        },


      },
      stepFour: {
        reservationSummary: "Reservation Summary",
        personalData: "Personal Data",
        name: "Name",
        nationality: "Nationality",
        idType: "ID Type",
        idNumber: "ID Number",
        email: "Email",
        phone: "Phone",
        licenseNumber: "License Number",
        tripDetails: "Trip Details",
        pickUpLocation: "Pick-up Location",
        dropOffLocation: "Drop-off Location",
        reservationDates: "Reservation Dates",
        selectedVehicle: "Selected Vehicle",
        model: "Model",
        seats: "Seats",
        doors: "Doors",
        traction: "Traction",
        transmission: "Transmission",
        price: "Price",
        confirmationMessage: "Reservation Completed!",
        completeReservation: "Complete Reservation",
      },
      stepFive: {
        reservationConfirmation: "Reservation Confirmation",
        reservationConfirmationMessage: "We have sent you an email to confirm your reservation! Please approve the reservation to complete the process."
      },
      stepSix: {
        reservationSuccess: "Your reservation has been successfully created!",
        reservationCode:"Reservation Code",
        personalData: "Personal Data",
        name:  "Name",
        nationality:"Nationality",
        idType: "ID Type",
        idNumber:"ID Number",
        email: "Email",
        phone: "Phone",
        licenseNumber: "License Number",
        tripDetails:"Trip Details",
        pickUpLocation: "Pick-up Location",
        dropOffLocation: "Drop-off Location",
        reservationDates: "Reservation Dates",
        selectedVehicle: "Selected Vehicle",
        model:  "Model",
        seats: "Seats",
        doors: "Doors",
        traction: "Traction",
        transmission: "Transmission",
        price: "Price",


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
      rentUs: {
        title: "¿Por qué rentar con nosotros?",
        iconBrands: "Servicio muy completo a un precio accesible",
        iconInsurance: "Tenemos los seguros más completos disponibles en el mercado",
        iconPrice: "Rentas por un día, un fin de semana, una semana, un mes, un año o a largo plazo",
        iconRent: "Tenemos las mejores marcas tales como Hyundai, Chevrolet, Suzuki, Geely, Mitsubishi, y Ford.",
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
      reservationProcess: {
        pickup: "Recogida",
        personalData: "Tus Datos",
        selectVehicle: "Selecionar Vehículo",
        reviewBook: "Revisar & Reservar",
        checkEmail: "Revisar correo electrónico",
        confirmation: "Confirmación",
        previous: "Anterior",
        next: "Siguiente"
      },
      stepOne:{
        title: "Selecciona las fechas de tu viaje",
        pickupLocation: "Ubicación de recogida",
        dropoffLocation: "Ubicación de entrega",
        dateRange: "Rango de fechas",
      },
      locations:{
        sjo: "San José",
        syq: "San Isidro",
        lir: "Liberia",
      },
      useDateRangePicker:{
        confirmdate:"Confirmar Fechas",

      },
      stepTwo:{
        personalInfo: "Información Personal",
        fullName: "Nombre Completo",
        nationality: "Nacionalidad",
        idType: "Tipo de Documento de Identidad",
        idNumber: "Número de Documento",

      },
      idTypes: {
        national: "Cédula de Identidad",
        dimex: "DIMEX",
        passport: "Pasaporte",
      },
      
      stepThree:{
        availableVehicles:"Vehículos Disponibles",
      },
      filterCategories: {
        capacity: "Capacidad",
        transmission: "Transmisión",
        traction: "Tracción",
        options: {
          seats1_4: "1-4 asientos",
          seats5_6: "5-6 asientos",
          seats7plus: "7 o más asientos",
          manual: "Manual",
          automatic: "Automático",
          traction4wd: "4WD",
          traction2wd: "2WD",
        },
      },
      vehicleFilters:{
        filterby: "Filtrado por",
      },
      vehicleCard:{
        total: "total",
        select: "Selecionar",
        viewCharges: "Ver cargos obligatorios",
        seats: "asientos",
        doors: "puertas",
        traction:{
          "4X2": "4X2",
          "4X4": "4X4",
        },
        transmission:{
          manual: "Manual",
          automatic: "Automático",
        },
      },
      stepFour: {
        reservationSummary: "Resumen de Reserva",
        personalData: "Información Personal",
        name: "Nombre",
        nationality: "Nacionalidad",
        idType: "Tipo de ID",
        idNumber:"No. Identificación",
        email:"Email",
        phone: "Teléfono",
        licenseNumber: "No. Licencia",
        tripDetails:"Detalles del Viaje",
        pickUpLocation: "Ubicación de Recogida",
        dropOffLocation: "Ubicación de Entrega",
        reservationDates: "Fechas de Reserva",
        selectedVehicle: "Vehículo Seleccionado",
        model: "Modelo",
        seats: "Asientos",
        doors: "Puertas",
        traction: "Tracción",
        transmission: "Transmisión",
        price: "Precio",
        confirmationMessage: "Reservación Completada!",
        completeReservation: "Confirmar Reservación",
      },
      stepFive: {
        reservationConfirmation: "Confirmación de Reserva",
        reservationConfirmationMessage: "Hemos enviado un correo electronico para confirmar su reservación. Por favor apruebe su reservación para completar el proceso."
      },

      stepSix: {
        reservationSuccess: "¡Tu reserva ha sido creada con éxito!",
        reservationCode:"Código de reserva",
        personalData: "Datos Personales",
        name: "Nombre",
        nationality:"Nacionalidad",
        idType: "Tipo de ID",
        idNumber:"No. Identificación",
        email:"Email",
        phone: "Teléfono",
        licenseNumber: "No. Licencia",
        tripDetails:"Detalles del Viaje",
        pickUpLocation: "Ubicación de Recogida",
        dropOffLocation: "Ubicación de Entrega",
        reservationDates: "Fechas de Reserva",
        selectedVehicle: "Vehículo Seleccionado",
        model: "Modelo",
        seats: "Asientos",
        doors: "Puertas",
        traction: "Tracción",
        transmission: "Transmisión",
        price: "Precio",

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
