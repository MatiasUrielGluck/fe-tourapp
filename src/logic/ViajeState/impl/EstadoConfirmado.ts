import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';

class EstadoConfirmado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CONFIRMADO;
  }

  get info(): StateLabelType {
    return {
      label: 'Confirmado',
      icon: 'event_available',
      color: 'green',
    };
  }
}

export default EstadoConfirmado;
