import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // Cargar el idioma guardado en localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Función para cambiar el idioma y guardarlo en localStorage
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("selectedLanguage", language);
    setSelectedLanguage(language);
  };

  return { selectedLanguage, changeLanguage };
};

export default useLanguage;
