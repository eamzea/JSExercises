const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const busqueda = document.querySelector('#busqueda');
const spinner = document.querySelector('#spinner');

const mostrarAlerta = mensaje => {
  if (!document.querySelector('.bg-red-500')) {
    const alerta = document.createElement('p');
    alerta.classList = 'bg-red-500 p-5 mt-5';
    alerta.innerHTML = `
			<strong class='font-bold text-white'>Error !</strong>
			<span class='text-white block'>${mensaje}</span>
		`;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }
};

const mostrarResultados = vacantes => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }

  if (vacantes.length <= 0) {
    return mostrarAlerta(
      'La búsqueda no arrojó ningún resultado, intenta con una nueva búsqueda'
    );
  }

  spinner.classList.add('d-none');

  resultado.classList.add('grid');

  vacantes.forEach(vacante => {
    const { title, company, type, url } = vacante;

    resultado.innerHTML += `
			<div class="shadow bg-white p-6 rounded">
					<h2 class="text-2xl font-light mb-4">${title}</h2>
					<p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
					<p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
					<a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
			</div>
		`;
  });
};

const realizarConsulta = async criterio => {
  spinner.classList.remove('d-none');

  const url = `https://jobs.github.com/positions.json?search=${criterio}`;
  const cors = `http://api.allorigins.win/get?url=${url}`;

  // Promises
  // axios.get(cors).then(respuesta => {
  //   const data = JSON.parse(respuesta.data.contents);

  //   return mostrarResultados(data);
  // });

  // Async/Await
  const respuesta = await axios.get(cors);
  const data = await JSON.parse(respuesta.data.contents);
  mostrarResultados(data);
};

const validarBusqueda = e => {
  e.preventDefault();

  if (busqueda.value.length < 3) {
    return mostrarAlerta('Búsqueda muy corta. Añade más información');
  }

  realizarConsulta(busqueda.value);
};

formulario.onsubmit = validarBusqueda;
