// Según la documentación oficial de Quasar: https://quasar.dev/vue-components/date#basic (al día de la fecha 21-06-2024),
// el v-model se bindea con la siguiente estructura.
// { "from": "2020/07/01", "to": "2020/07/16" }
// Al convertir al fecha, utilizar en-US.

type DateRangeType = {
  from: string;
  to: string;
};

export default DateRangeType;
