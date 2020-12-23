import API from './api.js';
import * as UI from './interfaz.js';

const validarDatos = e => {
  e.preventDefault();

  const artista = document.querySelector('#artista').value;
  const cancion = document.querySelector('#cancion').value;

  if (artista === '' || cancion === '') {
    UI.divMensajes.textContent = 'Error, todos los campos son obligatorios';
    UI.divMensajes.classList.add('error');

    setTimeout(() => {
      UI.divMensajes.textContent = '';
      UI.divMensajes.classList.remove('error');
    }, 1500);

    return;
  }
  buscarCancion(artista, cancion);
};

const buscarCancion = (artista, cancion) => {
  const busqueda = new API(artista, cancion);
  busqueda.consultarCancion();
};

UI.formularioBuscar.onsubmit = validarDatos;
