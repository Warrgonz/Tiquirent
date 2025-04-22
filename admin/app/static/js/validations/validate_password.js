document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (!form) return;
  
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("mt-3");
  
    form.parentNode.insertBefore(alertContainer, form);
  
    form.addEventListener("submit", function (e) {
      alertContainer.innerHTML = ""; // limpia errores anteriores
  
      const nueva = form.querySelector('input[name="nueva"]').value;
      const repetir = form.querySelector('input[name="repetir"]').value;
  
      const errores = [];
      if (nueva.length < 8) errores.push("Debe tener al menos 8 caracteres.");
      if (!/[A-Z]/.test(nueva)) errores.push("Debe incluir una letra mayúscula.");
      if (!/\d/.test(nueva)) errores.push("Debe incluir al menos un número.");
      if (!/[^\w\s]/.test(nueva)) errores.push("Debe incluir al menos un símbolo.");
      if (nueva !== repetir) errores.push("Las contraseñas no coinciden.");
  
      if (errores.length > 0) {
        e.preventDefault();
        const alertBox = document.createElement("div");
        alertBox.className = "alert alert-danger";
        alertBox.innerHTML = errores.map(msg => `<p class="mb-0">${msg}</p>`).join("");
        alertContainer.appendChild(alertBox);
      }
    });
  });
  