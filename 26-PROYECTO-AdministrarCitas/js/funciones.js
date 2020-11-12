import Citas from "./Citas.js";
import {
  fechaInput,
  formulario,
  horaInput,
  mascotaInput,
  propietarioInput,
  sintomasInput,
  telefonoInput,
} from "./selectores.js";
import UI from "./UI.js";

export const ui = new UI();
export const administrarCitas = new Citas();

let editando;

const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

export const datosCita = (e) => {
  const { name, value } = e.target;
  citaObj[name] = value;
};

export const nuevaCita = (e) => {
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

export const reiniciarObjeto = () => {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
};

export const cargarEdicion = (cita) => {
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
