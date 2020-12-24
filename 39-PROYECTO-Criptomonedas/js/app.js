const selectorCriptoMoneda = document.querySelector('#criptomonedas');
const selectorMoneda = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const spinner = document.querySelector('#spinner');

const objetoBusqueda = {
  moneda: '',
  criptomoneda: '',
};

const leerValor = e => {
  objetoBusqueda[e.target.name] = e.target.value;
};

const obtenerCriptoMonedas = criptomonedas =>
  new Promise(resolve => {
    resolve(criptomonedas);
  });

const selectCriptoMonedas = criptomonedas => {
  criptomonedas.forEach(cripto => {
    const {
      CoinInfo: { FullName, Name },
    } = cripto;

    const option = document.createElement('option');
    option.value = Name;
    option.innerText = FullName;

    selectorCriptoMoneda.appendChild(option);
  });

  selectorCriptoMoneda.onchange = leerValor;
};

const consultarCriptoMonedas = () => {
  const url =
    'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(data => obtenerCriptoMonedas(data.Data))
    .then(criptomonedas => selectCriptoMonedas(criptomonedas));
};

const mostrarAlerta = mensaje => {
  if (!document.querySelector('.bg-red-100')) {
    const alerta = document.createElement('p');
    alerta.classList = 'error';
    alerta.innerHTML = `
			<strong class='font-bold'>Error !</strong>
			<span style='display: block'>${mensaje}</span>
		`;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 1500);
  }
};

const limpiarHTML = () => {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

const imprimirPrecio = cotizacion => {
  spinner.classList.add('d-none');

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

  const precio = document.createElement('p');
  precio.classList.add('precio');
  precio.innerHTML = `
		Precio: <span>${PRICE.split(' ').reverse().join(' ')}</span>
	`;

  const precioAlto = document.createElement('p');
  precioAlto.innerHTML = `
		Precio más alto del día: <span>${HIGHDAY.split(' ').reverse().join(' ')}</span>
	`;

  const precioBajo = document.createElement('p');
  precioBajo.innerHTML = `
		Precio más bajo del día: <span>${LOWDAY.split(' ').reverse().join(' ')}</span>
	`;

  const variacion = document.createElement('p');
  variacion.innerHTML = `
		Variación últimas 24 hr: <span>${CHANGEPCT24HOUR} %</span>
	`;

  const actualizacion = document.createElement('p');
  actualizacion.innerHTML = `
		Última actualización: <span>${LASTUPDATE}</span>
	`;

  resultado.appendChild(precio);
  resultado.appendChild(precioAlto);
  resultado.appendChild(precioBajo);
  resultado.appendChild(variacion);
  resultado.appendChild(actualizacion);
};

const cotizarCriptoMoneda = (moneda, criptomoneda) => {
  spinner.classList.remove('d-none');

  limpiarHTML();

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(({ DISPLAY }) => imprimirPrecio(DISPLAY[criptomoneda][moneda]));
};

const validarFormulario = e => {
  e.preventDefault();

  const { moneda, criptomoneda } = objetoBusqueda;

  if (moneda === '' || criptomoneda === '') {
    return mostrarAlerta('Debes seleccionar una moneda y una criptomoneda');
  }

  cotizarCriptoMoneda(moneda, criptomoneda);
};

window.onload = consultarCriptoMonedas;
selectorMoneda.onchange = leerValor;
formulario.onsubmit = validarFormulario;

('https://www.cryptocompare.com/cryptopian/activate?h=e8cf54c9abc38e710e2dc7b8dde17da18b0805d15f71913c18216f5a920e34f7&user_id=2082247&api_key=433b79ff4a6b6cc1c106bb8da37b78ee45d656f10c6d67fa63763a5aba710d70');
