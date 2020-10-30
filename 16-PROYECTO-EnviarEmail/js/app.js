const iniciarApp = () => {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-5");
};

document.addEventListener("DOMContentLoaded", iniciarApp);

const form = document.getElementById("enviar-mail");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const btnReset = document.getElementById("resetBtn");

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

email.onblur = (e) => {
  validarFormulario(e);
};
asunto.onblur = (e) => {
  validarFormulario(e);
};
mensaje.onblur = (e) => {
  validarFormulario(e);
};
form.onsubmit = (e) => {
  e.preventDefault();
  enviarEmail();
};
btnReset.onclick = (e) => {
  e.preventDefault();
  resetearFormulario();
};

const validarFormulario = (event) => {
  const error = document.querySelector("p.error");

  if (event.target.value.length > 0) {
    if (event.target.type === "email") {
      if (!regex.test(event.target.value)) {
        event.target.classList.add("border", "border-red-500");
        mostrarError("El correo no es válido");
      } else {
        error && error.remove();
        event.target.classList.remove("border", "border-red-500");
        event.target.classList.add("border", "border-green-500");
      }
    } else {
      error && error.remove();
      event.target.classList.add("border", "border-green-500");
    }
  } else {
    event.target.classList.remove("border", "border-green-500");
    event.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (regex.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
};

const mostrarError = (mensaje) => {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.getElementsByClassName("error");

  if (errores.length === 0) {
    form.appendChild(mensajeError);
  }
};

const enviarEmail = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envío correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-5",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );

    form.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
    }, 2000);
  }, 3000);
};

const resetearFormulario = () => {
  form.reset();
  iniciarApp();
};
