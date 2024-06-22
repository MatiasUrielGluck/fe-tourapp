<template>
  <q-select
    filled
    v-model="model"
    :options="serviceOptions"
    label="Tipo de servicio"
    :rules="rules"
    behavior="menu"
  />
</template>

<script setup lang="ts">
import { ValidationRule } from 'quasar';
import TipoServicioEnum, {
  tipoServicioToString,
} from 'src/enums/TipoServicioEnum';

defineOptions({
  name: 'TipoServicioSelect',
});

interface Props {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  rules?: ValidationRule<any>[];
}

defineProps<Props>();

const model = defineModel();

const serviceOptions = Object.values(TipoServicioEnum).map((tipo) =>
  tipoServicioToString(tipo)
);
</script>

<style scoped lang="scss"></style>
