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
          size="2.5em"
          color="primary"
          icon="star_border"
          icon-selected="star"
        />
      </q-card-section>

      <q-card-section class="scroll">
        <p class="txt">Comentario</p>

        <q-field
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
            />
          </template>
        </q-field>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
        <q-btn flat label="Guardar" color="green" @click="saveReview" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import { computed, ref } from 'vue';
import { maxLength, required } from 'src/helpers/formValidationRules';

defineOptions({
  name: 'ReviewModal',
});

interface Props {
  viajeReview: ViajeReviewDTO;
}

const props = defineProps<Props>();

const open = defineModel<boolean>();

// Ref
const comentario = ref<string>('');
const ratingModel = ref<number>(0);

// Computed
const guia = computed(() => {
  return props.viajeReview.viaje.guia;
});

const fullname = computed(() => {
  return `${guia.value.nombre} ${guia.value.apellido}`;
});

// Method
const saveReview = async () => {

}
</script>

<style scoped lang="scss">
.txt {
  margin-bottom: 2px;
}
</style>
