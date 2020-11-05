const form = document.getElementById("formulario");
const listaTweets = document.getElementById("lista-tweets");
let tweets = [];

document.addEventListener("DOMContentLoaded", () => {
  tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  crearHTML();
});

form.onsubmit = (e) => {
  e.preventDefault();
  agregarTweet();
};

const agregarTweet = () => {
  const tweet = document.getElementById("tweet").value;

  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacío");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetObj];

  crearHTML();

  form.reset();
};

const mostrarError = (error) => {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.getElementById("contenido");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 1500);
};

const crearHTML = () => {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((twt) => {
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";
      btnEliminar.onclick = () => borrarTweet(twt.id);

      const li = document.createElement("li");
      li.innerText = twt.tweet;
      li.appendChild(btnEliminar);
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
};

const borrarTweet = (id) => {
  tweets = tweets.filter((twt) => twt.id !== id);

  crearHTML();
};

const sincronizarStorage = () => {
  localStorage.setItem("tweets", JSON.stringify(tweets));
};

const limpiarHTML = () => {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
};
