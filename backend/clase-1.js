// let resultado = myFunction();
// console.log(resultado);

// console.log(sumarDosNumeros(3, 2));

// function myFunction() {
//   let myVariableInterna = "Resultado";
//   return myVariableInterna;
// }

// function sumarDosNumeros(parametro1, parametro2) {
//   let resultado = parametro1 + parametro2;
//   return resultado;
// }

// const myArrowFunction = () => {
//   let myVariableInterna = 2;
//   console.log(resultado);
//   return myVariableInterna;
// };

// let resultadoArrow = myArrowFunction();
// console.log(resultadoArrow);

// const sumarDosNumerosArrow = (parametro1, parametro2) => {
//   let resultado = parametro1 + parametro2;
//   return resultado;
// };

// console.log(sumarDosNumerosArrow(3, 2));

// const sumarDosNumerosOneLine = (parametro1, parametro2) =>
//   parametro1 + parametro2;

// console.log(sumarDosNumerosOneLine(3, 3));

// const flechaConUnParametro = (parametro) => parametro.toString();

// console.log(`esto es un texto
// de dos lineas
// donde ademas puedo evaluar expresiones: ${1 + 1}
// `);

// function mostrarLista(unaLista) {
//   if (!Array.isArray(unaLista)) {
//     return "No es una lista";
//   }
//   if (unaLista.length === 0) {
//     return "Lista Vacía";
//   }
//   for (let i = 0; i < unaLista.length; i++) {
//     const elemento = unaLista[i];
//     console.log(`El elemento en la posición ${i} tiene valor ${elemento}`);
//   }
//   return `La lista tenía una longitud de ${unaLista.length}`;
// }

// console.log("sin pasar argumentos", mostrarLista());
// console.log("con lista vacía", mostrarLista([]));
// console.log("con datos", mostrarLista([1, 2, 3]));


// function conClosure() {
//   let valor = 0;

//   const sumarValor = () => (valor += 1);
//   const restarValor = () => (valor -= 1);
//   const getValor = () => valor;

//   return {
//     getValor,
//     sumarValor,
//     restarValor,
//   };
// }

// const unaEntidad = conClosure();
// console.log(unaEntidad.getValor());
// unaEntidad.sumarValor();
// unaEntidad.sumarValor();
// console.log(unaEntidad.getValor());


//Clases

// class EjemploDeClase {
//   static variableDeClase = "Variable de clase";

//   static contador = 0;
//   static cantidadDeInstancias = 0;

//   constructor(parametros) {
//     console.log(`Creando clase con parametros ${parametros}`);
//     this.variableDeInstancia = 0;
//     EjemploDeClase.cantidadDeInstancias++;
//   }

//   metodo1() {
//     console.log("Soy un metodo de instancia");
//   }

//   metodo2() {
//     console.log(
//       `Accedo a un atributo de instancia: ${this.variableDeInstancia} y tambien a uno de clase ${EjemploDeClase.variableDeClase}`
//     );
//   }

//   sumar() {
//     EjemploDeClase.contador++;
//   }
// }

// const unaInstancia = new EjemploDeClase("instancia 1");
// const otraInstancia = new EjemploDeClase("instancia 2");
// console.log(unaInstancia);
// console.log(otraInstancia);
// console.log(unaInstancia === otraInstancia);
// console.log(unaInstancia instanceof EjemploDeClase);
// console.log(unaInstancia.variableDeInstancia);
// unaInstancia.metodo1();
// unaInstancia.metodo2();
// unaInstancia.sumar();
// otraInstancia.sumar();
// console.log(EjemploDeClase.contador);
// new EjemploDeClase("instancia 3");
// new EjemploDeClase("instancia 4");
// new EjemploDeClase("instancia 5");
// console.log(EjemploDeClase.cantidadDeInstancias);

// class Persona {
//   static especie = "Humano";
//   constructor(nombre) {
//     this.nombre = nombre;
//   }

//   saludar = () => {
//     console.log(`Hola, soy ${this.nombre}, mucho gusto`);
//   };

//   getEspecie = () => console.log(`Aunque no lo creas, soy ${Persona.especie}`);
// }

// let persona1 = new Persona("Jose");
// let persona2 = new Persona("María");

// persona1.saludar();
// persona2.saludar();
// persona1.getEspecie();
// persona2.getEspecie();
// console.log(`Son Maria y Jose la misma persona? ${persona1 === persona2}`);

class Contador {
  static contadorGlobal = 0;
  constructor(responsableDeLaInstancia) {
    this.responsableDeLaInstancia = responsableDeLaInstancia;
    this.contadorLocal = 0;
  }
  getResponsable = () => this.responsableDeLaInstancia;

  contar = () => {
    this.contadorLocal++;
    Contador.contadorGlobal++;
  };

  getCuentaIndividual = () => this.contadorLocal;

  getCuentaGlobal = () => Contador.contadorGlobal;
}

const contador1 = new Contador("Mi primer contador");
const contador2 = new Contador("Mi segundo contador");

contador1.contar();
contador2.contar();

console.log(`Datos del contador ${contador1.getResponsable()}`);
console.log(contador1.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());

console.log(`Datos del contador ${contador2.getResponsable()}`);
console.log(contador2.getCuentaIndividual());
console.log(contador2.getCuentaGlobal());
