// Lógica del catálogo. Responsable: Miembro 3
const contenedor = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro-categoria");
const sinResultados = document.getElementById("sin-resultados");

function crearTarjeta(p) {
  const imagen = p.imagen
    ? `<img src="${p.imagen}" class="card-img-top" alt="${p.alt} loading="lazy">`
    : "";
  return `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="card h-100 producto-card">
        ${imagen}
        <div class="card-body">
          <span class="producto-categoria">${p.categoria}</span>
          <h3 class="h5 card-title mt-1">${p.nombre}</h3>
          <p class="card-text">${p.descripcion}</p>
          <p class="producto-precio">$${p.precio.toFixed(2)}</p>
        </div>
      </div>
    </div>`;
}

function mostrar(lista) {
  contenedor.innerHTML = lista.map(crearTarjeta).join("");
  sinResultados.classList.toggle("d-none", lista.length > 0);
}

function filtrar() {
  const texto = buscador.value.trim().toLowerCase();
  const categoria = filtro.value;
  const resultado = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) &&
    (categoria === "todas" || p.categoria === categoria)
  );
  mostrar(resultado);
}

function cargarCategorias() {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  categorias.forEach(c => {
    const opcion = document.createElement("option");
    opcion.value = c;
    opcion.textContent = c;
    filtro.appendChild(opcion);
  });
}

buscador.addEventListener("input", filtrar);
filtro.addEventListener("change", filtrar);

cargarCategorias();
mostrar(productos);