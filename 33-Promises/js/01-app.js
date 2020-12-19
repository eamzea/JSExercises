const paises = [];

const nuevoPais = pais =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      paises.push(pais);
      resolve(`País agregado: ${pais}`);
    }, 1000);
  });

nuevoPais('Alemania')
  .then(respuesta => {
    console.log(respuesta);
    console.log(paises);
    return nuevoPais('Francia');
  })
  .then(resultado => {
    console.log(resultado);
    console.log(paises);
    return nuevoPais('Inglaterra');
  });
  .then(resultado => {
    console.log(resultado);
    console.log(paises);
  });
