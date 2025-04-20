import { useTranslation } from "react-i18next";
import VehicleFilters from "../components/layout/VehicleFilters";
import DateRangePicker from "../hooks/useDateRangePicker";
import { filterCategories } from "../constants/filterCategories";

import { Images } from "../constants/Images";
import VehicleCard from "../components/common/VehicleCard";
import { useReservation } from "../contexts/ReservationContext";

export const StepOne = () => {
  const { data } = useReservation();

  return (
    <form>
      <label className="form-label">Ubicación de Recogida</label>
      <input className="form-control" value={data.pickupLocation} readOnly />

      <label className="form-label">Ubicación de Entrega</label>
      <input className="form-control" value={data.dropoffLocation} readOnly />

      <label className="form-label">Fecha Recogida</label>
      <input className="form-control" value={data.pickupDate} readOnly />

      <label className="form-label">Fecha Entrega</label>
      <input className="form-control" value={data.dropoffDate} readOnly />
    </form>
  );
};

export const StepTwo = () => {
  const { t } = useTranslation();
  return (
    <div>
      <form className="container mb-4">
        {/* Datos personales */}
        <fieldset className="border p-3 mb-3">
          <legend className="w-auto px-2">{t("stepTwo.personalInfo")}</legend>
          <div className="row">
            <div className="col-sm-12 col-md-6 pb-2">
              <label className="form-label">{t("stepTwo.fullName")}</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-sm-12 col-md-6 pb-2">
              <label className="form-label">{t("stepTwo.nationality")}</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-sm-12 col-md-6 pb-2">
              <label className="form-label">{t("stepTwo.idType")}</label>
              <select className="form-select">
                <option value="">{t("idTypes.national")}</option>
                <option value="">{t("idTypes.dimex")}</option>
                <option value="">{t("idTypes.passport")}</option>
              </select>
            </div>
            <div className="col-sm-12 col-md-6 pb-2">
              <label className="form-label">{t("stepTwo.idNumber")}</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export const StepThree = () => {
  const { t } = useTranslation();
  const categories = filterCategories();
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <VehicleFilters categories={categories} />
        </div>
        <div className="col-md-8">
          <fieldset className="border p-3 mb-3">
            <legend className="w-auto px-2">
              {t("stepThree.availableVehicles")}
            </legend>
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
};
// Esto lo estoy usando para ejemplificar como seria la visualización final de una reserva

import { useState } from "react";
import Loader from "../components/common/Spinner";

export const StepFour = () => {
  const { t } = useTranslation();
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
      <h2 className="mb-3">{t("stepFour.reservationSummary")}</h2>

      {/* Información del Cliente */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepFour.personalData")}</h4>
        <p>
          <strong>{t("stepFour.name")}:</strong> {reservationData.fullName}
        </p>
        <p>
          <strong>{t("stepFour.nationality")}:</strong>{" "}
          {reservationData.nationality}
        </p>
        <p>
          <strong>{t("stepFour.idType")}:</strong> {reservationData.idType}
        </p>
        <p>
          <strong>{t("stepFour.idNumber")}:</strong> {reservationData.idNumber}
        </p>
        <p>
          <strong>{t("stepFour.email")}:</strong> {reservationData.email}
        </p>
        <p>
          <strong>{t("stepFour.phone")}:</strong> {reservationData.phone}
        </p>
        <p>
          <strong>{t("stepFour.licenseNumber")}:</strong>{" "}
          {reservationData.licenseNumber}
        </p>
      </div>

      {/* Información del Viaje */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepFour.tripDetails")}</h4>
        <p>
          <strong>{t("stepFour.pickUpLocation")}:</strong>{" "}
          {reservationData.pickUpLocation}
        </p>
        <p>
          <strong>{t("stepFour.dropOffLocation")}:</strong>{" "}
          {reservationData.dropOffLocation}
        </p>
        <p>
          <strong>{t("stepFour.reservationDates")}:</strong>{" "}
          {reservationData.dateRange}
        </p>
      </div>

      {/* Información del Vehículo Seleccionado */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepFour.selectedVehicle")}</h4>
        <div className="d-flex align-items-center">
          <img
            src={reservationData.vehicle.imageUrl}
            alt={reservationData.vehicle.name}
            className="img-fluid me-3"
            style={{ width: "300px", height: "auto" }}
          />
          <div>
            <p>
              <strong>{t("stepFour.model")}:</strong>{" "}
              {reservationData.vehicle.name}
            </p>
            <p>
              <strong>{t("stepFour.seats")}:</strong>{" "}
              {reservationData.vehicle.seats}
            </p>
            <p>
              <strong>{t("stepFour.doors")}:</strong>{" "}
              {reservationData.vehicle.doors}
            </p>
            <p>
              <strong>{t("stepFour.traction")}:</strong>{" "}
              {reservationData.vehicle.traction}
            </p>
            <p>
              <strong>{t("stepFour.transmission")}:</strong>{" "}
              {reservationData.vehicle.transmission}
            </p>
            <p>
              <strong>{t("stepFour.price")}:</strong>{" "}
              {reservationData.vehicle.currency}
              {reservationData.vehicle.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Botón de Confirmación */}
      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => alert(t("stepFour.confirmationMessage"))}
      >
        {t("stepFour.completeReservation")}
      </button>
    </div>
  );
};

export const StepFive = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column text-center flex-wrap">
      <h1>{t("stepFive.reservationConfirmation")}</h1>
      <p className="p-2">{t("stepFive.reservationConfirmationMessage")}</p>
      <Loader />
    </div>
  );
};

export const StepSix = () => {
  const { t } = useTranslation();
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
      <h2 className="mb-3">{t("stepSix.reservationSuccess")}</h2>
      <h2 className="mb-3">
        <strong>{t("stepSix.reservationCode")}</strong> T51236421
      </h2>

      {/* Información del Cliente */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepSix.personalData")}</h4>
        <div className="row">
          <div className="col-md-6">
            <p>
              <strong>{t("stepSix.name")}:</strong> {reservationData.fullName}
            </p>
            <p>
              <strong>{t("stepSix.nationality")}:</strong>{" "}
              {reservationData.nationality}
            </p>
            <p>
              <strong>{t("stepSix.idType")}:</strong> {reservationData.idType}
            </p>
            <p>
              <strong>{t("stepSix.idNumber")}</strong>{" "}
              {reservationData.idNumber}
            </p>
            <p>
              <strong>{t("stepSix.email")}:</strong> {reservationData.email}
            </p>
            <p>
              <strong>{t("stepSix.phone")}:</strong> {reservationData.phone}
            </p>
            <p>
              <strong>{t("stepSix.licenseNumber")}</strong>{" "}
              {reservationData.licenseNumber}
            </p>
          </div>
          <div className="col-md-6">
            <img src={Images.CAR_QR_SAMPLE} alt="" />
          </div>
        </div>
      </div>

      {/* Información del Viaje */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepSix.tripDetails")}</h4>
        <p>
          <strong>{t("stepSix.pickUpLocation")}:</strong>{" "}
          {reservationData.pickUpLocation}
        </p>
        <p>
          <strong>{t("stepSix.dropOffLocation")}:</strong>{" "}
          {reservationData.dropOffLocation}
        </p>
        <p>
          <strong>{t("stepSix.reservationDates")}:</strong>{" "}
          {reservationData.dateRange}
        </p>
      </div>

      {/* Información del Vehículo Seleccionado */}
      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4 className="mb-2">{t("stepSix.selectedVehicle")}</h4>
        <div className="d-flex align-items-center">
          <img
            src={reservationData.vehicle.imageUrl}
            alt={reservationData.vehicle.name}
            className="img-fluid me-3"
            style={{ width: "300px", height: "auto" }}
          />
          <div>
            <p>
              <strong>{t("stepSix.model")}:</strong>{" "}
              {reservationData.vehicle.name}
            </p>
            <p>
              <strong>{t("stepSix.seats")}:</strong>{" "}
              {reservationData.vehicle.seats}
            </p>
            <p>
              <strong>{t("stepSix.doors")}:</strong>{" "}
              {reservationData.vehicle.doors}
            </p>
            <p>
              <strong>{t("stepSix.traction")}:</strong>{" "}
              {reservationData.vehicle.traction}
            </p>
            <p>
              <strong>{t("stepSix.transmission")}:</strong>{" "}
              {reservationData.vehicle.transmission}
            </p>
            <p>
              <strong>{t("stepSix.price")}:</strong>{" "}
              {reservationData.vehicle.currency}
              {reservationData.vehicle.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
