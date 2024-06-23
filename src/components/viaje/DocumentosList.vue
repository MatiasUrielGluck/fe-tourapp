<template>
  <div class="documentos-container">
    <div class="documentos-subcontainer">
      <p class="title">Facturas y devoluciones</p>

      <q-list bordered class="rounded-borders bg-grey-3" separator>
        <q-expansion-item v-for="(documento, index) in documentos" :key="index">
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon
                :color="getIcon(documento).color"
                :name="getIcon(documento).iconName"
              />
            </q-item-section>

            <q-item-section>{{ getDocumentName(documento) }}</q-item-section>
          </template>

          <q-card>
            <q-item clickable v-ripple>
              <q-item-section
                ><span class="text-bold">Total: </span>$
                {{ documento.total }}</q-item-section
              >
              <q-item-section side
                ><q-btn
                  v-if="shouldShowPaymentBtn(documento)"
                  label="Pagar"
                  color="primary"
                  flat
                  @click.stop="makePayment(documento)"
              /></q-item-section>
            </q-item>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import FacturaDTO from 'src/dto/transaccion/FacturaDTO';
import DocumentoEnum from 'src/enums/DocumentoEnum';
import { useAppStore } from 'stores/app-store';
import { createTransaction } from 'src/services/transaccion.service';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'DocumentosList',
});

interface Props {
  documentos: Array<FacturaDTO>;
}

defineProps<Props>();

const emit = defineEmits(['refreshDocuments']);

const accountStore = useAccountStore();
const appStore = useAppStore();

// Methods
const getDocumentName = (document: FacturaDTO) => {
  if (document.motivo === DocumentoEnum.ANTICIPO) return 'Factura anticipo';
  else if (document.motivo === DocumentoEnum.FINAL) return 'Factura final';
  else if (document.motivo === DocumentoEnum.PENALIZACION)
    return 'Penalización';
  return 'Devolución';
};

const getIcon = (document: FacturaDTO) => {
  return {
    iconName: document.pagada || !document.motivo ? 'check_circle' : 'info',
    color: document.pagada || !document.motivo ? 'green' : 'yellow-8',
  };
};

// Method
const shouldShowPaymentBtn = (document: FacturaDTO) => {
  return !accountStore.isGuide && !document.pagada && document.motivo;
};

const makePayment = async (document: FacturaDTO) => {
  try {
    appStore.showPreloader();
    await createTransaction(document.id);
    emit('refreshDocuments');
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};
</script>

<style scoped lang="scss">
.documentos-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .documentos-subcontainer {
    width: 100%;
    max-width: 950px;

    .title {
      text-align: center;
      font-size: 24px;
    }
  }
}
</style>
