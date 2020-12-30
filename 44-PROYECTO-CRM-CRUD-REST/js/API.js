const url = 'http://localhost:4000/clientes';

class API {
  async obtenerClientes() {
    const data = await fetch(url);
    return data;
  }

  async nuevoCliente(cliente) {
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(cliente),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async obtenerCliente(id) {
    try {
      const data = await fetch(`${url}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async actualizarCliente(cliente) {
    try {
      await fetch(`${url}/${cliente.id}`, {
        method: 'PUT',
        body: JSON.stringify(cliente),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async eliminarCliente(cliente) {
    try {
      const respuesta = await fetch(`${url}/${cliente}`);
      const clienteObj = await respuesta.json();
      await fetch(`${url}/${clienteObj.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default API;
