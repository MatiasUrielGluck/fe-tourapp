<template>
  <q-dialog v-model="open">
    <q-card style="max-height: 80vh; max-width: 400px; width: 100%">
      <q-card-section>
        <div class="text-h6">Reseña de {{ fullname }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll">
        <p class="txt">Puntuación</p>
        <q-rating
          v-model="ratingModel"
          max="5"
          size="2.5em"
          color="primary"
          icon="star_border"
          icon-selected="star"
          :readonly="disabled"
        />
      </q-card-section>

      <q-card-section class="scroll">
        <p class="txt">Comentario</p>

        <q-field
          :readonly="disabled"
          v-model="comentario"
          :rules="[(val) => required(val), (val) => maxLength(val, 550)]"
          no-error-icon
          style="width: 100%"
        >
          <template v-slot:control>
            <q-editor
              v-model="comentario"
              min-height="7rem"
              style="width: 100%"
              :readonly="disabled"
            />
          </template>
        </q-field>
      </q-card-section>

      <q-separator />

      <q-card-actions v-if="!disabled" align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
        <q-btn flat label="Guardar" color="green" @click="saveReview" />
      </q-card-actions>

      <q-card-actions v-else align="right">
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import { computed, ref } from 'vue';
import { maxLength, required } from 'src/helpers/formValidationRules';
import { useAppStore } from 'stores/app-store';
import ReviewRequestDTO from 'src/dto/review/ReviewRequestDTO';
import { createReview } from 'src/services/review.service';
import { showSnackbar } from 'src/utils/snackbar';

defineOptions({
  name: 'ReviewModal',
});

interface Props {
  viajeReview: ViajeReviewDTO;
}

const props = defineProps<Props>();

const open = defineModel<boolean>();

const appStore = useAppStore();

const initialValues = () => {
  const review = props.viajeReview.review;

  return {
    comentario: review ? review.comentario : '',
    rating: review ? review.puntuacion : 0,
  };
};

// Ref
const comentario = ref<string>(initialValues().comentario);
const ratingModel = ref<number>(initialValues().rating);

// Computed
const disabled = computed(() => {
  return !!props.viajeReview.review;
});

const guia = computed(() => {
  return props.viajeReview.viaje.guia;
});

const fullname = computed(() => {
  return `${guia.value.nombre} ${guia.value.apellido}`;
});

// Method
const saveReview = async () => {
  try {
    appStore.showPreloader();
    const data: ReviewRequestDTO = {
      comentario: comentario.value,
      puntuacion: ratingModel.value,
      viajeId: props.viajeReview.viaje.id,
    };

    await createReview(data);
    showSnackbar('success', '¡Gracias por comentar!');
    open.value = false;
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};
</script>

<style scoped lang="scss">
.txt {
  margin-bottom: 2px;
}
</style>
