const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

const convertirGrados = grados => `${Math.round(grados - 273.15)} &#8451`;

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const spinner = () => {
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.className = 'sk-fading-circle';
  divSpinner.innerHTML = `
		<div class="sk-circle1 sk-child"></div>
		<div class="sk-circle2 sk-child"></div>
		<div class="sk-circle3 sk-child"></div>
		<div class="sk-circle4 sk-child"></div>
		<div class="sk-circle5 sk-child"></div>
		<div class="sk-circle6 sk-child"></div>
		<div class="sk-circle7 sk-child"></div>
		<div class="sk-circle8 sk-child"></div>
		<div class="sk-circle9 sk-child"></div>
		<div class="sk-circle10 sk-child"></div>
		<div class="sk-circle11 sk-child"></div>
		<div class="sk-circle12 sk-child"></div>
	`;

  resultado.appendChild(divSpinner);
};

const mostrarClima = datos => {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const cityName = document.createElement('p');
  cityName.textContent = `Clima en ${name}`;
  cityName.className = 'font-bold text-3xl';

  const actual = document.createElement('p');
  actual.innerHTML = convertirGrados(temp);
  actual.className = 'font-bold text-6xl';

  const tempMax = document.createElement('p');
  tempMax.innerHTML = `Máxima: ${convertirGrados(temp_max)}`;
  tempMax.className = 'text-xl';

  const tempMin = document.createElement('p');
  tempMin.innerHTML = `Mínima: ${convertirGrados(temp_min)}`;
  tempMin.className = 'text-xl';

  const resultadoDiv = document.createElement('div');
  resultadoDiv.className = 'text-center text-white';

  resultadoDiv.appendChild(cityName);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
};

const consultarClima = (ciudad, pais) => {
  const apiKEY = 'e582fdf5119c8f2072a7f71a2555e8a8';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKEY}`;

  spinner();

  fetch(url)
    .then(response => response.json())
    .then(data => {
      limpiarHTML();
      if (data.cod === '404') {
        return mostrarError('Ciudad no encontrada');
      }

      mostrarClima(data);
    });
};

const mostrarError = txt => {
  if (!document.querySelector('.bg-red-400')) {
    const alerta = document.createElement('div');
    alerta.className =
      'bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-6 text-center';

    alerta.innerHTML = `
			<strong class='font-bold'>Error !</strong>
			<span class='block'>${txt}</span>
		`;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }
};

const validarSeleccion = e => {
  e.preventDefault();

  const ciudad = document.querySelector('#ciudad').value;
  const pais = document.querySelector('#pais').value;

  if (ciudad === '' || pais === '') {
    return mostrarError('Ambos cambos son obligatorios');
  }

  consultarClima(ciudad, pais);
};

window.onload = () => {
  formulario.onsubmit = validarSeleccion;
};
