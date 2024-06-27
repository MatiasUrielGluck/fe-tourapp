<template>
  <q-page>
    <div v-if="!viajes?.length" class="empty-container">
      <h1>Todavía no hiciste ningún viaje</h1>
      <q-btn
        icon="flight"
        label="Viajar"
        color="primary"
        rounded
        @click="router.push({ name: 'inicio' })"
      />
    </div>
    <div v-else class="viaje-container">
      <h1>Mis viajes</h1>

      <div class="card-list-container">
        <viaje-card
          v-for="(viajeReview, index) in viajes"
          :key="index"
          :viaje-review="viajeReview"
          @refresh-trips="fetchViajes"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getViajes } from 'src/services/viaje.service';
import ViajeCard from 'components/viaje/ViajeCard.vue';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import { useAppStore } from 'stores/app-store';

defineOptions({
  name: 'ViajePage',
});

const router = useRouter();
const appStore = useAppStore();

// Ref
const viajes = ref<Array<ViajeReviewDTO>>();

// Methods
const fetchViajes = async () => {
  appStore.showPreloader();
  try {
    const viajesResponse = await getViajes();
    viajes.value = viajesResponse.sort((a, b) => b.viaje.id - a.viaje.id);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

// Cycle
onMounted(async () => {
  await fetchViajes();
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

.viaje-container {
  padding: 18px;
  display: grid;
  place-items: center;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    text-align: center;
  }

  .card-list-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;
    max-width: 1140px;
    max-height: 80vh;
    overflow: auto;
    padding-bottom: 50px;
  }
}
</style>
