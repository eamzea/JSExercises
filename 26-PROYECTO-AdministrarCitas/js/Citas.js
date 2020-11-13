import { administrarCitas, ui } from "./funciones.js";

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  eliminarCita(db, id) {
    const transaction = db.transaction(["citas"], "readwrite");
    const objectStore = transaction.objectStore("citas");

    objectStore.delete(id);

    transaction.oncomplete = () => {
      ui.imprimirAlerta("La cita se eliminó correctamente");
      ui.imprimirCitas(db);
    };

    transaction.onerror = () => {
      ui.imprimirAlerta("Hubo un error al borrar la cita", "error");
    };
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map((cita) =>
      cita.id === citaActualizada.id ? citaActualizada : cita
    );
  }
}

export default Citas;
