const carrito = document.getElementById("carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const listaCursos = document.getElementById("lista-cursos");
let articulosCarrito = [];

document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carritoHTML();
});

listaCursos.onclick = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatos(cursoSeleccionado);
  }
};

carrito.onclick = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const id = e.target.getAttribute("data-id");
    eliminarCurso(id);
  }
};

vaciarCarrito.onclick = (e) => {
  e.preventDefault();
  articulosCarrito = [];
  limpiarHTML();
};

const eliminarCurso = (id) => {
  articulosCarrito = articulosCarrito.filter((curso) => curso.id !== id);
  carritoHTML();
};

const leerDatos = (curso) => {
  const infoCurso = {
    img: `img${curso.querySelector("img").src.split("img")[1]}`,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
};

const carritoHTML = () => {
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    const { img, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
			<td>
				<img src=${img} width=100>
			</td>
			<td>
				${titulo}
			</td>
			<td>
				${precio}
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-curso" data-id=${id}>X</a>
			</td>
		`;
    contenedorCarrito.appendChild(row);
  });

  sincronizarStorage();
};

const sincronizarStorage = () => {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
};

const limpiarHTML = () => {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
};
