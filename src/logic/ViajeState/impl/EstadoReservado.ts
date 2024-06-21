import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';

class EstadoReservado implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.RESERVADO;
  }

  get info(): StateLabelType {
    return {
      label: 'Reservado',
      icon: 'event',
      color: 'primary',
    };
  }
}

export default EstadoReservado;
