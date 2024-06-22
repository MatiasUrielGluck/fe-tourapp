<template>
  <router-view v-slot="{ Component, route }">
    <!-- Use a custom transition or fallback to `fade` -->
    <pre-loader />
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import PreLoader from 'components/common/PreLoader.vue';

defineOptions({
  name: 'App',
});
</script>
