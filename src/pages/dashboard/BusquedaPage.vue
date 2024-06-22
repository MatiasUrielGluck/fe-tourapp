<template>
  <q-page class="row items-center justify-evenly">
    <h1>Buscar</h1>
    <p v-for="(guia, index) in guias" :key="index">
      {{ guia.nombre }} {{ guia.apellido }}
    </p>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';
import { getFilteredGuides } from 'src/services/usuario.service';

defineOptions({
  name: 'BusquedaPage',
});

// Vue
const route = useRoute();

// Ref
const guias = ref<Array<GuiaResponseDTO>>([]);

// Method
const performSearch = async () => {
  const query: FiltroDTO = <FiltroDTO>route.query;

  try {
    guias.value = await getFilteredGuides(query);
  } catch (e) {
    console.error(e);
  }
};

// Cycle
onMounted(async () => {
  await performSearch();
});
</script>
