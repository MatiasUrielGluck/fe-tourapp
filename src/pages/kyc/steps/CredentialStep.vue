<template>
  <div class="form-container">
    <q-input
      v-model="kycStore.credencial.numero"
      ref="numeroTxt"
      type="number"
      label="Número de credencial"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[
        (val) => required(val),
        (val) => minLength(val, 8, 'La credencial debe tener 8 números'),
        (val) => maxLength(val, 8, 'La credencial debe tener 8 números'),
      ]"
    >
    </q-input>

    <q-input
      v-model="kycStore.credencial.vencimiento"
      ref="vencimientoTxt"
      type="date"
      label="Fecha de vencimiento"
      filled
      input-style="font-size: 17px"
      class="form-input"
      :rules="[(val) => required(val)]"
    >
    </q-input>

    <q-file
      ref="fotoTxt"
      filled
      v-model="foto"
      label="Foto"
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
const numeroTxt = ref<QInput | null>(null);
const vencimientoTxt = ref<QInput | null>(null);
const fotoTxt = ref<QInput | null>(null);
const foto = ref();

const canContinue = computed<boolean>(() => {
  return (
    !numeroTxt.value?.hasError &&
    !vencimientoTxt.value?.hasError &&
    !!kycStore.credencial.numero &&
    !!kycStore.credencial.vencimiento &&
    !!kycStore.credencial.foto
  );
});

const loadImage = async (foto: File) => {
  try {
    kycStore.credencial.foto = await imageToBase64(foto);
  } catch (e) {
    console.error(e);
    kycStore.credencial.foto = '';
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
  if (
    !!kycStore.credencial.numero &&
    !!kycStore.credencial.vencimiento &&
    !!kycStore.credencial.foto
  )
    emit('nextDisabled', false);
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
