<template>
  <div class="form-container">
    <q-input
      v-model="kycStore.dni"
      ref="dniTxt"
      type="number"
      label="Número de DNI"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[
        (val) => required(val),
        (val) => minLength(val, 8, 'El DNI debe tener 8 números'),
        (val) => maxLength(val, 8, 'El DNI debe tener 8 números'),
      ]"
    >
    </q-input>

    <q-input
      v-model="kycStore.numTelefono"
      ref="numTelefonoTxt"
      type="number"
      label="Número de teléfono"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[
        (val) => required(val),
        (val) =>
          minLength(val, 10, 'El teléfono debe tener al menos 10 números'),
      ]"
    >
    </q-input>

    <q-file
      filled
      v-model="foto"
      label="Foto (opcional)"
      class="form-input"
      clearable
      accept=".jpg, .png, image/*"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
  </div>
</template>

<script setup lang="ts">
import { useKycStore } from 'stores/kyc-store';
import { computed, onMounted, ref, watch } from 'vue';
import {
  maxLength,
  minLength,
  required,
} from 'src/helpers/formValidationRules';
import { QInput } from 'quasar';
import { imageToBase64 } from 'src/utils/base64';
import { showSnackbar } from 'src/utils/snackbar';

defineOptions({
  name: 'AditionalInfoStep',
});

const emit = defineEmits(['nextDisabled']);

const kycStore = useKycStore();

// Ref
const dniTxt = ref<QInput | null>(null);
const numTelefonoTxt = ref<QInput | null>(null);
const foto = ref();

const canContinue = computed<boolean>(() => {
  return (
    !dniTxt.value?.hasError &&
    !numTelefonoTxt.value?.hasError &&
    !!kycStore.dni &&
    !!kycStore.numTelefono
  );
});

const loadImage = async (foto: File) => {
  try {
    kycStore.foto = await imageToBase64(foto);
  } catch (e) {
    console.error(e);
    kycStore.foto = '';
    showSnackbar('error', 'Error al cargar la imágen');
  }
};

// Cycle
watch(canContinue, (value) => {
  if (value) emit('nextDisabled', false);
  else emit('nextDisabled', true);
});

watch(foto, async (value) => {
  if (value) await loadImage(value);
});

onMounted(() => {
  if (!!kycStore.dni && !!kycStore.numTelefono) emit('nextDisabled', false);
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
