import VehicleFilters from "../components/layout/VehicleFilters";
import DateRangePicker from "../hooks/useDateRangePicker";
import { filterCategories } from "../constants/filterCategories";
import { Images } from "../constants/Images";
import VehicleCard from "../components/common/VehicleCard";

export const StepOne = () => (
  <div>
    <h1>Selecciona las fechas de tu viaje</h1>
    <form className="d-flex flex-column">
      <div className="d-flex flex-column pt-2 pb-2">
        <label className="form-label">Pick-up location</label>
        <select name="" className="form-select" id="">
          <option value="">
            <p> Aeropuerto Internacional Juan Santa María (SJO)</p>
          </option>
          <option value="">
            Aeropuerto Internacional Tobías Bolaños (SYQ)
          </option>
          <option value="">Aeropuerto Internacional Daniel Oduber (LIR)</option>
        </select>
      </div>
      <div className="d-flex flex-column pt-2 pb-3">
        <label className="form-label">Pick-up location</label>
        <select name="" className="form-select" id="">
          <option value="">
            <p> Aeropuerto Internacional Juan Santa María (SJO)</p>
          </option>
          <option value="">
            Aeropuerto Internacional Tobías Bolaños (SYQ)
          </option>
          <option value="">Aeropuerto Internacional Daniel Oduber (LIR)</option>
        </select>
      </div>
      <div className="">
        <label className="form-label">Pick-up location</label>
        <DateRangePicker />
      </div>
    </form>
  </div>
);

export const StepTwo = () => (
  <div>
    <form className="container mb-4">
      {/* Datos personales */}
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">Datos Personales</legend>
        <div className="row">
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Nombre completo <span className="required">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Nacionalidad <span className="required">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Tipo de identificación <span className="required">*</span>
            </label>
            <select className="form-select">
              <option value="">Nacional</option>
              <option value="">DIMEX</option>
              <option value="">Pasaporte</option>
            </select>
          </div>
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Número de identificación <span className="required">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </fieldset>

      {/* Datos de contacto */}
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">Datos de Contacto</legend>
        <div className="row">
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Correo electrónico <span className="required">*</span>
            </label>
            <input type="email" className="form-control" />
          </div>
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Número de teléfono <span className="required">*</span>
            </label>
            <input type="tel" className="form-control" />
          </div>
        </div>
      </fieldset>

      {/* Datos del conductor */}
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">Datos del Conductor</legend>
        <div className="row">
          <div className="col-sm-12 col-md-6 pb-2">
            <label className="form-label">
              Número de licencia <span className="required">*</span>
            </label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </fieldset>
    </form>
  </div>
);

export const StepThree = () => (
  <div>
    <div className="row">
      <div className="col-md-4">
        <VehicleFilters categories={filterCategories} />
      </div>
      <div className="col-md-8">
        <fieldset className="border p-3 mb-3">
          <legend className="w-auto px-2">Vehículos disponibles</legend>
          <VehicleCard
            vehicleName="Suzuki Swift Dzire ST or similar"
            price={112.2}
            imageUrl={Images.CAR_SAMPLE}
            seats="2"
            doors="4"
            traction="4X2"
            transmission="Manual"
          />
          <VehicleCard
            vehicleName="Suzuki Swift Dzire ST or similar"
            price={112.2}
            imageUrl={Images.CAR_SAMPLE}
            seats="2"
            doors="4"
            traction="4X2"
            transmission="Manual"
          />
          <VehicleCard
            vehicleName="Suzuki Swift Dzire ST or similar"
            price={112.2}
            imageUrl={Images.CAR_SAMPLE}
            seats="2"
            doors="4"
            traction="4X2"
            transmission="Manual"
          />
        </fieldset>
      </div>
    </div>
  </div>
);

// Esto lo estoy usando para ejemplificar como seria la visualización final de una reserva

import { useState } from "react";
import Loader from "../components/common/Spinner";

