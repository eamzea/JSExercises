const crearDB = () => {
  const crearDB = window.indexedDB.open('crm', 1);

  crearDB.onerror = () => {
    console.log('Hubo un error');
  };

  crearDB.onsuccess = () => {
    DB = crearDB.result;
  };

  crearDB.onupgradeneeded = e => {
    const db = e.target.result;

    const objectStore = db.createObjectStore('crm', {
      keyPath: 'id',
      autoIncrement: true,
    });

    objectStore.createIndex('nombre', 'nombre', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    objectStore.createIndex('telefono', 'telefono', { unique: false });
    objectStore.createIndex('empresa', 'empresa', { unique: false });
    objectStore.createIndex('id', 'id', { unique: true });

    console.log('DataBase creada y lista');
  };
};

const imprimirAlerta = (mensaje, tipo) => {
  const alerta = document.querySelector('.alerta');

  if (!alerta) {
    const divMensaje = document.createElement('div');
    divMensaje.classList.add(
      'px-4',
      'py-3',
      'rounded',
      'max-w-lg',
      'mx-auto',
      'mt-6',
      'ext-center',
      'border',
      'alerta'
    );

    if (tipo === 'error') {
      divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
    } else {
      divMensaje.classList.add(
        'bg-green-100',
        'border-green-400',
        'text-green-700'
      );
    }
    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 2500);
  }
};
