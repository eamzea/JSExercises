// Functional Programming

const suma = (a, b) => a + b;
const multiplicar = (a, b) => a * b;

const sumarOmultiplicar = fn => fn(10, 20);

console.log(sumarOmultiplicar(suma));
console.log(sumarOmultiplicar(multiplicar));

// First Class Functions

const carrito = [
  { nombre: 'Monitor 20 Pulgadas', precio: 500 },
  { nombre: 'Televisión 50 Pulgadas', precio: 700 },
  { nombre: 'Tablet', precio: 300 },
  { nombre: 'Audifonos', precio: 200 },
  { nombre: 'Teclado', precio: 50 },
  { nombre: 'Celular', precio: 500 },
  { nombre: 'Bocinas', precio: 300 },
  { nombre: 'Laptop', precio: 800 },
];

const mayor400 = producto => producto.precio > 400;

const resultado = carrito.filter(mayor400);

console.log(resultado);

const obtenerNombres = producto => producto.nombre;

const resultadoNombre = carrito.map(obtenerNombres);

console.log(resultadoNombre);

// Pure Functions

const num1 = 10;

const duplicar = numero => numero * 2;

const num2 = duplicar(num1);

const obtenerCliente = () => () => console.log('object');

const fn = obtenerCliente();

fn();

// Closures

const mostrarNombre = () => {
  const nombre = 'Edgar';

  const imprimir = () => {
    console.log(nombre);
  };

  return imprimir;
};

const log = mostrarNombre();

log();

// Partials / Currying

const g = n => n + 1;
const f = n => n * 2;
const h = x => f(g(x));
h(20); //=> 42

const compose = (f, g) => x => f(g(x));

const curr = (a, b, c) => a + b + c;

const parcial = a => b => c => suma(a, b, c);

console.log(curr(10, 20, 30));
console.log(parcial(10)(20)(30));

const num_1 = parcial(10);
const num_2 = num_1(20);
const resultado_curr = num_2(30);
console.log(resultado_curr);
