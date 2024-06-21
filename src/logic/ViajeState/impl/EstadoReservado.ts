import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';
import ActionButton from 'src/logic/ViajeState/types/ActionButton';

import { useAccountStore } from 'stores/account-store';
import { cancelTrip, confirmTrip } from 'src/services/viaje.service';
import { showSnackbar } from 'src/utils/snackbar';

const accountStore = useAccountStore();

class EstadoReservado implements ViajeState {
  id: EstadosViajeEnum;
  viajeId: number;

  constructor(viajeId: number) {
    this.id = EstadosViajeEnum.RESERVADO;
    this.viajeId = viajeId;
  }

  get info(): StateLabelType {
    return {
      label: 'Reservado',
      icon: 'event',
      color: 'primary',
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
        label: 'Confirmar',
        color: 'green',
        action: () => this.confirmTrip(),
      });
    }

    return actions;
  }

  async cancelTrip(): Promise<void> {
    await cancelTrip(this.viajeId);
    showSnackbar('success', 'El viaje ha sido cancelado.');
  }

  async confirmTrip(): Promise<void> {
    await confirmTrip(this.viajeId);
    showSnackbar('success', 'El viaje ha sido confirmado.');
  }
}

export default EstadoReservado;
