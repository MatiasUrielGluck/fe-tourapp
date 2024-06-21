import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';

export default interface ViajeState {
  id: EstadosViajeEnum;
  get info(): StateLabelType;
}
