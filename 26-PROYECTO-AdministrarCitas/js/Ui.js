import { administrarCitas, cargarEdicion } from "./funciones.js";
import { contenedorCitas } from "./selectores.js";

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

  imprimirCitas(db) {
    this.limpiarHTML();

    const objectStore = db.transaction(["citas"]).objectStore("citas");

    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
        const {
          mascota,
          propietario,
          telefono,
          fecha,
          hora,
          sintomas,
          id,
        } = cursor.value;

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

        btnEliminar.onclick = () => administrarCitas.eliminarCita(db, id);
        const cita = cursor.value;
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

        cursor.continue();
      }
    };
  }

  limpiarHTML() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
