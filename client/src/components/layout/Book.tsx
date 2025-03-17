import { MapPin, Car } from "lucide-react";
import { useTranslation } from "react-i18next";

export const BookMenu = () => {
  // Internacionalización
  const { t } = useTranslation();
  return (
    <section>
      <div className="p-0 w-75 book-overlay">
        <div className="row g-0">
          {/* Left Side - Booking Form */}
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
                <input
                  type="text"
                  className="form-control"
                  id="pickupLocation"
                  placeholder={t("bookMenu.pickupPlaceholder")}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="dropoffLocation"
                  className="form-label text-uppercase fw-bold small"
                >
                  {t("bookMenu.dropoffLocation")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dropoffLocation"
                  placeholder={t("bookMenu.dropoffPlaceholder")}
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label
                    htmlFor="pickupDate"
                    className="form-label text-uppercase fw-bold small"
                  >
                    {t("bookMenu.pickupDate")}
                  </label>
                  <input type="date" className="form-control" id="pickupDate" />
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
                    className="form-control"
                    id="dropoffDate"
                  />
                </div>
              </div>

              <button className="btn btn-success w-100 py-3">
              {t("bookMenu.rentNow")}
              </button>
            </div>
          </div>

          {/* Right Side - Information */}
          <div className="col-md-6 col-lg-8 p-5">
            <div className="container py-4">
              <h1 className="text-center mb-5">
              {t("bookMenu.title")}
              </h1>

              <div className="row text-center g-4 mb-5">
                <div className="col-md-4">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="bg-light rounded-circle p-3">
                      <MapPin size={32} className="text-primary" />
                    </div>
                  </div>
                  <h5>{t("bookMenu.pickupStep")}</h5>
                </div>

                <div className="col-md-4">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="bg-light rounded-circle p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-primary"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h5>{t("bookMenu.selectStep")}</h5>
                </div>

                <div className="col-md-4">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="bg-light rounded-circle p-3">
                      <Car size={32} className="text-primary" />
                    </div>
                  </div>
                  <h5>{t("bookMenu.reserveStep")}</h5>
                </div>
              </div>

              <div className="text-center">
                <button className="btn btn-primary px-5 py-3">
                {t("bookMenu.reserveButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookMenu;
