<template>
  <div class="turista-view">
    <h1>¡Encontrá a tu guía!</h1>

    <div class="search-form">
      <div class="form-inputs">
        <q-input filled v-model="ciudad" label="Ciudad" />
        <q-input filled v-model="pais" label="País" />
        <q-input filled v-model="nombre" label="Nombre del guía" />
        <q-input filled v-model="apellido" label="Apellido del guía" />
        <tipo-servicio-select v-model="tipoServicio" />
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
      @click="fetchFilteredGuides"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import TipoServicioSelect from 'components/common/TipoServicioSelect.vue';
import CalendarSelect from 'components/common/CalendarSelect.vue';
import LanguageSelect from 'components/common/LanguageSelect.vue';
import { getFilteredGuides } from 'src/services/usuario.service';
import FiltroDTO from 'src/dto/usuario/FiltroDTO';
import { stringToTipoServicio } from 'src/enums/TipoServicioEnum';

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

// Ref
const nombre = ref<string>('');
const apellido = ref<string>('');
const ciudad = ref<string>('');
const pais = ref<string>('');
const tipoServicio = ref<string>('');
const fechas = ref<DateRangeType>(fechaInicial);
const idiomas = ref<Array<string>>([]);

// Methods
const fetchFilteredGuides = async () => {
  const params: FiltroDTO = {
    apellido: apellido.value ? apellido.value : undefined,
    ciudad: ciudad.value ? ciudad.value : undefined,
    fechaInicio: formatDateSymbol(new Date(fechas.value.from), '-'),
    fechaFin: formatDateSymbol(new Date(fechas.value.to), '-'),
    idiomas: idiomas.value.length ? idiomas.value.join(',') : undefined,
    nombre: nombre.value ? nombre.value : undefined,
    pais: pais.value ? pais.value : undefined,
    tipoServicio: tipoServicio.value
      ? stringToTipoServicio(tipoServicio.value)
      : undefined,
  };

  console.warn(params);

  try {
    await getFilteredGuides(params);
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="scss">
.turista-view {
  padding: 18px;
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
      gap: 24px;

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
