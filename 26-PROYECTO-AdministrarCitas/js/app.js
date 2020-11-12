import { datosCita, nuevaCita } from "./funciones.js";
import {
  fechaInput,
  formulario,
  horaInput,
  mascotaInput,
  propietarioInput,
  sintomasInput,
  telefonoInput,
} from "./selectores.js";

mascotaInput.oninput = datosCita;
propietarioInput.oninput = datosCita;
telefonoInput.oninput = datosCita;
fechaInput.oninput = datosCita;
horaInput.oninput = datosCita;
sintomasInput.oninput = datosCita;
formulario.onsubmit = nuevaCita;
