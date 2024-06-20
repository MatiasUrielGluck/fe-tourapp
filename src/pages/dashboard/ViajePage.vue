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
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'ViajePage',
});

const router = useRouter();

// Ref
const viajes = ref();
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
</style>
