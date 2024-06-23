<template>
  <q-page class="viaje-details">
    <h1>Detalles del viaje</h1>

    <div v-if="!loading">
      <div class="view">
        <div class="date">
          <calendar-select v-model="fechas" readonly class="calendar" />
        </div>

        <div class="info">
          <q-card class="destino">
            <q-img
              src="https://humanidades.com/wp-content/uploads/2019/02/Buenos-aires-2-e1585704119889.jpg"
              style="object-fit: cover"
            />

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="column no-wrap">
                <div class="col text-h6 ellipsis">{{ viaje?.ciudad }}</div>
                <div class="col text-h7 ellipsis">{{ viaje?.pais }}</div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">$ {{ precio }}</div>
              <div class="text-grey">
                {{ tipoServicioEnumToLabel(servicio.tipo) }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="user-container">
          <q-card class="user-card">
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="userPhoto" style="object-fit: cover" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label style="font-size: 18px">{{
                  userFullname
                }}</q-item-label>
                <q-item-label style="color: #3d3b40">
                  {{ userRole }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section class="user-desc">
              <p class="title">Credencial verificada</p>
              <p class="user-info">Número:</p>
              <p class="user-info">Vencimiento:</p>
            </q-card-section>

            <q-card-actions align="center">
              <q-btn label="Ver foto" color="primary" />
            </q-card-actions>
          </q-card>
        </div>
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
import UserTemplate from 'src/assets/icons/user_template.png';
import CalendarSelect from 'components/common/CalendarSelect.vue';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import DocumentoEnum from 'src/enums/DocumentoEnum';
import { tipoServicioEnumToLabel } from 'src/enums/TipoServicioEnum';
import { useAccountStore } from 'stores/account-store';
import AccountType from 'src/types/AccountType';

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

const servicio = computed(() => {
  if (!viajeReview.value) throw new Error('No hay servicio');
  return viajeReview.value.servicio;
});

const guia = computed(() => {
  return viaje.value?.guia;
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

const userPhoto = computed(() => {
  return userToShow.value.foto ? userToShow.value.foto : UserTemplate;
});

const userFullname = computed<string>(() => {
  return `${userToShow.value.nombre} ${userToShow.value.apellido}`;
});

const userRole = computed<string>(() => {
  if (accountStore.isGuide) return 'Turista';
  return 'Guía';
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

    .info {
      height: 100%;

      @media (max-width: 1000px) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: initial;
      }

      .destino {
        width: 290px;
        height: 100%;
      }
    }

    .user-container {
      display: grid;
      height: 100%;

      @media (max-width: 1000px) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: initial;
      }

      .user-card {
        height: 100%;
        width: 290px;

        .user-desc {
          margin-top: 20px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          gap: 16px;

          .title {
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
