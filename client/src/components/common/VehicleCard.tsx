import React from "react";
import { VehicleCardProps } from "../../interface";
import { User, DoorOpen, Settings, Gauge } from "lucide-react";
import { useTranslation } from "react-i18next"; 

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicleName,
  price,
  currency = "$",
  imageUrl,
  seats,
  doors,
  traction,
  transmission,
  onSelect,
}) => {
  const { t } = useTranslation();
  const formatPrice = () => {
    const priceStr = price.toFixed(2);
    const [dollars, cents] = priceStr.split(".");
    return (
      <>
        {currency}
        {dollars}
        <sup>{cents}</sup>
      </>
    );
  };

  return (
    <div className="card border mb-3">
      <div className="card-body p-3">
        <div className="row align-items-center">
          {/* Nombre del vehículo */}
          <div className="col-12 mb-3 text-center">
            <h5 className="card-title mb-0 fw-bold">{vehicleName}</h5>
          </div>

          {/* Imagen */}
          <div className="col-md-4 mb-3 mb-md-0">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={vehicleName}
              className="img-fluid"
              style={{ maxHeight: "120px", objectFit: "contain" }}
            />
          </div>

          {/* Precio y botón */}
          <div className="col-md-4 mb-3 mb-md-0 text-center">
            <div className="d-flex flex-column align-items-center">
              <div className="mb-2">
                <span className="text-success fs-4 fw-bold">
                  {formatPrice()}
                </span>
                <span className="text-success"> {t("vehicleCard.total")}</span>
              </div>

              <button className="btn btn-success w-100 mb-2" onClick={onSelect}>
              {t("vehicleCard.select")}
              </button>

              <a
                href="#"
                className="text-decoration-none small text-primary"
                onClick={(e) => e.preventDefault()}
              >
                {t("vehicleCard.viewCharges")} <span>&rsaquo;</span>
              </a>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center mb-2">
                <User size={18} className="me-2 text-secondary" />
                <span>{seats} {t("vehicleCard.seats")}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <DoorOpen size={18} className="me-2 text-secondary" />
                <span>{doors} {t("vehicleCard.doors")}</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Settings size={18} className="me-2 text-secondary" />
                <span>{t(`vehicleCard.traction.${traction}`)}</span>
              </div>
              <div className="d-flex align-items-center">
                <Gauge size={18} className="me-2 text-secondary" />
                <span>{t(`vehicleCard.transmission.${transmission}`)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
