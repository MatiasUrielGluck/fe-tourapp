<template>
  <q-item
    clickable
    :active="item.routeName === $router.currentRoute.value.name"
    v-ripple
    @click="onClick"
  >
    <q-item-section avatar>
      <q-icon :name="item.icon" />
    </q-item-section>
    <q-item-section>
      {{ item.label }}
    </q-item-section>
  </q-item>
  <q-separator v-if="item.separator" />
</template>

<script setup lang="ts">
import DrawerItemType from 'src/types/DrawerItemType';
import { useRouter } from 'vue-router';

interface Props {
  item: DrawerItemType;
}

const props = defineProps<Props>();

const router = useRouter();

const onClick = () => {
  if (props.item.onClick !== undefined) return props.item.onClick();
  router.push({ name: props.item.routeName });
};
</script>

<style scoped lang="scss"></style>
