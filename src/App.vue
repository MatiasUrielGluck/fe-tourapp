<template>
  <router-view v-slot="{ Component, route }">
    <!-- Use a custom transition or fallback to `fade` -->
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
defineOptions({
  name: 'App',
});
</script>
