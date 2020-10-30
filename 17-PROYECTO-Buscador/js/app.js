const marca = document.getElementById("marca");
const year = document.getElementById("year");
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");
const puertas = document.getElementById("puertas");
const transmision = document.getElementById("color");
const color = document.getElementById("transmision");
const resultado = document.getElementById("resultado");
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos);
  llenarYears();
});

marca.onchange = (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
};
year.onchange = (e) => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
};
minimo.onchange = (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
};
maximo.onchange = (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
};
puertas.onchange = (e) => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
};
transmision.onchange = (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
};
color.onchange = (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
};

const mostrarAutos = (autos) => {
  limpiarHTML();

  autos.forEach((auto) => {
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `
			${auto.marca} ${auto.modelo} - ${auto.year} - ${auto.puertas} Puertas - Transmisión: ${auto.transmision} - Precio: ${auto.precio} - Color: ${auto.color}
		`;
    resultado.appendChild(autoHTML);
  });
};

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const llenarYears = () => {
  for (let i = maxYear; i >= minYear; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    year.appendChild(opcion);
  }
};

const filtrarAuto = () => {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length > 0) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
};

const filtrarMarca = (auto) => {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
};

const filtrarYear = (auto) => {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === year;
  }
  return auto;
};

const filtrarMinimo = (auto) => {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
};

const filtrarMaximo = (auto) => {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
};

const filtrarPuertas = (auto) => {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
};

const filtrarTransmision = (auto) => {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
};

const filtrarColor = (auto) => {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
};

const noResultado = () => {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay Resultados";
  resultado.appendChild(noResultado);
};
