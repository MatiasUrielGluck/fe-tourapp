<template>
  <div class="parent">
    <div class="chip" v-if="idiomas.length">
      <q-chip
        v-for="(lang, index) in idiomas"
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
      behavior="menu"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey"> Sin resultados </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

defineOptions({
  name: 'LanguageSelect',
});

const idiomas = defineModel({
  required: true,
  type: Array<string>,
});

const languageList = ['Español', 'Inglés'];

// Ref
const language = ref('');
const languageOptions = ref<Array<string>>(languageList);

// Methods
/* eslint-disable  @typescript-eslint/no-explicit-any */
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
  idiomas.value = idiomas.value.filter((l) => l !== lang);
};

// Cycle
watch(language, (newVal) => {
  if (newVal === '') return;
  language.value = '';
  if (idiomas.value.includes(newVal)) return;
  idiomas.value.push(newVal);
});
</script>

<style scoped lang="scss">
.parent {
  width: 100%;
  max-width: 800px;

  .chip {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .form-input {
    width: 100%;
    max-width: 800px;
  }
}
</style>
