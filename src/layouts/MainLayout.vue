<template>
  <q-layout view="hHh lpR lFf" class="main-layout">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> {{ titleBar }} </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
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

defineOptions({
  name: 'MainLayout',
});

const router = useRouter();

const drawerOpen = ref(false);

const titleBar = computed(() => {
  return capitalize(router.currentRoute.value.name as string);
});

const menuList = computed(() => {
  const list: Array<DrawerItemType> = [
    {
      icon: 'home',
      routeName: 'dashboard',
      label: 'Dashboard',
      separator: false,
      position: 'top',
    },
    {
      icon: 'apps',
      routeName: 'applications',
      label: 'Applications',
      separator: false,
      position: 'top',
    },
    {
      icon: 'toggle_on',
      routeName: 'feature-flags',
      label: 'Feature Flags',
      separator: false,
      position: 'top',
    },
    {
      icon: 'settings',
      routeName: 'settings',
      label: 'Settings',
      separator: false,
      position: 'bottom',
    },
    {
      icon: 'logout',
      onClick: logout,
      label: 'Logout',
      separator: false,
      position: 'bottom',
    },
  ];
  return list;
});

const topMenuList = computed(() => {
  return menuList.value.filter((item) => item.position === 'top');
});

const bottomMenuList = computed(() => {
  return menuList.value.filter((item) => item.position === 'bottom');
});

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
