import API from './API.js';
import { imprimirAlerta } from './funciones.js';

const apiDB = new API();

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

  const obtenerCliente = async id => {
    try {
      const respuesta = await apiDB.obtenerCliente(id);
      const cliente = await respuesta.json();

      llenarFormulario(cliente);
    } catch (error) {
      console.log(error);
    }
  };

  const validarCliente = async e => {
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

    try {
      await apiDB.actualizarCliente(clienteActualizado);
      imprimirAlerta('El cliente fue editado correctamente');

      window.location.href = 'index.html';
    } catch (error) {
      imprimirAlerta(
        'Hubo un error al tratar de actualizar el cliente',
        'error'
      );
      console.log(error);
    }
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
