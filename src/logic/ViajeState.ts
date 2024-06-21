import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';

interface ViajeState {
  id: EstadosViajeEnum;
}

class EstadoReservado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.RESERVADO;
  }
}

class EstadoConfirmado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CONFIRMADO;
  }
}

class EstadoConcluido implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CONCLUIDO;
  }
}

class EstadoCancelado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CANCELADO;
  }
}

const stateMap = new Map<EstadosViajeEnum, ViajeState>([
  [EstadosViajeEnum.RESERVADO, new EstadoReservado()],
  [EstadosViajeEnum.CONFIRMADO, new EstadoConfirmado()],
  [EstadosViajeEnum.CONCLUIDO, new EstadoConcluido()],
  [EstadosViajeEnum.CANCELADO, new EstadoCancelado()],
]);

function getState(estado: EstadosViajeEnum): ViajeState {
  const state = stateMap.get(estado);
  if (!state) throw new Error('Error al setear el estado');
  return state;
}

export default getState;
