// const unArray = [1, 2, 3, 4];
// unArray[2]; //?
// for (let index = 0; index < unArray.length; index++) {
//   const element = unArray[index];
//   console.log(element);
// }

// unArray.forEach((element) => {
//   console.log(element);
// });

// const valoresAlCuadrado = unArray.map((elemento) => {
//   return elemento ** 2;
// });
// valoresAlCuadrado; //?

// // let sumaDeTodosLosElementos = 0;
// // unArray.forEach(element => {
// //     sumaDeTodosLosElementos += element
// // });
// // sumaDeTodosLosElementos //?

// const sumaDeTodosLosElementos = unArray.reduce((acumulador, elemento) => {
//   return acumulador + elemento;
// }, 0);
// sumaDeTodosLosElementos; //?
// for (const key in unArray) {
//   console.log(key);
// }

// //includes

// const estaIncluidoEl1 = unArray.reduce((acumulador, elemento) => {
//   if (elemento === 1) {
//     acumulador = true;
//   }
//   return acumulador;
// }, false);
// estaIncluidoEl1; //?
// for (const iterator of unArray) {
//   console.log(iterator);
// }

// const unObjeto = {
//   nombre: "Fabrizio",
//   apellido: "Pauselli",
//   unNuevoValor: 45
// };

// ///spread

// const nuevoObjeto = {edad: 25, ...unObjeto, nombre: 'Jose'}//?

// const { nombre, apellido,...algoMas } = nuevoObjeto
// nombre //?
// apellido //?
// algoMas //?

// const unArray = [1, 2, 3, 4];

// const otroArray = [0, ...unArray, 5] //?

// const [ ...sarasa ] = otroArray

// sarasa

// class UnJuguete {
//   constructor(valor1, valor2) {
//     this.valor1 = valor1;
//     this.valor2 = valor2;
//   }

//   unMetodo() {
//     console.log("hola");
//   }
// }

// Object.keys(unObjeto); //?
// Object.values(unObjeto); //?
// Object.entries(unObjeto); //?
// const unJuguete = new UnJuguete("Hola", "Mundo");

// Object.keys(unJuguete); //?
// Object.values(unJuguete); //?
// Object.entries(unJuguete); //?
// const unaCadena =
//   "   yo soy un texto que me agregaron espacios al principio y al final    ";

// unaCadena.trim(); //?
// unaCadena.trimStart(); //?
// unaCadena.trimEnd(); //?

// const matriz = [
//   [1, 2, 3],
//   [4, 5, 6, 1],
//   [[1,2,3], [1,2,3]]
// ];//?
// matriz.flat(Infinity) //?

// const env = 'TEST'
// async function dynamicExport() {
//     if(env === 'TEST') {
//         const {ValorSecreto} = await import('./archivo')
//         console.log(ValorSecreto)
//     } else{
//         console.log('No tienes acceso al valor secreto')
//     }
// }
// dynamicExport()

// let miVariable = 0;

// if(miVariable) {
//     console.log('no soy null');
// }

// const valorDelUsuarioDelFront = null

// // let valorDelUsuarioEnBD = 'DEFAULT'
// // if(valorDelUsuarioDelFront !== '' && valorDelUsuarioDelFront !== undefined && valorDelUsuarioDelFront  !== null) {
// //     valorDelUsuarioEnBD = valorDelUsuarioDelFront
// // }

// const valorDelUsuarioEnBD = valorDelUsuarioDelFront ?? 'DEFAULT'

// valorDelUsuarioEnBD //?
// const objetos = [
//     {
//       manzanas: 3,
//       peras: 2,
//       carne: 1,
//       jugos: 5,
//       dulces: 2,
//     },
//     {
//       manzanas: 1,
//       sandias: 1,
//       huevos: 6,
//       jugos: 1,
//       panes: 4,
//     },
//     1,
//     undefined
//   ];

// let cantidadDeDulces = 0;
// for (const elemento of objetos) {
//      cantidadDeDulces += elemento?.dulces ?? 0;
// }
// cantidadDeDulces //?

class Contador {
  static #contadorGlobal = 0;
  #responsableDeLaInstancia;
  #contadorLocal;
  constructor(responsableDeLaInstancia) {
    this.#responsableDeLaInstancia = responsableDeLaInstancia;
    this.#contadorLocal = 0;
  }
  getResponsable = () => this.#responsableDeLaInstancia;

  contar = () => {
    this.#contadorLocal++;
    Contador.#contadorGlobal++;
  };

  getCuentaIndividual = () => this.#contadorLocal;

  getCuentaGlobal = () => Contador.#contadorGlobal;
}

const contador = new Contador("contador1");
//error
//contador.#contadorLocal
