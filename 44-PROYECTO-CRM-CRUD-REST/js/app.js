import API from './API.js';

const apiDB = new API();

(() => {
  let DB;

  const borrarRegistro = async event => {
    event.preventDefault();
    const { cliente } = event.target.dataset;

    const confirmar = confirm('¿Deseas borrar este cliente?');

    if (confirmar) {
      try {
        console.log('object');
        const respuesta = await apiDB.eliminarCliente(cliente);
        console.log(respuesta);
      } catch (error) {
        imprimirAlerta('Hubo un error al tratar de borrar el cliente', 'error');
      }
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await apiDB.obtenerClientes();
      const clientes = await respuesta.json();

      clientes.map(cliente => {
        const { nombre, email, telefono, empresa, id } = cliente;

        const listadoClientes = document.querySelector('#listado-clientes');
        listadoClientes.innerHTML += `
				<tr>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
								<p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
								<p class="text-sm leading-10 text-gray-700"> ${email} </p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
								<p class="text-gray-700">${telefono}</p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
								<p class="text-gray-600">${empresa}</p>
						</td>
						<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
								<a href="editar-cliente.html?id=${id}" class="rounded-2xl bg-blue-300 hover:bg-blue-400 px-5 py-3 text-gray-100 hover:text-gray-600 mr-5">Editar</a>
								<a href="#" data-cliente="${id}" data-name="delete" class=" text-red-300 hover:text-red-600">Eliminar</a>
						</td>
				</tr>
		`;

        [...document.querySelectorAll('a')]
          .filter(e => e.dataset.name === 'delete')
          .map(btn => (btn.onclick = borrarRegistro));
      });
    } catch (error) {
      console.log('Hubo un error', error);
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    obtenerClientes();
  });
})();
