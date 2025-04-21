import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useReservation } from "../contexts/ReservationContext";
import VehicleFilters from "../components/layout/VehicleFilters";
import VehicleCard from "../components/common/VehicleCard";
import { Images } from "../constants/Images";
import { filterCategories } from "../constants/filterCategories";

// 🔹 PASO 1: Ubicación y fechas (solo lectura)
export const StepOne = () => {
  const { data } = useReservation();

  return (
    <form>
      <label className="form-label">Ubicación de Recogida</label>
      <input
        className="form-control"
        value={data.pickupLocation || ""}
        readOnly
      />

      <label className="form-label">Ubicación de Entrega</label>
      <input
        className="form-control"
        value={data.dropoffLocation || ""}
        readOnly
      />

      <label className="form-label">Fecha Recogida</label>
      <input className="form-control" value={data.pickupDate || ""} readOnly />

      <label className="form-label">Fecha Entrega</label>
      <input className="form-control" value={data.dropoffDate || ""} readOnly />
    </form>
  );
};

// 🔹 PASO 2: Datos personales
export const StepTwo = () => {
  const { t } = useTranslation();
  const { data, update } = useReservation();

  return (
    <form className="container mb-4">
      <fieldset className="border p-3 mb-3">
        <legend className="w-auto px-2">{t("stepTwo.personalInfo")}</legend>
        <div className="row">
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.fullName")}</label>
            <input
              type="text"
              className="form-control"
              value={data.fullName || ""}
              onChange={(e) => update({ fullName: e.target.value })}
            />
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.nationality")}</label>
            <input
              type="text"
              className="form-control"
              value={data.nationality || ""}
              onChange={(e) => update({ nationality: e.target.value })}
            />
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.idType")}</label>
            <select
              className="form-select"
              value={data.idType || ""}
              onChange={(e) => update({ idType: e.target.value })}
            >
              <option value="">{t("stepTwo.selectIdType")}</option>
              <option value="NACIONAL">{t("idTypes.national")}</option>
              <option value="DIMEX">{t("idTypes.dimex")}</option>
              <option value="PASAPORTE">{t("idTypes.passport")}</option>
            </select>
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.idNumber")}</label>
            <input
              type="text"
              className="form-control"
              value={data.idNumber || ""}
              onChange={(e) => update({ idNumber: e.target.value })}
            />
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.email")}</label>
            <input
              type="email"
              className="form-control"
              value={data.email || ""}
              onChange={(e) => update({ email: e.target.value })}
            />
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.phone")}</label>
            <input
              type="text"
              className="form-control"
              value={data.phone || ""}
              onChange={(e) => update({ phone: e.target.value })}
            />
          </div>
          <div className="col-md-6 pb-2">
            <label className="form-label">{t("stepTwo.licenseNumber")}</label>
            <input
              type="text"
              className="form-control"
              value={data.licenseNumber || ""}
              onChange={(e) => update({ licenseNumber: e.target.value })}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

// 🔹 PASO 3: Selección del vehículo
export const StepThree = () => {
  const { t } = useTranslation();
  const { update } = useReservation();
  const categories = filterCategories();

  const handleVehicleSelect = () => {
    update({
      vehicle: {
        name: "Suzuki Swift Dzire ST or similar",
        imageUrl: Images.CAR_SAMPLE,
        seats: "2",
        doors: "4",
        traction: "4X2",
        transmission: "Manual",
        price: 112.2,
        currency: "$",
      },
    });
  };

  return (
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
            onClick={handleVehicleSelect}
          />
        </fieldset>
      </div>
    </div>
  );
};

// 🔹 PASO 4: Resumen de la reserva
export const StepFour = () => {
  const { t } = useTranslation();
  const { data } = useReservation();

  return (
    <div className="container">
      <h2 className="mb-3">{t("stepFour.reservationSummary")}</h2>

      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4>{t("stepFour.personalData")}</h4>
        <p>
          <strong>{t("stepFour.name")}:</strong> {data.fullName}
        </p>
        <p>
          <strong>{t("stepFour.nationality")}:</strong> {data.nationality}
        </p>
        <p>
          <strong>{t("stepFour.idType")}:</strong> {data.idType}
        </p>
        <p>
          <strong>{t("stepFour.idNumber")}:</strong> {data.idNumber}
        </p>
        <p>
          <strong>{t("stepFour.email")}:</strong> {data.email}
        </p>
        <p>
          <strong>{t("stepFour.phone")}:</strong> {data.phone}
        </p>
        <p>
          <strong>{t("stepFour.licenseNumber")}:</strong> {data.licenseNumber}
        </p>
      </div>

      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4>{t("stepFour.tripDetails")}</h4>
        <p>
          <strong>{t("stepFour.pickUpLocation")}:</strong> {data.pickupLocation}
        </p>
        <p>
          <strong>{t("stepFour.dropOffLocation")}:</strong>{" "}
          {data.dropoffLocation}
        </p>
        <p>
          <strong>{t("stepFour.reservationDates")}:</strong> {data.pickupDate} -{" "}
          {data.dropoffDate}
        </p>
      </div>

      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4>{t("stepFour.selectedVehicle")}</h4>
        {data.vehicle && (
          <div className="d-flex align-items-center">
            <img
              src={data.vehicle.imageUrl}
              alt={data.vehicle.name}
              className="img-fluid me-3"
              style={{ width: "300px", height: "auto" }}
            />
            <div>
              <p>
                <strong>{t("stepFour.model")}:</strong> {data.vehicle.name}
              </p>
              <p>
                <strong>{t("stepFour.seats")}:</strong> {data.vehicle.seats}
              </p>
              <p>
                <strong>{t("stepFour.doors")}:</strong> {data.vehicle.doors}
              </p>
              <p>
                <strong>{t("stepFour.traction")}:</strong>{" "}
                {data.vehicle.traction}
              </p>
              <p>
                <strong>{t("stepFour.transmission")}:</strong>{" "}
                {data.vehicle.transmission}
              </p>
              <p>
                <strong>{t("stepFour.price")}:</strong> {data.vehicle.currency}
                {data.vehicle.price?.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => alert(t("stepFour.confirmationMessage"))}
      >
        {t("stepFour.completeReservation")}
      </button>
    </div>
  );
};

// 🔹 PASO 5: Confirmación final
export const StepFive = () => {
  const { t } = useTranslation();
  const { data } = useReservation();

  return (
    <div className="container">
      <h2 className="mb-3">{t("stepFive.reservationSuccess")}</h2>
      <h4 className="mb-4">
        <strong>{t("stepFive.reservationCode")}</strong> T51236421
      </h4>

      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4>{t("stepFive.personalData")}</h4>
        <p>
          <strong>{t("stepFive.name")}:</strong> {data.fullName}
        </p>
        <p>
          <strong>{t("stepFive.nationality")}:</strong> {data.nationality}
        </p>
        <p>
          <strong>{t("stepFive.idType")}:</strong> {data.idType}
        </p>
        <p>
          <strong>{t("stepFive.idNumber")}:</strong> {data.idNumber}
        </p>
        <p>
          <strong>{t("stepFive.email")}:</strong> {data.email}
        </p>
        <p>
          <strong>{t("stepFive.phone")}:</strong> {data.phone}
        </p>
        <p>
          <strong>{t("stepFive.licenseNumber")}:</strong> {data.licenseNumber}
        </p>
      </div>

      <div className="border p-3 mb-3 rounded shadow-sm">
        <h4>{t("stepFive.tripDetails")}</h4>
        <p>
          <strong>{t("stepFive.pickUpLocation")}:</strong> {data.pickupLocation}
        </p>
        <p>
          <strong>{t("stepFive.dropOffLocation")}:</strong>{" "}
          {data.dropoffLocation}
        </p>
        <p>
          <strong>{t("stepFive.reservationDates")}:</strong> {data.pickupDate} -{" "}
          {data.dropoffDate}
        </p>
      </div>

      {data.vehicle && (
        <div className="border p-3 mb-3 rounded shadow-sm">
          <h4>{t("stepFive.selectedVehicle")}</h4>
          <div className="d-flex align-items-center">
            <img
              src={data.vehicle.imageUrl}
              alt={data.vehicle.name}
              className="img-fluid me-3"
              style={{ width: "300px", height: "auto" }}
            />
            <div>
              <p>
                <strong>{t("stepFive.model")}:</strong> {data.vehicle.name}
              </p>
              <p>
                <strong>{t("stepFive.seats")}:</strong> {data.vehicle.seats}
              </p>
              <p>
                <strong>{t("stepFive.doors")}:</strong> {data.vehicle.doors}
              </p>
              <p>
                <strong>{t("stepFive.traction")}:</strong>{" "}
                {data.vehicle.traction}
              </p>
              <p>
                <strong>{t("stepFive.transmission")}:</strong>{" "}
                {data.vehicle.transmission}
              </p>
              <p>
                <strong>{t("stepFive.price")}:</strong> {data.vehicle.currency}
                {data.vehicle.price?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
