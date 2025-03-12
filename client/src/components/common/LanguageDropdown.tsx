import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import useLanguage from "../../hooks/useLanguage";

const LanguageDropdown = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: "none",
          background: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ReactCountryFlag
          countryCode={selectedLanguage === "es-ES" ? "ES" : "US"}
          svg
          style={{ width: "2em", height: "2em" }}
        />
      </button>

      {isOpen && (
        <div className="dropdown-menu show">
          <button
            className="dropdown-item"
            onClick={() => changeLanguage("es-ES")}
          >
            <ReactCountryFlag
              countryCode="ES"
              svg
              style={{ width: "2em", height: "2em" }}
            />{" "}
            Español
          </button>
          <button
            className="dropdown-item"
            onClick={() => changeLanguage("en-US")}
          >
            <ReactCountryFlag
              countryCode="US"
              svg
              style={{ width: "2em", height: "2em" }}
            />{" "}
            English
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
