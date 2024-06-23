import EstadosViajeEnum from 'src/enums/EstadosViajeEnum';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import StateLabelType from 'src/logic/ViajeState/types/StateLabelType';
import ActionButton from 'src/logic/ViajeState/types/ActionButton';
import { useAccountStore } from 'stores/account-store';
import Router from 'src/router';
import ViajeDetailsQuery from 'src/types/ViajeDetailsQuery';

const accountStore = useAccountStore();

class EstadoConcluido implements ViajeState {
  id: EstadosViajeEnum;
  viajeId: number;

  constructor(viajeId: number) {
    this.id = EstadosViajeEnum.CONCLUIDO;
    this.viajeId = viajeId;
  }

  get info(): StateLabelType {
    return {
      label: 'Concluido',
      icon: 'check_circle',
      color: 'green',
    };
  }

  get actions(): Array<ActionButton> | undefined {
    const actions: Array<ActionButton> = [];

    if (!accountStore.isGuide) {
      actions.push({
        label: 'Opinar',
        color: 'primary',
        action: () => this.redirectReview(),
      });
    }

    return actions;
  }

  async redirectReview(): Promise<void> {
    const query: ViajeDetailsQuery = { viajeId: this.viajeId, review: true };

    await Router.push({
      name: 'viajeDetails',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      query: query,
    });
  }
}

export default EstadoConcluido;