export const StepFour = () => {
  const [reservationData] = useState({
    fullName: "Juan Pérez",
    nationality: "Costarricense",
    idType: "Pasaporte",
    idNumber: "123456789",
    email: "juan.perez@example.com",
    phone: "+506 8888-8888",
    licenseNumber: "ABCD1234",
    pickUpLocation: "Aeropuerto Juan Santamaría (SJO)",
    dropOffLocation: "Aeropuerto Juan Santamaría (SJO)",
    dateRange: "01/04/2025 - 07/04/2025",
    vehicle: {
      name: "Suzuki Swift Dzire ST or similar",
      imageUrl:
        "https://media.istockphoto.com/id/1157655660/es/foto/suv-rojo-gen%C3%A9rico-sobre-un-fondo-blanco-vista-lateral.jpg?s=2048x2048&w=is&k=20&c=kBBB4-vZxjxHDvXAWAoe5DYMT8DRxAWoD_TytzhFL5Y=",
      seats: "2",
      doors: "4",
      traction: "4X2",
      transmission: "Manual",
      price: 112.2,
      currency: "$",
    },
  });

  return (
    <div className="container">
      <h2 className="mb-3">Resumen de la Reserva</h2>

      {/* Información del Cliente */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Datos Personales</h4>
        <p>
          <strong>Nombre:</strong> {reservationData.fullName}
        </p>
        <p>
          <strong>Nacionalidad:</strong> {reservationData.nationality}
        </p>
        <p>
          <strong>Tipo de ID:</strong> {reservationData.idType}
        </p>
        <p>
          <strong>No. Identificación:</strong> {reservationData.idNumber}
        </p>
        <p>
          <strong>Email:</strong> {reservationData.email}
        </p>
        <p>
          <strong>Teléfono:</strong> {reservationData.phone}
        </p>
        <p>
          <strong>No. Licencia:</strong> {reservationData.licenseNumber}
        </p>
      </div>

      {/* Información del Viaje */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Detalles del Viaje</h4>
        <p>
          <strong>Ubicación de Recogida:</strong>{" "}
          {reservationData.pickUpLocation}
        </p>
        <p>
          <strong>Ubicación de Entrega:</strong>{" "}
          {reservationData.dropOffLocation}
        </p>
        <p>
          <strong>Fechas de Reserva:</strong> {reservationData.dateRange}
        </p>
      </div>

      {/* Información del Vehículo Seleccionado */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Vehículo Seleccionado</h4>
        <div className="d-flex align-items-center">
          <img
            src={reservationData.vehicle.imageUrl}
            alt={reservationData.vehicle.name}
            className="img-fluid me-3"
            style={{ width: "300px", height: "auto" }}
          />
          <div>
            <p>
              <strong>Modelo:</strong> {reservationData.vehicle.name}
            </p>
            <p>
              <strong>Asientos:</strong> {reservationData.vehicle.seats}
            </p>
            <p>
              <strong>Puertas:</strong> {reservationData.vehicle.doors}
            </p>
            <p>
              <strong>Tracción:</strong> {reservationData.vehicle.traction}
            </p>
            <p>
              <strong>Transmisión:</strong>{" "}
              {reservationData.vehicle.transmission}
            </p>
            <p>
              <strong>Precio:</strong> {reservationData.vehicle.currency}
              {reservationData.vehicle.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Botón de Confirmación */}
      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => alert("Reserva completada!")}
      >
        Completar Reserva
      </button>
    </div>
  );
};

export const StepFive = () => (
  <div className="d-flex flex-column text-center flex-wrap">
    <h1>Confirmacion de tu reserva</h1>
    <p className="p-2">
      ¡Hemos enviado un correo electrónico para confirmar tu reserva! Aprueba la
      reserva para completar el proceso.
    </p>
    <Loader />
  </div>
);

export const StepSix = () => {
  const [reservationData] = useState({
    fullName: "Juan Pérez",
    nationality: "Costarricense",
    idType: "Pasaporte",
    idNumber: "123456789",
    email: "juan.perez@example.com",
    phone: "+506 8888-8888",
    licenseNumber: "ABCD1234",
    pickUpLocation: "Aeropuerto Juan Santamaría (SJO)",
    dropOffLocation: "Aeropuerto Juan Santamaría (SJO)",
    dateRange: "01/04/2025 - 07/04/2025",
    vehicle: {
      name: "Suzuki Swift Dzire ST or similar",
      imageUrl:
        "https://media.istockphoto.com/id/1157655660/es/foto/suv-rojo-gen%C3%A9rico-sobre-un-fondo-blanco-vista-lateral.jpg?s=2048x2048&w=is&k=20&c=kBBB4-vZxjxHDvXAWAoe5DYMT8DRxAWoD_TytzhFL5Y=",
      seats: "2",
      doors: "4",
      traction: "4X2",
      transmission: "Manual",
      price: 112.2,
      currency: "$",
    },
  });

  return (
    <div className="container">
      <h2 className="mb-3">¡Tu reserva ha sido creada con éxito!</h2>
      <h2 className="mb-3">
        <strong>Código de reserva #</strong> T51236421
      </h2>

      {/* Información del Cliente */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Datos Personales</h4>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>Nombre:</strong> {reservationData.fullName}
            </p>
            <p>
              <strong>Nacionalidad:</strong> {reservationData.nationality}
            </p>
            <p>
              <strong>Tipo de ID:</strong> {reservationData.idType}
            </p>
            <p>
              <strong>No. Identificación:</strong> {reservationData.idNumber}
            </p>
            <p>
              <strong>Email:</strong> {reservationData.email}
            </p>
            <p>
              <strong>Teléfono:</strong> {reservationData.phone}
            </p>
            <p>
              <strong>No. Licencia:</strong> {reservationData.licenseNumber}
            </p>
          </div>
          <div className="col-md-6">
            <img src={Images.CAR_QR_SAMPLE} alt="" />
          </div>
        </div>
      </div>

      {/* Información del Viaje */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Detalles del Viaje</h4>
        <p>
          <strong>Ubicación de Recogida:</strong>{" "}
          {reservationData.pickUpLocation}
        </p>
        <p>
          <strong>Ubicación de Entrega:</strong>{" "}
          {reservationData.dropOffLocation}
        </p>
        <p>
          <strong>Fechas de Reserva:</strong> {reservationData.dateRange}
        </p>
      </div>

      {/* Información del Vehículo Seleccionado */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">Vehículo Seleccionado</h4>
        <div className="d-flex align-items-center">
          <img
            src={reservationData.vehicle.imageUrl}
            alt={reservationData.vehicle.name}
            className="img-fluid me-3"
            style={{ width: "300px", height: "auto" }}
          />
          <div>
            <p>
              <strong>Modelo:</strong> {reservationData.vehicle.name}
            </p>
            <p>
              <strong>Asientos:</strong> {reservationData.vehicle.seats}
            </p>
            <p>
              <strong>Puertas:</strong> {reservationData.vehicle.doors}
            </p>
            <p>
              <strong>Tracción:</strong> {reservationData.vehicle.traction}
            </p>
            <p>
              <strong>Transmisión:</strong>{" "}
              {reservationData.vehicle.transmission}
            </p>
            <p>
              <strong>Precio:</strong> {reservationData.vehicle.currency}
              {reservationData.vehicle.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
