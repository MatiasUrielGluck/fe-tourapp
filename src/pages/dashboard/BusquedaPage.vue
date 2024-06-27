<template>
  <q-page class="busqueda-page">
    <div v-if="!guias?.length" class="empty-container">
      <h1>¡Ups!</h1>
      <p>Parece que no hay guías con las opciones seleccionadas</p>
      <q-btn
        icon="arrow_back"
        label="Atrás"
        color="primary"
        rounded
        @click="router.back()"
      />
    </div>

    <div v-else>
      <guia-modal
        v-if="selectedGuide"
        v-model="detailsOpen"
        :guia-id="selectedGuide"
      />
      <h1>Guías disponibles</h1>

      <q-list separator>
        <guia-list-item
          v-for="(guia, index) in guias"
          :key="index"
          :guia="guia"
          @open-info="openDetailsModal"
        />
      </q-list>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';
import { getFilteredGuides } from 'src/services/usuario.service';
import { useAppStore } from 'stores/app-store';
import GuiaListItem from 'components/home/GuiaListItem.vue';
import GuiaModal from 'components/home/GuiaModal.vue';

defineOptions({
  name: 'BusquedaPage',
});

// Vue
const route = useRoute();
const router = useRouter();

// Store
const appStore = useAppStore();

// Ref
const guias = ref<Array<GuiaResponseDTO>>([]);
const detailsOpen = ref<boolean>(false);
const selectedGuide = ref<number>();

// Method
const openDetailsModal = (id: number) => {
  selectedGuide.value = id;
  detailsOpen.value = true;
};

const performSearch = async () => {
  const query: FiltroDTO = <FiltroDTO>route.query;

  try {
    appStore.showPreloader();
    guias.value = await getFilteredGuides(query);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

// Cycle
onBeforeMount(async () => {
  await performSearch();
});
</script>

<style scoped lang="scss">
.busqueda-page {
  padding: 8px 0;

  .empty-container {
    height: 90vh;
    padding: 8px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
      font-size: 36px;
      margin-bottom: 14px;
    }

    p {
      font-size: 20px;
      color: #3d3b40;
    }

    margin-bottom: 36px;
  }

  h1 {
    text-align: center;
    margin-bottom: 24px;

    @media (max-width: 760px) {
      font-size: 36px;
    }
  }
}
</style>
