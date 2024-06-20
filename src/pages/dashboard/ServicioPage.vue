<template>
  <q-page>
    <servicio-creation-modal
      v-model="creationOpen"
      @refresh-data="fetchServices"
    />

    <servicio-edition-modal
      :servicio="selectedService"
      v-model="editionOpen"
      @refresh-data="fetchServices"
    />
    <div v-if="!servicios?.length" class="empty-container">
      <h1>Todavía no ofrecés ningún servicio</h1>
      <q-btn
        icon="add"
        label="Crear un servicio"
        color="primary"
        rounded
        @click="creationOpen = true"
      />
    </div>
    <div v-else class="servicio-container">
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab icon="add" color="primary" @click="creationOpen = true" />
      </q-page-sticky>

      <h1>Administrá tus servicios</h1>
      <div class="card-list-container">
        <q-card
          v-for="(servicio, index) in servicios"
          :key="index"
          class="card"
        >
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 text-center q-mb-xs">
              {{ tipoServicioToString(servicio.tipo) }}
            </div>
            <div class="item">
              <div class="item-name">Precio:</div>
              <div class="item-desc">${{ servicio.precio }}</div>
            </div>
            <div class="item">
              <div class="item-name">País:</div>
              <div class="item-desc">{{ servicio.pais }}</div>
            </div>
            <div class="item">
              <div class="item-name">Ciudad:</div>
              <div class="item-desc">{{ servicio.ciudad }}</div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              icon="edit"
              color="green"
              @click="editService(servicio)"
            />
            <q-btn
              flat
              icon="delete"
              color="red"
              @click="deleteService(servicio.id)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAccountStore } from 'stores/account-store';
import ServicioType from 'src/types/ServicioType';
import { eliminarServicio, getServicios } from 'src/services/servicio.service';
import { tipoServicioToString } from 'src/enums/TipoServicioEnum';
import ServicioCreationModal from 'components/servicio/ServicioCreationModal.vue';
import ServicioEditionModal from 'components/servicio/ServicioEditionModal.vue';

defineOptions({
  name: 'ServicioPage',
});

const accountStore = useAccountStore();

// Ref
const creationOpen = ref(false);
const editionOpen = ref(false);
const selectedService = ref();
const servicios = ref<Array<ServicioType>>();

// Methods
const fetchServices = async () => {
  creationOpen.value = false;
  editionOpen.value = false;

  try {
    servicios.value = await getServicios(accountStore.id);
  } catch (e) {
    console.error(e);
  }
};

const deleteService = async (id: number) => {
  try {
    await eliminarServicio(id);
    await fetchServices();
  } catch (e) {
    console.error(e);
  }
};

const editService = (servicio: ServicioType) => {
  selectedService.value = servicio;
  editionOpen.value = true;
};

// Cycle
onMounted(async () => {
  await fetchServices();
});
</script>

<style scoped lang="scss">
.empty-container {
  height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 36px;
  text-align: center;

  h1 {
    font-size: 36px;
  }
}

.servicio-container {
  padding: 18px;

  h1 {
    font-size: 36px;
    margin-bottom: 28px;
    text-align: center;
  }

  .card-list-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .card {
      width: 100%;
      max-width: 250px;

      .item {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;

        .item-name {
          font-weight: 500;
        }
      }
    }
  }
}
</style>
