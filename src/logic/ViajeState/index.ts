import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import EstadoReservado from 'src/logic/ViajeState/impl/EstadoReservado';
import EstadoConfirmado from 'src/logic/ViajeState/impl/EstadoConfirmado';
import EstadoConcluido from 'src/logic/ViajeState/impl/EstadoConcluido';
import EstadoCancelado from 'src/logic/ViajeState/impl/EstadoCancelado';
import ViajeType from 'src/types/ViajeType';

export default function getState(viaje: ViajeType): ViajeState {
  const id = viaje.id;

  const stateMap = new Map<EstadosViajeEnum, ViajeState>([
    [EstadosViajeEnum.RESERVADO, new EstadoReservado(id)],
    [EstadosViajeEnum.CONFIRMADO, new EstadoConfirmado(id)],
    [EstadosViajeEnum.CONCLUIDO, new EstadoConcluido(id)],
    [EstadosViajeEnum.CANCELADO, new EstadoCancelado(id)],
  ]);

  const state = stateMap.get(viaje.estado);
  if (!state) throw new Error('Error al setear el estado');
  return state;
}
