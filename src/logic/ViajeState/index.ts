import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import EstadoReservado from 'src/logic/ViajeState/impl/EstadoReservado';
import EstadoConfirmado from 'src/logic/ViajeState/impl/EstadoConfirmado';
import EstadoConcluido from 'src/logic/ViajeState/impl/EstadoConcluido';
import EstadoCancelado from 'src/logic/ViajeState/impl/EstadoCancelado';

const stateMap = new Map<EstadosViajeEnum, ViajeState>([
  [EstadosViajeEnum.RESERVADO, new EstadoReservado()],
  [EstadosViajeEnum.CONFIRMADO, new EstadoConfirmado()],
  [EstadosViajeEnum.CONCLUIDO, new EstadoConcluido()],
  [EstadosViajeEnum.CANCELADO, new EstadoCancelado()],
]);

export default function getState(estado: EstadosViajeEnum): ViajeState {
  const state = stateMap.get(estado);
  if (!state) throw new Error('Error al setear el estado');
  return state;
}
