<template>
  <div>
    <h1 v-if="!Platform.is.mobile">Antes de comenzar</h1>
    <p v-if="!Platform.is.mobile">
      Por favor completá la siguiente información
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';

defineOptions({
  name: 'BaseStep',
});
</script>

<style scoped lang="scss">
h1,
p {
  text-align: center;
  margin-bottom: 24px;
}

p {
  font-size: 18px;
  margin-bottom: 36px;
}
</style>
