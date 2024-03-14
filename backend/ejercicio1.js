const objetos = [
  {
    manzanas: 3,
    peras: 2,
    carne: 1,
    jugos: 5,
    dulces: 2,
  },
  {
    manzanas: 1,
    sandias: 1,
    huevos: 6,
    jugos: 1,
    panes: 4,
  },
];

const productos = objetos.reduce((acumulador, elemento) => {
  Object.keys(elemento).forEach((clave) => {
    if (!acumulador.includes(clave)) {
      acumulador.push(clave);
    } //?
  });
  return acumulador;
}, []);
productos;

const cantidadVendida = objetos.reduce((acumulador, elemento) => {
  Object.values(elemento).forEach((valor) => {
    acumulador += valor;
  });
  return acumulador;
}, 0);
console.log({ productos, cantidadVendida }); 

