let currentPage = 1;

// 🔍 Función principal para obtener vehículos desde backend
const fetchVehicles = (query = "", page = 1) => {
  console.log("🔍 Haciendo fetch con query:", query, "y página:", page);

  fetch(`/vehicles/search?q=${encodeURIComponent(query)}&page=${page}`)
    .then((res) => {
      if (!res.ok) throw new Error("Error de red o respuesta no OK");
      return res.json();
    })
    .then((data) => {
      console.log("📦 Datos recibidos:", data);
      renderTable(data.vehiculos);
      renderPagination(data.total_pages, data.current_page, query);
    })
    .catch((error) => {
      console.error("❌ Error al obtener vehículos:", error);
    });
};

// 🧩 Función para renderizar los resultados en la tabla
const renderTable = (vehiculos) => {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  if (!vehiculos.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay vehículos registrados.</td></tr>`;
    return;
  }

  for (const v of vehiculos) {
    const row = `
      <tr>
        <td class="text-center">
          <img src="http://192.168.1.16:8080/media/${
            v.ruta_imagen
          }" width="200" height="150" class="rounded" />
        </td>
        <td class="text-center">${v.marca} ${v.modelo}</td>
        <td class="text-center">${v.placa}</td>
        <td class="text-center">${v.color}</td>
        <td class="text-center">$${parseFloat(v.precio_diario).toFixed(2)}</td>
        <td class="text-center">${v.transmision}</td>
        <td class="text-center">
          <a href="/vehicles/view/${v.id}" class="btn btn-sm btn-info">Ver</a>
          <a href="/vehicles/edit/${
            v.id
          }" class="btn btn-sm btn-warning">Editar</a>
        </td>
      </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  }
};

// 🔁 Función para renderizar la paginación
const renderPagination = (totalPages, currentPage, query = "") => {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  const createPageItem = (page, text, disabled = false, active = false) => {
    return `
      <li class="page-item ${disabled ? "disabled" : ""} ${
      active ? "active" : ""
    }">
        <a class="page-link" href="#" data-page="${page}" data-query="${query}">${text}</a>
      </li>`;
  };

  if (currentPage > 1) {
    pagination.insertAdjacentHTML(
      "beforeend",
      createPageItem(currentPage - 1, "«")
    );
  }

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagination.insertAdjacentHTML(
        "beforeend",
        createPageItem(i, i, false, i === currentPage)
      );
    } else if (
      (i === currentPage - 2 && currentPage > 3) ||
      (i === currentPage + 2 && currentPage < totalPages - 2)
    ) {
      pagination.insertAdjacentHTML(
        "beforeend",
        `<li class="page-item disabled"><span class="page-link">...</span></li>`
      );
    }
  }

  if (currentPage < totalPages) {
    pagination.insertAdjacentHTML(
      "beforeend",
      createPageItem(currentPage + 1, "»")
    );
  }

  // Eventos de paginación
  document.querySelectorAll(".pagination a.page-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const newPage = parseInt(e.target.dataset.page);
      const query = e.target.dataset.query;
      if (!isNaN(newPage)) {
        currentPage = newPage;
        fetchVehicles(query, newPage);
      }
    });
  });
};

// 📲 Evento para buscar mientras se escribe (en tiempo real)
document.getElementById("search").addEventListener("input", (e) => {
  currentPage = 1;
  const query = e.target.value.trim();
  fetchVehicles(query, currentPage);
});

// 🚀 Inicialización al cargar
document.addEventListener("DOMContentLoaded", () => {
  fetchVehicles();
});
