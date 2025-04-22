document.addEventListener("DOMContentLoaded", function () {
  const btnSiguiente = document.getElementById("siguiente");

  btnSiguiente.addEventListener("click", function (event) {
    event.preventDefault();

    const campos = [
      "nombre",
      "nacionalidad",
      "tipo_cedula",
      "cedula",
      "email",
      "telefono",
      "licencia",
    ];

    let hayErrores = false;
    let mensajeError = "";

    campos.forEach((id) => {
      const campo = document.getElementById(id);
      if (!campo || campo.value.trim() === "") {
        campo.classList.remove("is-valid");
        campo.classList.add("is-invalid");
        hayErrores = true;
      } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
      }
    });

    // Validación específica para cédula
    const tipoCedula = document.getElementById("tipo_cedula").value;
    const cedula = document.getElementById("cedula").value.trim();
    const soloNumeros = /^\d+$/;
    let cedulaValida = false;

    if (!soloNumeros.test(cedula)) {
      mensajeError = "❌ La cédula solo debe contener números.";
    } else {
      switch (tipoCedula) {
        case "6": // Nacional
          cedulaValida = cedula.length === 9;
          if (!cedulaValida)
            mensajeError =
              "❌ La cédula nacional debe tener exactamente 9 dígitos.";
          break;
        case "7": // DIMEX
          cedulaValida = cedula.length === 11 || cedula.length === 12;
          if (!cedulaValida)
            mensajeError = "❌ La cédula DIMEX debe tener 11 o 12 dígitos.";
          break;
        case "8": // Pasaporte
          cedulaValida = cedula.length >= 8;
          if (!cedulaValida)
            mensajeError =
              "❌ El pasaporte debe tener al menos 8 caracteres numéricos.";
          break;
        default:
          mensajeError = "❌ Debe seleccionar un tipo de cédula válido.";
      }
    }

    const cedulaInput = document.getElementById("cedula");
    if (!cedulaValida) {
      cedulaInput.classList.remove("is-valid");
      cedulaInput.classList.add("is-invalid");
      hayErrores = true;
    } else {
      cedulaInput.classList.remove("is-invalid");
      cedulaInput.classList.add("is-valid");
    }

    if (hayErrores) {
      mostrarFlash(
        mensajeError || "❌ Debe completar correctamente todos los campos.",
        "danger"
      );
    } else {
      window.location.href = "/reservations/create/details";
    }
  });

  function mostrarFlash(mensaje, categoria) {
    const contenedor = document.getElementById("flash-container");
    contenedor.innerHTML = `
        <div class="alert alert-${categoria} alert-dismissible fade show mt-2" role="alert">
          ${mensaje}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;

    setTimeout(() => {
      const alerta = contenedor.querySelector(".alert");
      if (alerta) {
        alerta.classList.remove("show");
        alerta.style.opacity = "0";
        alerta.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => alerta.remove(), 500);
      }
    }, 5000);
  }
});
