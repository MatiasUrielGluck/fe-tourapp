<template>
  <div class="turista-view">
    <h1>¡Encontrá tu guía!</h1>
    <p>Buscalo por cualquiera de estos datos</p>

    <div class="search-form">
      <div class="form-inputs">
        <tipo-servicio-select
          v-model="tipoServicio"
          :rules="[(val) => required(val)]"
        />
        <q-input
          filled
          v-model="ciudad"
          label="Ciudad (obligatorio)"
          placeholder="Ej: Buenos Aires"
          :rules="[(val) => required(val)]"
        />
        <q-input filled v-model="pais" label="País" />
        <q-input filled v-model="nombre" label="Nombre del guía" />
        <q-input filled v-model="apellido" label="Apellido del guía" />
        <language-select v-model="idiomas" />
      </div>
      <div class="calendar-container">
        <calendar-select v-model="fechas" />
      </div>
    </div>
    <q-btn
      color="primary"
      label="Buscar"
      class="search-btn"
      icon="search"
      :disable="isSearchDisabled"
      @click="createQuery"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import TipoServicioSelect from 'components/common/TipoServicioSelect.vue';
import CalendarSelect from 'components/common/CalendarSelect.vue';
import LanguageSelect from 'components/common/LanguageSelect.vue';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import { stringToTipoServicio } from 'src/enums/TipoServicioEnum';
import { useGuideQueryStore } from 'stores/guide-query-store';
import { useRouter } from 'vue-router';
import { required } from 'src/helpers/formValidationRules';

defineOptions({
  name: 'TuristaView',
});

const today = new Date();
const future = new Date(today);
future.setDate(today.getDate() + 6);

const fechaInicial: DateRangeType = {
  from: formatDateSymbol(new Date(), '/'),
  to: formatDateSymbol(future, '/'),
};

const router = useRouter();

// Store
const guideQueryStore = useGuideQueryStore();

// Ref
const nombre = ref<string>(guideQueryStore.nombre ?? '');
const apellido = ref<string>(guideQueryStore.apellido ?? '');
const ciudad = ref<string>(guideQueryStore.ciudad ?? '');
const pais = ref<string>(guideQueryStore.pais ?? '');
const tipoServicio = ref<string>('Tour Individual');
const fechas = ref<DateRangeType>(fechaInicial);
const idiomas = ref<Array<string>>([]);

// Computed
const isSearchDisabled = computed(() => {
  return !ciudad.value;
});

// Methods
const createQuery = async () => {
  const query: FiltroDTO = {
    apellido: apellido.value ? apellido.value : undefined,
    ciudad: ciudad.value ? ciudad.value : undefined,
    fechaInicio: formatDateSymbol(new Date(fechas.value.from), '-'),
    fechaFin: formatDateSymbol(new Date(fechas.value.to), '-'),
    idiomas: idiomas.value.length ? idiomas.value.join(',') : undefined,
    nombre: nombre.value ? nombre.value : undefined,
    pais: pais.value ? pais.value : undefined,
    tipoServicio: stringToTipoServicio(tipoServicio.value),
  };

  guideQueryStore.setQuery(query);
  await router.push({
    name: 'buscar',
    query: query,
  });
};

onMounted(() => {
  localStorage.removeItem('query');
});
</script>

<style scoped lang="scss">
.turista-view {
  padding: 8px 18px 18px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;

  h1 {
    text-align: center;

    @media (max-width: 760px) {
      font-size: 36px;
    }
  }

  p {
    margin-top: 18px;
    text-align: center;
    font-size: 23px;
    margin-bottom: 0;
    color: #3d3b40;
    font-weight: 300;
  }

  .search-form {
    margin: 40px 0 0;
    width: 100%;
    max-width: 750px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    @media (max-width: 760px) {
      flex-flow: column nowrap;
      align-items: center;
    }

    .form-inputs {
      width: 50%;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      gap: 8px;

      @media (max-width: 760px) {
        width: 100%;
      }
    }

    .calendar-container {
      display: flex;
      justify-content: end;
      width: 50%;

      @media (max-width: 760px) {
        margin-top: 24px;
        width: 100%;
        justify-content: center;

        .calendar {
          width: 100%;
        }
      }
    }
  }

  .search-btn {
    width: 100%;
    max-width: 750px;
    margin-top: 48px;

    @media (max-width: 760px) {
      margin-top: 24px;
    }
  }
}
</style>
