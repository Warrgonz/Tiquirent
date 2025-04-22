document.addEventListener("DOMContentLoaded", function () {
  const startDate = document.getElementById("start_date");
  const endDate = document.getElementById("end_date");
  const entrega = document.getElementById("ubicacion_entrega");
  const regreso = document.getElementById("ubicacion_regreso");
  const siguienteBtn = document.querySelector(
    'a[href="/reservations/create/vehiculo"]'
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Eliminar tiempo para comparar solo fechas

  function showFlashMessage(message, category = "danger") {
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

  function toggleValidation(field, isValid) {
    field.classList.remove("is-valid", "is-invalid");
    field.classList.add(isValid ? "is-valid" : "is-invalid");
  }

  function validateField(field) {
    const isValid = field.value.trim() !== "";
    toggleValidation(field, isValid);
    return isValid;
  }

  function validateDateRange() {
    const start = new Date(startDate.value.split("/").reverse().join("-"));
    const end = new Date(endDate.value.split("/").reverse().join("-"));

    if (start < today || end < today) {
      showFlashMessage("❌ Las fechas no pueden ser anteriores al día de hoy.");
      toggleValidation(startDate, false);
      toggleValidation(endDate, false);
      return false;
    }

    if (end < start) {
      showFlashMessage(
        "❌ La fecha de regreso no puede ser anterior a la de entrega."
      );
      toggleValidation(endDate, false);
      return false;
    }

    toggleValidation(startDate, true);
    toggleValidation(endDate, true);
    return true;
  }

  siguienteBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let allValid = true;

    allValid &= validateField(entrega);
    allValid &= validateField(regreso);
    allValid &= validateField(startDate);
    allValid &= validateField(endDate);
    allValid &= validateDateRange();

    if (allValid) {
      window.location.href = "/reservations/create/vehiculo";
    } else {
      showFlashMessage(
        "❌ Por favor, complete correctamente todos los campos."
      );
    }
  });

  // Validación al cambiar campos
  [entrega, regreso, startDate, endDate].forEach((field) => {
    field.addEventListener("input", () => validateField(field));
    field.addEventListener("change", () => validateField(field));
  });
});
