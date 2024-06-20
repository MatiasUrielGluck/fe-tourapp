<template>
  <q-select
    filled
    v-model="model"
    :options="serviceOptions"
    label="Tipo de servicio"
    :rules="[(val) => required(val)]"
  />
</template>

<script setup lang="ts">
import TipoServicioEnum, {
  tipoServicioToString,
} from 'src/enums/TipoServicioEnum';
import { required } from 'src/helpers/formValidationRules';

defineOptions({
  name: 'TipoServicioSelect',
});

const model = defineModel();

const serviceOptions = Object.values(TipoServicioEnum).map((tipo) =>
  tipoServicioToString(tipo)
);
</script>

<style scoped lang="scss"></style>
