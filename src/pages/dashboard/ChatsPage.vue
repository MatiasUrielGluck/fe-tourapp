<template>
  <q-page>
    <div v-if="!chats?.length" class="empty-container">
      <h1>¡Ups! Nada por acá</h1>
      <p>
        Para poder acceder al chat, primero tenés que recibir la confirmación de
        un viaje.
      </p>
      <q-btn
        icon="flight"
        label="Viajar"
        color="primary"
        rounded
        @click="router.push({ name: 'inicio' })"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAppStore } from 'stores/app-store';
import { useAccountStore } from 'stores/account-store';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'ChatsPage',
});

const router = useRouter();

// Store
const appStore = useAppStore();
const accountStore = useAccountStore();

// Ref
const chats = ref();

// Method
const fetchChats = async () => {
  try {
    appStore.showPreloader();
    console.warn('Fetching chats ', accountStore.isGuide);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

// Cycle
onMounted(async () => {
  await fetchChats();
});
</script>

<style scoped lang="scss">
.empty-container {
  height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 36px;
  text-align: center;

  h1 {
    font-size: 36px;
  }
}
</style>
