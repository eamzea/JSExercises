const formulario = document.getElementById("cotizar-seguro");

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  let base = 2000;
  switch (this.marca) {
    case "Americano":
      cantidad = base * 1.15;
      break;
    case "Asiatico":
      cantidad = base * 1.05;
      break;
    case "Europeo":
      cantidad = base * 1.35;
      break;
    default:
      cantidad;
      break;
  }

  const diferencia = new Date().getFullYear() - this.year;
  cantidad = cantidad - (diferencia * 3 * cantidad) / 100;

  return this.tipo === "basico" ? (cantidad += 1.3) : (cantidad *= 1.5);
};

function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear();
  const min = max - 20;

  const selectYear = document.getElementById("year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  formulario.insertBefore(div, document.getElementById("resultado"));

  setTimeout(() => {
    div.remove();
  }, 1500);
};

UI.prototype.mostrarResultado = (total, seguro) => {
  const { marca, year, tipo } = seguro;
  const div = document.createElement("div");
  div.classList.add("mt-10");
  div.innerHTML = `
		<p class='header'>Tu resumen</p>
		<p class='font-bold'>Marca: <span class='font-normal'>${marca}</span> </p>
		<p class='font-bold'>Año: <span class='font-normal'>${year}</span> </p>
		<p class='font-bold'>Tipo: <span class='font-normal'>${tipo}</span> </p>
		<p class='font-bold'>Total: <span class='font-normal'>$ ${total}</span> </p>
	`;

  const resultadoDiv = document.getElementById("resultado");

  const spinner = document.getElementById("cargando");
  spinner.classList.remove("hidden");

  setTimeout(() => {
    spinner.classList.add("hidden");
    resultadoDiv.appendChild(div);
  }, 1500);
};

const cotizarSeguro = (e) => {
  e.preventDefault();

  const marca = document.getElementById("marca").value;
  const year = document.getElementById("year").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || year === "" || tipo === "") {
    return ui.mostrarMensaje("Todos los campos son requeridos", "error");
  }

  ui.mostrarMensaje("Cotizando...", "correcto");

  const resultados = document.querySelector("#resultado div");

  if (resultados !== null) {
    resultados.remove();
  }

  console.log(tipo);
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(total, seguro);
};

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

formulario.onsubmit = cotizarSeguro;
