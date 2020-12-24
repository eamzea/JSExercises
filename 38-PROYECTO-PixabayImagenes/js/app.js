const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');
const spinner = document.querySelector('#spinner');
const registros = 40;
let termino = '';
let paginas = 0;
let iterador = 0;
let paginaActual = 1;

const mostrarMensaje = mensaje => {
  if (!document.querySelector('.bg-red-100')) {
    const alerta = document.createElement('p');
    alerta.classList =
      'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-lg mx-auto mt-6 text-center';
    alerta.innerHTML = `
			<strong class='font-bold'>Error !</strong>
			<span class='block '>${mensaje}</span>
		`;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }
};

function* crearPaginador(total) {
  for (let i = 1; i <= paginas; i++) {
    yield i;
  }
}

const paginaSiguiente = pagina => {
  paginaActual = pagina;
  buscarImagenes();
};

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const imprimirIterador = () => {
  iterador = crearPaginador(paginas);

  while (true) {
    const { done, value } = iterador.next();

    if (done) return;

    const boton = document.createElement('a');
    boton.href = '#';
    boton.dataset.pagina = value;
    boton.textContent = value;
    boton.className =
      'siguiente bg-yellow-400 px-4 py-1 mr-2 font-bold mb-5 rounded';
    boton.onclick = e => {
      limpiarHTML();
      paginaSiguiente(value);
    };

    paginacionDiv.appendChild(boton);
  }
};

const pintarImagenes = imgs => {
  limpiarHTML();

  imgs.forEach(img => {
    const { likes, views, largeImageURL } = img;

    resultado.innerHTML += `
		<div class='w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4'>
			<div class='bg-white'>
				<img class='w-full' src='${largeImageURL}'>
				<div class='p-4'>
					<p class='font-bold'>
						${likes} <span class='font-light'>Me Gusta</span>
					</p>
					<p class='font-bold'>
						${views} <span class='font-light'>Vistas</span>
					</p>
					<a class='w-full block cursor-pointer bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-2 href=${largeImageURL} target='_blank' rel='noopnener noreferrer'>Ver Imagen</a>
				</div>
			</div>
		</div>
		`;
  });

  while (paginacionDiv.firstChild) {
    paginacionDiv.removeChild(paginacionDiv.firstChild);
  }

  imprimirIterador(paginas);
};

const calcularPaginas = total => {
  return parseInt(Math.ceil(total / registros));
};

const buscarImagenes = () => {
  spinner.classList.remove('hidden');

  const key = '19631690-a75669b666d0b7a2777e34a26';
  const url = 'https://pixabay.com/api/';

  fetch(
    `${url}?key=${key}&q=${encodeURI(
      termino
    )}&image_type=photo&per_page=${registros}&page=${paginaActual}`
  )
    .then(response => response.json())
    .then(data => {
      paginas = calcularPaginas(data.totalHits);
      spinner.classList.add('hidden');
      pintarImagenes(data.hits);
    });
};

const validarFormulario = e => {
  e.preventDefault();
  termino = document.querySelector('#termino').value;

  if (termino === '') {
    return mostrarMensaje('Agrega alguna palabra para buscar');
  }

  buscarImagenes(termino);
};

formulario.onsubmit = validarFormulario;
