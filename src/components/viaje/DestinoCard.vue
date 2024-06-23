<template>
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
          <div class="col text-h6 ellipsis">{{ viajeReview.viaje.ciudad }}</div>
          <div class="col text-h7 ellipsis">{{ viajeReview.viaje.pais }}</div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">$ {{ precio }}</div>
        <div class="text-grey">
          {{ tipoServicioEnumToLabel(viajeReview.servicio.tipo) }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { tipoServicioEnumToLabel } from 'src/enums/TipoServicioEnum';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';

defineOptions({
  name: 'DestinoCard',
});

interface Props {
  viajeReview: ViajeReviewDTO;
  precio: number;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
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
</style>
