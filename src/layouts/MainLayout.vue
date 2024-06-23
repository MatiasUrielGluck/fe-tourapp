<template>
  <q-layout view="hHh lpR lFf" class="main-layout">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> {{ titleBar }} </q-toolbar-title>

        <notification-menu />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      no-swipe-backdrop
      side="left"
      bordered
      style="background: #fefbf6"
    >
      <q-list class="full-height drawer-items-container">
        <div class="top-menu">
          <DrawerItem
            v-for="(menuItem, index) in topMenuList"
            :key="index"
            :item="menuItem"
          />
        </div>
        <div class="top-menu">
          <DrawerItem
            v-for="(menuItem, index) in bottomMenuList"
            :key="index"
            :item="menuItem"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { capitalize, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DrawerItem from 'components/DrawerItem.vue';
import DrawerItemType from 'src/types/DrawerItemType';
import { logout } from 'src/helpers/authenticationHelper';
import NotificationMenu from 'components/common/NotificationMenu.vue';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'MainLayout',
});

const router = useRouter();
const accountStore = useAccountStore();

// Ref
const drawerOpen = ref(false);

// Computed
const titleBar = computed(() => {
  const menuItem = menuList.value.find(
    (item) => item.routeName === (router.currentRoute.value.name as string)
  );
  return capitalize(<string>menuItem?.label);
});

const menuListToShow = computed(() => {
  return menuList.value.filter((menuItem) => menuItem.show);
});

const menuList = computed(() => {
  const list: Array<DrawerItemType> = [
    {
      icon: 'home',
      routeName: 'inicio',
      label: 'Inicio',
      separator: false,
      position: 'top',
      show: true,
    },
    {
      icon: 'chat',
      routeName: 'chats',
      label: 'Chats',
      separator: false,
      position: 'top',
      show: true,
    },
    {
      icon: 'flight',
      routeName: 'viajes',
      label: 'Mis viajes',
      separator: false,
      position: 'top',
      show: true,
    },
    {
      icon: '',
      routeName: 'buscar',
      label: 'Resultados',
      separator: false,
      position: 'top',
      show: false,
    },
    {
      icon: '',
      routeName: 'viajeDetails',
      label: 'Detalles del viaje',
      separator: false,
      position: 'top',
      show: false,
    },
    {
      icon: 'manage_accounts',
      routeName: 'servicios',
      label: 'Mis servicios',
      separator: false,
      position: 'top',
      show: accountStore.isGuide,
    },
    {
      icon: 'payments',
      routeName: 'documentos',
      label: 'Historial de pago',
      separator: false,
      position: 'top',
      show: true,
    },
    {
      icon: 'settings',
      routeName: 'settings',
      label: 'Preferencias',
      separator: false,
      position: 'bottom',
      show: true,
    },
    {
      icon: 'logout',
      onClick: logout,
      label: 'Cerrar sesión',
      separator: false,
      position: 'bottom',
      show: true,
    },
  ];
  return list;
});

const topMenuList = computed(() => {
  return menuListToShow.value.filter((item) => item.position === 'top');
});

const bottomMenuList = computed(() => {
  return menuListToShow.value.filter((item) => item.position === 'bottom');
});

// Method
const toggleLeftDrawer = () => (drawerOpen.value = !drawerOpen.value);
</script>

<style scoped lang="scss">
.main-layout {
  background: $light;

  .drawer-items-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
}
</style>
