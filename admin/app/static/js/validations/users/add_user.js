"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");
  const fields = form.querySelectorAll("input, select");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let formValid = true;

    fields.forEach((field) => {
      if (!validateField(field)) {
        formValid = false;
      }
    });

    if (formValid) {
      console.log("Formulario válido ✅");
      form.submit(); // O AJAX si querés reemplazar
    } else {
      showFlashMessage(
        "❌ Debe completar los campos obligatorios para continuar.",
        "danger"
      );
      console.log("Formulario inválido ❌");
    }
  });

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  function validateField(field) {
    if (field.tagName === "SELECT") {
      const valid = field.value !== "";
      toggleValidationClasses(field, valid);
      return valid;
    }

    const valid = field.checkValidity();
    toggleValidationClasses(field, valid);
    return valid;
  }

  function toggleValidationClasses(field, isValid) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(isValid ? "is-valid" : "is-invalid");
  }

  function showFlashMessage(message, category) {
    let flashContainer = document.getElementById("flash-container");

    // Crear contenedor si no existe
    if (!flashContainer) {
      flashContainer = document.createElement("div");
      flashContainer.id = "flash-container";
      document.querySelector("section").prepend(flashContainer);
    }

    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${category} alert-dismissible fade show mt-2`;
    alertDiv.setAttribute("role", "alert");
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    flashContainer.appendChild(alertDiv);

    // 🕒 Desaparecer automáticamente después de 5 segundos
    setTimeout(() => {
      alertDiv.classList.remove("show");
      alertDiv.classList.add("fade");
      setTimeout(() => alertDiv.remove(), 300);
    }, 2500);
  }
});

// 🧼 Ocultar alertas del backend después de 5s
window.addEventListener("load", function () {
  const backendAlerts = document.querySelectorAll("#flash-container .alert");
  backendAlerts.forEach((alert) => {
    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("fade");
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  });
});
