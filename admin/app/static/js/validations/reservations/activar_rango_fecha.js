document.addEventListener("DOMContentLoaded", function () {
  const startInput = document.getElementById("start_date");
  const endInput = document.getElementById("end_date");

  if (startInput && endInput) {
    new Litepicker({
      element: startInput,
      elementEnd: endInput,
      singleMode: false,
      format: "DD/MM/YYYY",
      lang: "es",
      minDate: new Date(), // ✅ Desde hoy en adelante
    });
  }
});
