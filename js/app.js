// Lógica del catálogo. Responsable: Miembro 3
const contenedor = document.getElementById("catalogo");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtro-categoria");
const sinResultados = document.getElementById("sin-resultados");
const estadoBusqueda = document.getElementById("estado-busqueda");

function quitarTildes(texto) {
  return texto ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
}

function crearTarjeta(p) {
  const imagen = p.imagen
    ? `<img src="${p.imagen}" class="card-img-top" alt="${p.alt}">`
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

  if (estadoBusqueda) {
    estadoBusqueda.textContent = `${lista.length} productos encontrados`;
  }
}

function filtrar() {
  const texto = quitarTildes(buscador.value.trim().toLowerCase());
  const categoria = filtro.value;

  const resultado = productos.filter(p => {
    const nombreLimpio = quitarTildes(p.nombre.toLowerCase());
    const descripcionLimpia = quitarTildes(p.descripcion.toLowerCase());
    const coincideTexto = nombreLimpio.includes(texto) || descripcionLimpia.includes(texto);
    const coincideCategoria = (categoria === "todas" || p.categoria === categoria);
    return coincideTexto && coincideCategoria;
  });

  // Orden alfabético (A-Z)
  resultado.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

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

// Validación y mensaje de confirmación en el formulario
const formContacto = document.querySelector(".form-contacto");
const alertaExito = document.getElementById("alerta-exito");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    if (alertaExito) {
      alertaExito.classList.remove("d-none");
      formContacto.reset();
      setTimeout(() => alertaExito.classList.add("d-none"), 5000);
    }
  });
}

cargarCategorias();
filtrar();