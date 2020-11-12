const formulario = document.getElementById("nueva-cita");
const mascotaInput = document.getElementById("mascota");
const propietarioInput = document.getElementById("propietario");
const telefonoInput = document.getElementById("telefono");
const fechaInput = document.getElementById("fecha");
const horaInput = document.getElementById("hora");
const sintomasInput = document.getElementById("sintomas");
const contenedorCitas = document.getElementById("citas");

let editando;

const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

const reiniciarObjeto = () => {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
};

const cargarEdicion = (cita) => {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  formulario.querySelector('button[type="submit"]').textContent =
    "Guardar cambios";

  editando = true;
};

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    ui.imprimirAlerta("La cita se eliminó correctamente");
    ui.imprimirCitas(administrarCitas);
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.className = "text-center alert d-block col-12";

    tipo === "error"
      ? divMensaje.classList.add("alert-danger")
      : divMensaje.classList.add("alert-success");

    divMensaje.textContent = mensaje;

    document
      .getElementById("contenido")
      .insertBefore(
        divMensaje,
        document.getElementById("contenido").firstChild
      );

    setTimeout(() => {
      divMensaje.remove();
    }, 2000);
  }

  imprimirCitas({ citas }) {
    this.limpiarHTML();

    citas.forEach((cita) => {
      const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
        id,
      } = cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;
      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
			<span class='font-weight-bolder'>Propietario: </span>${propietario}
			`;
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
			<span class='font-weight-bolder'>Telefono: </span>${telefono}
			`;
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
			<span class='font-weight-bolder'>Fecha: </span>${fecha}
			`;
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
			<span class='font-weight-bolder'>Hora: </span>${hora}
			`;
      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `
			<span class='font-weight-bolder'>Sintomas: </span>${sintomas}
			`;
      const btnEliminar = document.createElement("button");
      btnEliminar.className = "btn btn-danger mr-2";
      btnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
      const btnEditar = document.createElement("button");
      btnEditar.className = "btn btn-info";
      btnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>`;

      btnEliminar.onclick = () => administrarCitas.eliminarCita(id);
      btnEditar.onclick = () => cargarEdicion(cita);

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

const datosCita = (e) => {
  const { name, value } = e.target;
  citaObj[name] = value;
};

const nuevaCita = (e) => {
  e.preventDefault();

  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los cambios son obligatorios", "error");
    return;
  }

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    administrarCitas.editarCita({ ...citaObj });

    formulario.querySelector('button[type="submit"]').textContent =
      "Crear cita";

    editando = false;
  } else {
    citaObj.id = Date.now();

    administrarCitas.agregarCita({ ...citaObj });

    ui.imprimirAlerta("Cita agregada correctamente");
  }

  formulario.reset();

  reiniciarObjeto();

  ui.imprimirCitas(administrarCitas);
};

mascotaInput.oninput = datosCita;
propietarioInput.oninput = datosCita;
telefonoInput.oninput = datosCita;
fechaInput.oninput = datosCita;
horaInput.oninput = datosCita;
sintomasInput.oninput = datosCita;
formulario.onsubmit = nuevaCita;
