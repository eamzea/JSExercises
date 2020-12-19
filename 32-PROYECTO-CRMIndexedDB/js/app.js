(() => {
  let DB;

  const borrarRegistro = event => {
    const { cliente } = event.target.dataset;

    const confirmar = confirm('¿Deseas borrar este cliente?');

    if (confirmar) {
      const abrirConexion = window.indexedDB.open('crm', 1);

      abrirConexion.onsuccess = () => {
        DB = abrirConexion.result;

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.delete(Number(cliente));

        transaction.oncomplete = e => {
          event.target.parentElement.parentElement.remove();
        };

        transaction.onerror = () => {
          imprimirAlerta(
            'Hubo un error al tratar de borrar el cliente',
            'error'
          );
        };
      };
    }
  };

  const obtenerClientes = () => {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;

      const objectStore = DB.transaction('crm').objectStore('crm');
      objectStore.openCursor().onsuccess = e => {
        const cursor = e.target.result;

        if (cursor) {
          const { nombre, email, telefono, empresa, id } = cursor.value;

          const listadoClientes = document.querySelector('#listado-clientes');
          listadoClientes.innerHTML += ` <tr>
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
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" data-name="delete" class="text-red-600 hover:text-red-900">Eliminar</a>
          </td>
      </tr>
	`;
          [...document.querySelectorAll('a')]
            .filter(e => e.dataset.name === 'delete')
            .map(btn => (btn.onclick = borrarRegistro));

          cursor.continue();
        }
      };
    };
  };

  window.addEventListener('DOMContentLoaded', () => {
    crearDB();

    if (window.indexedDB.open('crm', 1)) {
      obtenerClientes();
    }
  });
})();
