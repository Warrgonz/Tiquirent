document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("languageSelect");

  if (!select) {
    console.error("❌ No se encontró el select de idiomas.");
    return;
  }

  // Función para cambiar el idioma usando fetch a un JSON
  function changeLanguage(lang) {
    fetch("/static/constants/translations.json")
      .then((response) => response.json())
      .then((translations) => {
        if (translations[lang]) {
          // Actualizar cada elemento que tenga data-i18n
          document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang][key]) {
              el.textContent = translations[lang][key];
            }
          });
          localStorage.setItem("selectedLanguage", lang);
        }
      })
      .catch((error) =>
        console.error("❌ Error cargando las traducciones:", error)
      );
  }

  const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
  select.value = savedLanguage;
  changeLanguage(savedLanguage);

  select.addEventListener("change", function () {
    changeLanguage(this.value);
  });
});
