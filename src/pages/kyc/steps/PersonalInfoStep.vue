<template>
  <div class="form-container">
    <q-input
      v-model="kycStore.nombre"
      ref="nombreTxt"
      type="text"
      label="Nombre"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[(val) => required(val)]"
    >
    </q-input>

    <q-input
      v-model="kycStore.apellido"
      ref="apellidoTxt"
      type="text"
      label="Apellido"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[(val) => required(val)]"
    >
    </q-input>

    <q-select
      filled
      v-model="kycStore.genero"
      :options="Object.values(GeneroEnum)"
      label="Género"
      class="form-input"
    />
  </div>
</template>

<script setup lang="ts">
import { useKycStore } from 'stores/kyc-store';
import GeneroEnum from 'src/enums/GeneroEnum';
import { computed, onMounted, ref, watch } from 'vue';
import { required } from 'src/helpers/formValidationRules';
import { QInput } from 'quasar';

defineOptions({
  name: 'PersonalInfoStep',
});

const emit = defineEmits(['nextDisabled']);

const kycStore = useKycStore();

// Ref
const nombreTxt = ref<QInput | null>(null);
const apellidoTxt = ref<QInput | null>(null);

const canContinue = computed<boolean>(() => {
  return (
    !nombreTxt.value?.hasError &&
    !apellidoTxt.value?.hasError &&
    !!kycStore.nombre &&
    !!kycStore.apellido
  );
});

watch(canContinue, (value) => {
  if (value) emit('nextDisabled', false);
  else emit('nextDisabled', true);
});

onMounted(() => {
  if (!!kycStore.nombre && !!kycStore.apellido) emit('nextDisabled', false);
});
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .form-input {
    width: 100%;
    max-width: 800px;
  }
}
</style>
