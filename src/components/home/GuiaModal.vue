<template>
  <q-dialog
    v-model="modalOpen"
    backdrop-filter="blur(4px)"
    full-width
    full-height
  >
    <q-card>
      <div class="modal">
        <div class="top-bar fixed-top-right">
          <q-btn icon="close" dense rounded color="primary" v-close-popup />
        </div>

        <p class="title">Detalle Guía</p>

        <q-separator />

        <div class="list">
          <p>{{ guia.nombre }} {{ guia.apellido }}</p>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';

defineOptions({
  name: 'GuiaModal',
});

interface Props {
  guia: GuiaResponseDTO;
}

defineProps<Props>();

const modalOpen = defineModel<boolean>();
</script>

<style scoped lang="scss">
.modal {
  .top-bar {
    padding: 10px;
  }

  .title {
    padding: 8px;
    font-size: 28px;
    margin-bottom: 0;
  }

  .list {
    padding: 8px;
  }
}
</style>