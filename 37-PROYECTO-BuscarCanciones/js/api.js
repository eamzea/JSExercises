import * as UI from './interfaz.js';

class API {
  constructor(artista, cancion) {
    this.artista = artista;
    this.cancion = cancion;
  }

  consultarCancion() {
    const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { lyrics } = data;

        if (lyrics.length === 0) {
          (UI.divMensajes.textContent =
            'Error, no se ha encontrado información con los datos proporcionados'),
            UI.divMensajes.classList.add('error');
          setTimeout(() => {
            UI.divMensajes.textContent = '';
            UI.divMensajes.classList.remove('error');
          }, 1500);

          return;
        }

        UI.divResultado.textContent = lyrics;
        UI.headingResultado.textContent = `Letra de ${this.cancion} de ${this.artista}`;
      });
  }
}

export default API;
