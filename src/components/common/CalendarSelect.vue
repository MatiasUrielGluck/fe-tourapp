<template>
  <q-date
    v-model="fechas"
    range
    class="calendar"
    :locale="locale"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'CalendarSelect',
});

interface Props {
  readonly?: boolean;
}

withDefaults(defineProps<Props>(), {
  readonly: false,
});

const fechas = defineModel();

const locale = {
  /* starting with Sunday */
  days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_'
    ),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'días',
};
</script>

<style scoped lang="scss">
@media (max-width: 760px) {
  .calendar {
    width: 100%;
  }
}
</style>
