import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';

class EstadoCancelado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CANCELADO;
  }

  get info(): StateLabelType {
    return {
      label: 'Cancelado',
      icon: 'event_busy',
      color: 'red',
    };
  }
}

export default EstadoCancelado;
