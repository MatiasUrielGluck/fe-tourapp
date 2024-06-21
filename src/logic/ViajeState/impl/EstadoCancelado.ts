import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';
import ActionButton from 'src/logic/ViajeState/types/ActionButton';

class EstadoCancelado implements ViajeState {
  id: EstadosViajeEnum;
  viajeId: number;

  constructor(viajeId: number) {
    this.id = EstadosViajeEnum.CANCELADO;
    this.viajeId = viajeId;
  }

  get info(): StateLabelType {
    return {
      label: 'Cancelado',
      icon: 'event_busy',
      color: 'red',
    };
  }

  get actions(): Array<ActionButton> | undefined {
    return undefined;
  }
}

export default EstadoCancelado;
