let presupuesto;
const formulario = document.getElementById("agregar-gasto");
const listaGastos = document.querySelector("#gastos ul");

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );

    this.restante = this.presupuesto - gastado;
  }

  eliminarGasto(id) {
    this.gastos = this.gastos.filter((gasto) => gasto.id !== id);
    ui.agregarGastoListado(this.gastos);
    this.calcularRestante();
    ui.actualizarRestante(this.restante);
    ui.comprobarPresupuesto(this.presupuesto);
  }
}

class UI {
  insertarPresupuesto(cantidad) {
    const { presupuesto, restante } = cantidad;
    document.getElementById("total").textContent = presupuesto;
    document.getElementById("restante").textContent = restante;
  }

  imprimirAlerta(mensaje, tipo) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("text-center", "alert");

    tipo === "error"
      ? mensajeDiv.classList.add("alert-danger")
      : mensajeDiv.classList.add("alert-success");

    mensajeDiv.textContent = mensaje;

    document.querySelector(".primario").insertBefore(mensajeDiv, formulario);

    setTimeout(() => {
      mensajeDiv.remove();
    }, 1500);
  }

  agregarGastoListado(gastos) {
    this.limpiarHTML();

    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;
      nuevoGasto.innerHTML = `
				${nombre} <span class='badge badge-primary badge-pill'>$ ${cantidad}</span>
			`;

      const btnBorrar = document.createElement("button");
      btnBorrar.className = "btn btn-danger borrar-gasto";
      btnBorrar.innerHTML = "Borrar &times;";
      btnBorrar.onclick = () => presupuesto.eliminarGasto(id);

      nuevoGasto.appendChild(btnBorrar);

      listaGastos.appendChild(nuevoGasto);
    });
  }

  limpiarHTML() {
    while (listaGastos.firstChild) {
      listaGastos.removeChild(listaGastos.firstChild);
    }
  }

  actualizarRestante(cantidad) {
    document.getElementById("restante").textContent = cantidad;
  }

  comprobarPresupuesto(presupuestoObj) {
    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector(".restante");

    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.remove("alert-danger", "alert-warning");
      restanteDiv.classList.add("alert-success");
    }

    if (restante <= 0) {
      ui.imprimirAlerta("El presupuesto se ha agotado", "error");
      formulario.querySelector('button[type="submit"]').disabled = true;
    }
  }
}

const ui = new UI();

const preguntarPresupuesto = () => {
  const presupuestoUsuario = prompt("¿Cuál es tu presupuesto?");

  if (presupuestoUsuario === null) {
    alert("Es necesario registrar un presupuesto");
    window.location.reload();
  } else if (
    presupuestoUsuario === "" ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);

  ui.insertarPresupuesto(presupuesto);
};

const agregarGasto = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("gasto").value;
  const cantidad = Number(document.getElementById("cantidad").value);

  if (nombre === "" || cantidad === "") {
    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("Cantidad no válida", "error");
  }

  const gasto = {
    nombre,
    cantidad,
    id: Date.now(),
  };

  presupuesto.nuevoGasto(gasto);

  ui.imprimirAlerta("Gasto agregado correctamente");

  const { gastos, restante } = presupuesto;

  ui.agregarGastoListado(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);

  formulario.reset();
};

document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
formulario.onsubmit = agregarGasto;
