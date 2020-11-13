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
let DB;

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
    administrarCitas.editarCita({ ...citaObj });

    const transaction = DB.transaction(["citas"], "readwrite");

    const objectStore = transaction.objectStore("citas");

    objectStore.put(citaObj);

    transaction.oncomplete = () => {
      ui.imprimirAlerta("Editado correctamente");

      formulario.querySelector('button[type="submit"]').textContent =
        "Crear cita";

      editando = false;
    };

    transaction.onerror = () => {
      ui.imprimirAlerta("Hubo un error al actualizar la cita", "error");
    };
  } else {
    citaObj.id = Date.now();

    administrarCitas.agregarCita({ ...citaObj });

    const transaction = DB.transaction(["citas"], "readwrite");

    const objectStore = transaction.objectStore("citas");

    objectStore.add(citaObj);

    transaction.oncomplete = () => {
      console.log("Cita agregada");
      ui.imprimirAlerta("Cita agregada correctamente");
    };
  }

  formulario.reset();

  reiniciarObjeto();

  ui.imprimirCitas(DB);
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

export const crearDB = () => {
  const crearDB = window.indexedDB.open("citas", 1);

  crearDB.onerror = () => {};

  crearDB.onsuccess = () => {
    DB = crearDB.result;

    ui.imprimirCitas(DB);
  };

  crearDB.onupgradeneeded = (e) => {
    const db = e.target.result;

    const objectStore = db.createObjectStore("citas", {
      keyPath: "id",
      autoIncrement: true,
    });

    objectStore.createIndex("mascota", "mascota", { unique: false });
    objectStore.createIndex("propietario", "propietario", { unique: false });
    objectStore.createIndex("telefono", "telefono", { unique: false });
    objectStore.createIndex("fecha", "fecha", { unique: false });
    objectStore.createIndex("hora", "hora", { unique: false });
    objectStore.createIndex("sintomas", "sintomas", { unique: false });
    objectStore.createIndex("id", "id", { unique: true });

    console.log("DataBase creada y lista");
  };
};
