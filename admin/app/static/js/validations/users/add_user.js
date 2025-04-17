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
      form.submit(); // O AJAX aquí si lo deseás
    } else {
      console.log("Formulario inválido ❌");
    }
  });

  fields.forEach((field) => {
    field.addEventListener("input", () => validateField(field));
  });

  function validateField(field) {
    if (field.checkValidity()) {
      field.classList.remove("is-invalid");
      field.classList.add("is-valid");
      return true;
    } else {
      field.classList.remove("is-valid");
      field.classList.add("is-invalid");
      return false;
    }
  }
});
