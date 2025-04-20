// src/components/layout/BookMenu.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useReservation } from "../../contexts/ReservationContext";

export const BookMenu = () => {
  const { t } = useTranslation();
  const { update } = useReservation();

  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const handleSubmit = () => {
    console.log("📤 Enviando datos desde BookMenu:", {
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
    });

    update({ pickupLocation, dropoffLocation, pickupDate, dropoffDate });

    setTimeout(() => {
      window.location.href = "/book";
    }, 100); // Pequeña espera para asegurar persistencia
  };

  return (
    <section>
      <div className="p-0 w-75 book-overlay">
        <div className="row g-0">
          <div className="col-md-6 col-lg-4 bg-primary text-white p-4">
            <div className="py-3">
              <h2 className="mb-4">{t("bookMenu.title")}</h2>

              <div className="mb-3">
                <label
                  htmlFor="pickupLocation"
                  className="form-label text-uppercase fw-bold small"
                >
                  {t("bookMenu.pickupLocation")}
                </label>
                <select
                  id="pickupLocation"
                  className="form-select"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                >
                  <option value="">Selecciona un aeropuerto</option>
                  <option value="sjo">
                    Aeropuerto Internacional Juan Santamaría (SJO)
                  </option>
                  <option value="lir">
                    Aeropuerto Internacional Daniel Oduber (LIR)
                  </option>
                  <option value="tmu">Aeropuerto de Tambor (TMU)</option>
                  <option value="nos">Aeropuerto de Nosara (NOS)</option>
                  <option value="drk">Aeropuerto de Drake Bay (DRK)</option>
                  <option value="tmz">Aeropuerto de Tamarindo (TMZ)</option>
                  <option value="pld">
                    Aeropuerto de Playa Samara / Carrillo (PLD)
                  </option>
                  <option value="xqp">
                    Aeropuerto de Quepos / Manuel Antonio (XQP)
                  </option>
                  <option value="ojo">
                    Aeropuerto de Puerto Jiménez (OJO)
                  </option>
                  <option value="bcl">
                    Aeropuerto de Barra del Colorado (BCL)
                  </option>
                  <option value="ttq">Aeropuerto de Tortuguero (TTQ)</option>
                </select>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="dropoffLocation"
                  className="form-label text-uppercase fw-bold small"
                >
                  {t("bookMenu.dropoffLocation")}
                </label>
                <select
                  id="dropoffLocation"
                  className="form-select"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                >
                  <option value="">Selecciona un aeropuerto</option>
                  <option value="sjo">
                    Aeropuerto Internacional Juan Santamaría (SJO)
                  </option>
                  <option value="lir">
                    Aeropuerto Internacional Daniel Oduber (LIR)
                  </option>
                  <option value="tmu">Aeropuerto de Tambor (TMU)</option>
                  <option value="nos">Aeropuerto de Nosara (NOS)</option>
                  <option value="drk">Aeropuerto de Drake Bay (DRK)</option>
                  <option value="tmz">Aeropuerto de Tamarindo (TMZ)</option>
                  <option value="pld">
                    Aeropuerto de Playa Samara / Carrillo (PLD)
                  </option>
                  <option value="xqp">
                    Aeropuerto de Quepos / Manuel Antonio (XQP)
                  </option>
                  <option value="ojo">
                    Aeropuerto de Puerto Jiménez (OJO)
                  </option>
                  <option value="bcl">
                    Aeropuerto de Barra del Colorado (BCL)
                  </option>
                  <option value="ttq">Aeropuerto de Tortuguero (TTQ)</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label
                    htmlFor="pickupDate"
                    className="form-label text-uppercase fw-bold small"
                  >
                    {t("bookMenu.pickupDate")}
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    className="form-control"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label
                    htmlFor="dropoffDate"
                    className="form-label text-uppercase fw-bold small"
                  >
                    {t("bookMenu.dropoffDate")}
                  </label>
                  <input
                    type="date"
                    id="dropoffDate"
                    className="form-control"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="button"
                className="btn btn-success w-100 py-3"
                onClick={handleSubmit}
              >
                {t("bookMenu.rentNow")}
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-8 p-5">
            <div className="container py-4">
              <h1 className="text-center mb-5">{t("bookMenu.title")}</h1>
              {/* Aquí podés dejar la info adicional */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookMenu;
