"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("vehicleForm");
  const fields = form.querySelectorAll("input, select");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let formHasValues = false;
    let formHasErrors = false;
    let errorMessages = [];

    // Validación individual
    fields.forEach((field) => {
      const isValid = validateField(field);
      if (field.value.trim() !== "") formHasValues = true;
      if (!isValid) formHasErrors = true;
    });

    // Validaciones específicas (numéricas y formato)
    const validations = [
      { id: "año", label: "Año", decimal: false },
      { id: "precio_diario", label: "Precio Diario", decimal: true },
      { id: "puertas", label: "Número de puertas", decimal: false },
      { id: "numero_asientos", label: "Número de asientos", decimal: false },
    ];

    validations.forEach(({ id, label, decimal }) => {
      const field = document.getElementById(id);
      const value = field.value.trim();
      const number = parseFloat(value.replace(",", "."));

      if (value !== "") {
        formHasValues = true;
        if (
          isNaN(number) ||
          number < 0 ||
          (decimal && !/^\d+(\.\d{1,2})?$/.test(value))
        ) {
          toggleValidationClasses(field, false);
          errorMessages.push(`❌ El campo "${label}" es inválido.`);
          formHasErrors = true;
        } else {
          toggleValidationClasses(field, true);
        }
      }
    });

    // Validar imagen
    const imageInput = document.getElementById("ruta_imagen");
    const hasImage = imageInput.files && imageInput.files.length > 0;
    toggleValidationClasses(imageInput, hasImage);
    if (!hasImage) formHasErrors = true;
    else formHasValues = true;

    // Mostrar mensajes
    if (formHasErrors) {
      const msg = !formHasValues
        ? "❌ Debe completar todos los campos correctamente."
        : errorMessages.length
        ? errorMessages[0] // solo uno
        : "❌ Hay campos inválidos.";

      showFlashMessage(msg, "danger");
    } else {
      form.submit();
    }
  });

  // Validación al cambiar campos
  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
  });

  function validateField(field) {
    let valid = true;

    if (field.type === "file") {
      valid = field.files && field.files.length > 0;
    } else if (field.tagName === "SELECT") {
      valid = field.value !== "";
    } else {
      valid = field.value.trim() !== "";
    }

    toggleValidationClasses(field, valid);
    return valid;
  }

  function toggleValidationClasses(field, isValid) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(isValid ? "is-valid" : "is-invalid");
  }

  function showFlashMessage(message, category) {
    const flashContainer = document.getElementById("flash-container");
    flashContainer.innerHTML = `
      <div class="alert alert-${category} alert-dismissible fade show mt-2" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

    setTimeout(() => {
      const alert = flashContainer.querySelector(".alert");
      if (alert) {
        alert.classList.remove("show");
        alert.style.opacity = "0";
        alert.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => alert.remove(), 500);
      }
    }, 5000);
  }
});
