import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';

class EstadoConcluido implements ViajeState {
  id: EstadosViajeEnum;

  constructor() {
    this.id = EstadosViajeEnum.CONCLUIDO;
  }

  get info(): StateLabelType {
    return {
      label: 'Concluido',
      icon: 'check_circle',
      color: 'green',
    };
  }
}

export default EstadoConcluido;
