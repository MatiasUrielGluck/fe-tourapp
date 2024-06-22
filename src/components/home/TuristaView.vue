<template>
  <div class="turista-view">
    <h1>¡Encontrá a tu guía!</h1>

    <div class="search-form">
      <div class="form-inputs">
        <q-input filled v-model="ciudad" label="Buscá por ciudad" />
        <q-input filled v-model="pais" label="Buscá por país" />
        <tipo-servicio-select v-model="tipoServicio" />
      </div>
      <div class="calendar-container">
        <calendar-select v-model="fechas" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DateRangeType from 'src/types/DateRangeType';
import { formatDateSymbol } from 'src/helpers/dateHelper';
import TipoServicioSelect from 'components/common/TipoServicioSelect.vue';
import CalendarSelect from 'components/common/CalendarSelect.vue';

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
const ciudad = ref<string>('');
const pais = ref<string>('');
const tipoServicio = ref<string>('');
const fechas = ref<DateRangeType>(fechaInicial);
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
    margin: 20px 0;
    width: 100%;
    max-width: 940px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    @media (max-width: 760px) {
      flex-flow: column nowrap;
      align-items: center;
    }

    .form-inputs {
      width: 45%;
      display: flex;
      flex-flow: column nowrap;
      gap: 24px;

      @media (max-width: 760px) {
        width: 100%;
      }
    }

    .calendar-container {
      display: flex;
      justify-content: end;
      width: 45%;

      @media (max-width: 760px) {
        width: 100%;
        justify-content: center;

        .calendar {
          width: 100%;
        }
      }
    }
  }
}
</style>
