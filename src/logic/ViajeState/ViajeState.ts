import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';
import ActionButton from 'src/logic/ViajeState/types/ActionButton';

export default interface ViajeState {
  id: EstadosViajeEnum;
  viajeId: number;
  get info(): StateLabelType;
  get actions(): Array<ActionButton> | undefined;
}
