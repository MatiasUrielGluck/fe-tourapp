<template>
  <q-item clickable v-ripple class="item" @click.stop="openGuideModal">
    <q-item-section avatar>
      <q-avatar size="75px">
        <img :src="foto" style="object-fit: cover" />
      </q-avatar>
    </q-item-section>

    <q-item-section top class="info">
      <div class="top">
        <p class="fullname">{{ fullname }}</p>

        <div class="rating">
          <q-rating
            v-model="puntuacion"
            readonly
            size="1.5em"
            :max="5"
            color="primary"
          />
          <p>({{ guia.reviewCount }})</p>
        </div>
      </div>

      <div class="bottom" v-if="price">
        <p class="price">Precio: ${{ price }}</p>
      </div>
    </q-item-section>

    <q-item-section side class="actions">
      <q-btn
        label="Reservar"
        dense
        color="green"
        @click.stop="registrarViaje"
      />
      <q-btn
        label="Ver información"
        dense
        flat
        no-caps
        color="primary"
        @click.stop="openGuideModal"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';
import { computed } from 'vue';
import UserTemplate from 'src/assets/icons/user_template.png';
import { useGuideQueryStore } from 'stores/guide-query-store';
import { useAppStore } from 'stores/app-store';
import ViajeRequestDTO from 'src/dto/viaje/ViajeRequestDTO';
import { createTrip } from 'src/services/viaje.service';
import { showSnackbar } from 'src/utils/snackbar';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'GuiaListItem',
});

interface Props {
  guia: GuiaResponseDTO;
}

const props = defineProps<Props>();

const router = useRouter();
const guideQueryStore = useGuideQueryStore();
const appStore = useAppStore();

// Computed
const fullname = computed(() => {
  return `${props.guia.nombre} ${props.guia.apellido}`;
});

const foto = computed(() => {
  return props.guia.foto ? props.guia.foto : UserTemplate;
});

const puntuacion = computed(() => {
  return props.guia.puntuacion;
});

const servicio = computed(() => {
  const filteredService = props.guia.servicios.find((servicio) => {
    return (
      guideQueryStore.tipoServicio === servicio.tipo &&
      guideQueryStore.ciudad?.toLowerCase() === servicio.ciudad.toLowerCase()
    );
  });

  if (!filteredService) {
    throw new Error('Error interno');
  }

  return filteredService;
});

const price = computed(() => {
  return servicio.value?.precio;
});

// Method
const registrarViaje = async () => {
  const data: ViajeRequestDTO = {
    ciudad: servicio.value.ciudad,
    fechaFin: guideQueryStore.fechaFin,
    fechaInicio: guideQueryStore.fechaInicio,
    guiaId: props.guia.id,
    pais: servicio.value.pais,
    servicioId: servicio.value.id,
  };

  try {
    appStore.showPreloader();
    const viajeRegistrado = await createTrip(data);
    showSnackbar('success', '¡Reservaste el viaje!');
    router.push({
      name: 'viajeDetails',
      query: {
        viajeId: viajeRegistrado.id,
      },
    });
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

const openGuideModal = () => {
  return;
};
</script>

<style scoped lang="scss">
.item {
  padding: 16px 8px;
  height: 130px;

  .info {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;

    .top {
      .fullname {
        margin: 0;
        font-size: 18px;
      }

      .rating {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        gap: 6px;

        p {
          color: #3d3b40;
          margin: 0;
        }
      }
    }

    .bottom {
      .price {
        justify-self: flex-end;
        font-size: 16px;
        font-weight: 500;
        margin: 0;
      }
    }
  }

  .actions {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;
  }
}
</style>
