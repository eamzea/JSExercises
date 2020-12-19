(() => {
  const formulario = document.querySelector('#formulario');
  let idCliente;

  const llenarFormulario = cliente => {
    const nombre = document.querySelector('#nombre');
    const email = document.querySelector('#email');
    const telefono = document.querySelector('#telefono');
    const empresa = document.querySelector('#empresa');

    nombre.value = cliente.nombre;
    email.value = cliente.email;
    telefono.value = cliente.telefono;
    empresa.value = cliente.empresa;
  };

  const obtenerCliente = id => {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;

      const transaction = DB.transaction(['crm'], 'readonly');
      const objectStore = transaction.objectStore('crm');

      const cliente = objectStore.openCursor();

      cliente.onsuccess = e => {
        const cursor = e.target.result;

        if (cursor) {
          if (cursor.value.id == id) {
            llenarFormulario(cursor.value);
          }

          cursor.continue();
        }
      };
    };

    abrirConexion.onerror = () => {
      console.log('Hubo un error');
    };
  };

  const actualizarCliente = cliente => {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;

      const transaction = DB.transaction(['crm'], 'readwrite');
      const objectStore = transaction.objectStore('crm');

      objectStore.put(cliente);

      transaction.oncomplete = e => {
        imprimirAlerta('El cliente fue editado correctamente');

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      };

      transaction.onerror = () => {
        imprimirAlerta(
          'Hubo un error al tratar de actualizar el cliente',
          'error'
        );
      };
    };
  };

  const validarCliente = e => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    if (nombre === '' || email === '' || telefono === '' || empresa === '') {
      return imprimirAlerta('Todos los campos son obligatorios', 'error');
    }

    const clienteActualizado = {
      nombre,
      email,
      telefono,
      empresa,
      id: Number(idCliente),
    };

    actualizarCliente(clienteActualizado);
  };

  formulario.onsubmit = validarCliente;

  document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    idCliente = params.get('id');

    if (idCliente) {
      obtenerCliente(idCliente);
    }
  });
})();
