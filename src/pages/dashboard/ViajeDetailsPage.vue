<template>
  <q-page class="viaje-details">
    <h1>Detalles del viaje</h1>

    <div v-if="!loading && viajeReview">
      <div class="view">
        <div class="date">
          <calendar-select v-model="fechas" readonly class="calendar" />
        </div>

        <destino-card :viaje-review="viajeReview" :precio="precio" />

        <user-card :user-to-show="userToShow" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from 'stores/app-store';
import FacturaDTO from 'src/dto/transaccion/FacturaDTO';
import { obtenerDocumentos } from 'src/services/transaccion.service';
import { useRoute } from 'vue-router';
import ViajeDetailsQuery from 'src/types/ViajeDetailsQuery';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import { getViajeById } from 'src/services/viaje.service';
import CalendarSelect from 'components/common/CalendarSelect.vue';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import DocumentoEnum from 'src/enums/DocumentoEnum';
import { useAccountStore } from 'stores/account-store';
import AccountType from 'src/types/AccountType';
import DestinoCard from 'components/viaje/DestinoCard.vue';
import UserCard from 'components/viaje/UserCard.vue';

defineOptions({
  name: 'ViajeDetailsPage',
});

const route = useRoute();
const query: ViajeDetailsQuery = <ViajeDetailsQuery>route.query;

// Store
const appStore = useAppStore();
const accountStore = useAccountStore();

// Ref
const loading = ref<boolean>(true);
const viajeReview = ref<ViajeReviewDTO>();
const documentos = ref<Array<FacturaDTO>>([]);

// Computed
const viaje = computed(() => {
  return viajeReview.value?.viaje;
});

const fechas = computed(() => {
  if (!viaje.value) return;
  const data: DateRangeType = {
    from: formatDateSymbol(new Date(viaje.value.fechaInicio), '/'),
    to: formatDateSymbol(new Date(viaje.value?.fechaFin), '/'),
  };
  return data;
});

const precio = computed(() => {
  const facturaAnticipo = documentos.value.find(
    (documento) => documento.motivo === DocumentoEnum.ANTICIPO
  );

  if (!facturaAnticipo)
    throw new Error('No se encontró la factura de anticipo');
  return facturaAnticipo.precio;
});

const userToShow = computed<AccountType>(() => {
  if (!viaje.value) throw new Error('No hay datos');
  if (accountStore.isGuide) return viaje.value?.turista;
  return viaje.value?.guia;
});

// Methods
const fetchViajeDetails = async () => {
  if (!query.viajeId) throw new Error('ID del viaje inválido');

  try {
    appStore.showPreloader();
    loading.value = true;
    viajeReview.value = await getViajeById(query.viajeId);
    documentos.value = await obtenerDocumentos(query.viajeId);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
  loading.value = false;
};

// Cycle
onMounted(async () => {
  await fetchViajeDetails();
});
</script>

<style scoped lang="scss">
.viaje-details {
  padding: 18px 18px 18px;
  width: 100%;

  h1 {
    text-align: center;

    @media (max-width: 760px) {
      padding: 8px;
      font-size: 36px;
    }
  }

  .view {
    margin-top: 36px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    gap: 36px;
    height: 340px;

    @media (max-width: 1000px) {
      flex-flow: column nowrap;
      align-content: center;
      height: initial;
    }

    .date {
      height: 100%;

      @media (max-width: 1000px) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: initial;
      }

      .calendar {
        width: 290px;
        height: 100%;
      }
    }
  }
}
</style>
