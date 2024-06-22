<template>
  <q-page class="q-pa-md">
    <guia-view v-if="accountStore.isGuide" />
    <turista-view v-else />
  </q-page>
</template>

<script setup lang="ts">
import { useAccountStore } from 'stores/account-store';
import TuristaView from 'components/home/TuristaView.vue';
import GuiaView from 'components/home/GuiaView.vue';

defineOptions({
  name: 'IndexPage',
});

const accountStore = useAccountStore();
</script>
