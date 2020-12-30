import API from './API.js';
import { imprimirAlerta } from './funciones.js';

const apiDB = new API();

(() => {
  const formulario = document.querySelector('#formulario');

  const validarCliente = async e => {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
    };

    if (Object.values(cliente).every(input => input === '')) {
      return imprimirAlerta('Todos los campos son obligatorios', 'error');
    }

    cliente.id = Date.now();

    try {
      await apiDB.nuevoCliente(cliente);

      imprimirAlerta('Cliente agregado exitosamente');

      window.location.href = 'index.html';
    } catch (error) {
      imprimirAlerta('Hubo un error al agregar el cliente', 'error');

      console.log(error);
    }
  };

  formulario.onsubmit = validarCliente;
})();
