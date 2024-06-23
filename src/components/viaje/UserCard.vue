<template>
  <div class="user-container">
    <q-card class="user-card">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="userPhoto" style="object-fit: cover" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label style="font-size: 18px">{{
            userFullname
          }}</q-item-label>
          <q-item-label style="color: #3d3b40">
            {{ userRole }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section class="user-desc">
        <p class="title">Datos personales</p>
        <p class="user-info">
          DNI: <span style="color: #3d3b40">{{ userToShow.dni }}</span>
        </p>
        <p class="user-info">
          Email:
          <span style="color: #3d3b40">{{ userToShow.email }}</span>
        </p>
        <p class="user-info">
          Número de télefono:
          <span style="color: #3d3b40">{{ userToShow.numTelefono }}</span>
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import AccountType from 'src/types/AccountType';
import { computed } from 'vue';
import UserTemplate from 'assets/icons/user_template.png';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'UserCard',
});

interface Props {
  userToShow: AccountType;
}

const props = defineProps<Props>();

const accountStore = useAccountStore();

// Computed
const userPhoto = computed(() => {
  return props.userToShow.foto ? props.userToShow.foto : UserTemplate;
});

const userFullname = computed<string>(() => {
  return `${props.userToShow.nombre} ${props.userToShow.apellido}`;
});

const userRole = computed<string>(() => {
  if (accountStore.isGuide) return 'Turista';
  return 'Guía';
});
</script>

<style scoped lang="scss">
.user-container {
  display: grid;
  height: 100%;

  @media (max-width: 1000px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: initial;
  }

  .user-card {
    height: 100%;
    width: 290px;

    .user-desc {
      margin-top: 20px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      gap: 16px;

      .title {
        font-weight: 500;
      }
    }
  }
}
</style>
