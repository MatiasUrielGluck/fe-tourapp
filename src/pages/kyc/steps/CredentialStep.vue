<template>
  <div class="form-container">
    <div>
      <q-chip
        v-for="(lang, index) in kycStore.idiomas"
        :key="index"
        color="primary"
        text-color="white"
        removable
        @remove="removeLanguage(lang)"
      >
        {{ lang }}
      </q-chip>
    </div>

    <q-select
      filled
      v-model="language"
      use-input
      input-debounce="0"
      label="Seleccioná idiomas"
      hide-selected
      :options="languageOptions"
      @filter="filterLanguage"
      class="form-input"
      style="margin-bottom: 20px"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> No results </q-item-section>
        </q-item>
      </template>
    </q-select>

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

const languageList = ['Español', 'Inglés'];

// Ref
const language = ref('');
const languageOptions = ref<Array<string>>(languageList);
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
    !!kycStore.credencial.foto &&
    kycStore.idiomas.length > 0
  );
});

const filterLanguage = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      languageOptions.value = languageList;
    });
    return;
  }

  update(() => {
    languageOptions.value = languageList.filter(
      (lang) => lang.toLowerCase().indexOf(val.toLowerCase()) > -1
    );
  });
};

const removeLanguage = (lang: string) => {
  kycStore.idiomas = kycStore.idiomas.filter((l) => l !== lang);
};

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

watch(language, (newVal) => {
  if (newVal === '') return;
  language.value = '';
  if (kycStore.idiomas.includes(newVal)) return;
  kycStore.idiomas.push(newVal);
});

onMounted(() => {
  if (
    !!kycStore.credencial.numero &&
    !!kycStore.credencial.vencimiento &&
    !!kycStore.credencial.foto &&
    kycStore.idiomas.length > 0
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
