import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';
import ActionButton from 'src/logic/ViajeState/types/ActionButton';
import { showSnackbar } from 'src/utils/snackbar';
import { useAccountStore } from 'stores/account-store';
import { cancelTrip, concludeTrip } from 'src/services/viaje.service';

const accountStore = useAccountStore();

class EstadoConfirmado implements ViajeState {
  id: EstadosViajeEnum;
  viajeId: number;

  constructor(viajeId: number) {
    this.id = EstadosViajeEnum.CONFIRMADO;
    this.viajeId = viajeId;
  }

  get info(): StateLabelType {
    return {
      label: 'Confirmado',
      icon: 'event_available',
      color: 'green',
    };
  }

  get actions(): Array<ActionButton> | undefined {
    const actions: Array<ActionButton> = [];

    actions.push({
      label: 'Cancelar',
      color: 'red',
      action: () => this.cancelTrip(),
    });

    if (accountStore.isGuide) {
      actions.push({
        label: 'Concluir',
        color: 'green',
        action: () => this.concludeTrip(),
      });
    }

    return actions;
  }

  async cancelTrip(): Promise<void> {
    await cancelTrip(this.viajeId);
    showSnackbar('success', 'El viaje ha sido cancelado.');
  }

  async concludeTrip(): Promise<void> {
    await concludeTrip(this.viajeId);
    showSnackbar('success', 'El viaje ha sido concluido.');
  }
}

export default EstadoConfirmado;
