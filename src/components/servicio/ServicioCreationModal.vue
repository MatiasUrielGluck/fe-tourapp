<template>
  <q-dialog v-model="modalOpen" backdrop-filter="blur(4px)">
    <q-card style="min-width: 320px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Crear servicio
      </q-card-section>

      <q-card-section class="form">
        <tipo-servicio-select v-model="tipo" class="input" />
        <q-input
          filled
          v-model="precio"
          type="number"
          label="Precio"
          prefix="$"
          :rules="[(val) => required(val)]"
          class="input"
        />
        <q-input
          filled
          v-model="pais"
          label="País"
          :rules="[(val) => required(val)]"
          class="input"
        />
        <q-input
          filled
          v-model="ciudad"
          label="Ciudad"
          :rules="[(val) => required(val)]"
          class="input"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          icon="save"
          label="Guardar"
          color="primary"
          @click="createService"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import TipoServicioSelect from 'components/common/TipoServicioSelect.vue';
import { ref } from 'vue';
import { stringToTipoServicio } from 'src/enums/TipoServicioEnum';
import ServicioRequestDTO from 'src/dto/servicio/ServicioRequestDTO';
import { crearServicio } from 'src/services/servicio.service';
import { required } from 'src/helpers/formValidationRules';

defineOptions({
  name: 'ServicioCreationModal',
});

const emit = defineEmits(['refreshData']);

const modalOpen = defineModel<boolean>();

// Ref
const tipo = ref('');
const precio = ref();
const pais = ref('');
const ciudad = ref('');

// Methods
const createService = async () => {
  const data: ServicioRequestDTO = {
    ciudad: ciudad.value,
    pais: pais.value,
    precio: precio.value,
    tipo: stringToTipoServicio(tipo.value),
  };

  try {
    await crearServicio(data);
    emit('refreshData');
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 18px;
  width: 100%;

  .input {
    width: 100%;
  }
}
</style>
