(() => {
  let DB;

  const formulario = document.querySelector('#formulario');

  const crearNuevoCliente = cliente => {
    const abrirConexion = window.indexedDB.open('crm', 1);

    abrirConexion.onsuccess = () => {
      DB = abrirConexion.result;

      const transaction = DB.transaction(['crm'], 'readwrite');
      const objectStore = transaction.objectStore('crm');

      objectStore.add(cliente);

      transaction.onerror = () => {
        imprimirAlerta('Hubo un error al agregar el cliente', 'error');
      };

      transaction.oncomplete = () => {
        imprimirAlerta('Cliente agregado exitosamente');

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      };
    };

    abrirConexion.onerror = () => {
      imprimirAlerta('Hubo un error al agregar el cliente', 'error');
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

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now(),
    };

    crearNuevoCliente(cliente);
  };

  formulario.onsubmit = validarCliente;

  document.onload = () => {
    conectarDB();
  };
})();
