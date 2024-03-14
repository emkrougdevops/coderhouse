/**
 * @typedef {Object} Evento
 * @property {number} id
 * @property {string} nombre
 * @property {string} lugar
 * @property {number} precio
 * @property {number} capacidad
 * @property {Date} fecha
 * @property {Array<number>} participantes
 */

/**
 *  @constant
 *  @default
 */
const precioDeGanancia = 0.15;

class TicketManager {
  /**
   * @type {Array<Evento>}
   */
  #eventos;

  /** @type {number} */
  #precioBaseDeGanancia;

  constructor() {
    this.#eventos = [];
    this.#precioBaseDeGanancia = 0.15;
  }
  /** @returns {Array<Evento>} */
  getEventos() {
    return this.#eventos;
  }
  /**
   *
   * @param {string} nombre El nombre del evento
   * @param {string} lugar El lugar del evento
   * @param {number} precio El precio del evento
   * @param {number} [capacidad = 50] La capacidad del evento
   * @param {Date} [fecha=new Date()] La fecha del evento
   */
  agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
    /** @type {Evento} */
    const evento = {
      id: this.#getNextId(),
      nombre,
      lugar,
      precio: precio + precio * this.#precioBaseDeGanancia,
      capacidad,
      fecha,
      participantes: [],
    };
    this.#eventos.push(evento);
  }

  /**
   *
   * @param {number} idEvento El id del evento
   * @param {number} idUsuario El id del usuario
   */
  agregarUsuario(idEvento, idUsuario) {
    const evento = this.#eventos.find((evento) => evento.id === idEvento);
    if (!evento) {
      throw new Error("Evento no encontrado");
    }
    const usuarioExiste = evento.participantes.some(
      (usuario) => usuario.id === idUsuario
    );
    if (usuarioExiste) {
      throw new Error("Usuario ya registrado");
    }
    evento.participantes.push(idUsuario);
  }

  /**
   *
   * @param {number} idEvento El id del evento
   * @param {string} nuevaLocalidad La nueva localidad
   * @param {Date} nuevaFecha La nueva fecha
   */
  ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const evento = this.#eventos.find((evento) => evento.id === idEvento);
    if (!evento) {
      throw new Error("Evento no encontrado");
    }
    /** @type {Evento} */
    const nuevoEvento = {
      ...evento,
      id: this.#getNextId(),
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
      participantes: [],
    };
    this.#eventos.push(nuevoEvento);
  }

  /** @returns {number} */
  #getNextId() {
    if (this.#eventos.length === 0) {
      return 1;
    }
    return this.#eventos.at(-1).id + 1;
  }
}

const ticketManager = new TicketManager();
ticketManager.agregarEvento("Evento 1", "Lugar 1", 100);
ticketManager.agregarEvento("Evento 2", "Lugar 2", 200);
ticketManager.agregarEvento("Evento 3", "Lugar 3", 300);
ticketManager.agregarUsuario(1, 1);
ticketManager.agregarUsuario(1, 2);
ticketManager.ponerEventoEnGira(1, "Lugar 4", new Date("2024-03-12"));
console.log(ticketManager.getEventos());
