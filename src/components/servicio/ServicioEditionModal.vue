<template>
  <q-dialog v-model="modalOpen" backdrop-filter="blur(4px)">
    <q-card style="min-width: 320px">
      <q-card-section class="row items-center q-pb-none text-h6">
        Editar servicio
      </q-card-section>

      <q-card-section class="form">
        <q-input
          filled
          v-model="precio"
          type="number"
          label="Precio"
          prefix="$"
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
          @click="editService"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ServicioRequestDTO from 'src/dto/servicio/ServicioRequestDTO';
import { editarServicio } from 'src/services/servicio.service';
import ServicioType from 'src/types/ServicioType';
import { required } from 'src/helpers/formValidationRules';

defineOptions({
  name: 'ServicioEditionModal',
});

interface Props {
  servicio?: ServicioType;
}

const props = defineProps<Props>();

const emit = defineEmits(['refreshData']);

const modalOpen = defineModel<boolean>();

// Ref
const precio = ref(props.servicio?.precio);

// Methods
const editService = async () => {
  if (!props.servicio) {
    return;
  }

  const data: ServicioRequestDTO = {
    precio: precio.value,
  };

  try {
    await editarServicio(props.servicio.id, data);
    emit('refreshData');
  } catch (e) {
    console.error(e);
  }
};

watch(props, (newVal) => {
  precio.value = newVal.servicio?.precio;
});
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
