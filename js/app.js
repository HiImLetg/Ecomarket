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

// Función para eliminar tildes/acentos de un texto
function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filtrar() {
  if (!buscador || !filtro) return;
  
  // Convertimos a minúsculas y quitamos tildes del texto buscado
  const texto = quitarTildes(buscador.value.trim().toLowerCase());
  const categoria = filtro.value;

  const resultado = productos.filter(p => {
    // Convertimos a minúsculas y quitamos tildes del nombre y la descripción
    const nombreLimpio = quitarTildes(p.nombre.toLowerCase());
    const descripcionLimpia = quitarTildes(p.descripcion.toLowerCase());

    const coincideTexto = nombreLimpio.includes(texto) || descripcionLimpia.includes(texto);
    const coincideCategoria = (categoria === "todas" || p.categoria === categoria);

    return coincideTexto && coincideCategoria;
  });

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

// Validación y mensaje de confirmación del formulario de contacto
const formContacto = document.querySelector(".form-contacto");
const alertaExito = document.getElementById("alerta-exito");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault(); // 1. Evita que la página se recargue

    // 2. Comprueba que todos los campos requeridos estén llenos
    if (formContacto.checkValidity()) {
      if (alertaExito) {
        alertaExito.classList.remove("d-none"); // Muestra la alerta de éxito
      }
      formContacto.reset(); // Limpia los campos del formulario
      
      // 3. Oculta el mensaje automáticamente después de 5 segundos
      setTimeout(() => {
        if (alertaExito) alertaExito.classList.add("d-none");
      }, 20000);
    } else {
      formContacto.reportValidity(); // Muestra los globos de error del navegador si falta algo
    }
  });
}