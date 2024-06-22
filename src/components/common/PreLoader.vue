<template>
  <q-dialog
    v-model="appStore.isPreloaderShowing"
    persistent
    maximized
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card class="full-width full-height bg-primary">
      <q-inner-loading showing color="white" size="60px" dark />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAppStore } from 'stores/app-store';

defineOptions({
  name: 'PreLoader',
});

const appStore = useAppStore();
</script>

<style scoped lang="scss"></style>
