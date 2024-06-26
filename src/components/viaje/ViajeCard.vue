<template>
  <q-card class="card">
    <q-card-section horizontal>
      <q-img
        class="col-5"
        src="https://humanidades.com/wp-content/uploads/2019/02/Buenos-aires-2-e1585704119889.jpg"
      />

      <q-card-section class="card-info">
        <p class="city">{{ viajeReview.viaje.ciudad }}</p>
        <p class="country">{{ viajeReview.viaje.pais }}</p>

        <q-item class="q-mt-md q-pa-none">
          <q-item-section avatar>
            <q-avatar>
              <img :src="photo" style="object-fit: cover" alt="tour app" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle2">{{
              userFullName
            }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-rating
          v-model="puntuacion"
          size="32px"
          max="5"
          color="primary"
          icon="star_border"
          icon-selected="star"
          readonly
        />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions class="info-container">
      <q-icon
        :name="viajeStateUI.info.icon"
        size="24px"
        :color="viajeStateUI.info.color"
      />
      <p class="text-subtitle1 q-mb-none">{{ viajeStateUI.info.label }}</p>
    </q-card-actions>

    <q-separator />

    <q-card-actions class="info-container">
      <q-icon name="date_range" size="24px" />
      <p class="text-subtitle1 q-mb-none">
        {{ fechaInicio }}
      </p>
      <p class="text-subtitle1 q-mb-none">-</p>
      <p class="text-subtitle1 q-mb-none">{{ fechaFin }}</p>
    </q-card-actions>

    <q-separator />

    <q-card-actions align="right">
      <q-btn
        v-for="(btn, index) in viajeStateUI.actions"
        :key="index"
        flat
        :color="btn.color"
        @click="triggerAction(btn.action)"
      >
        {{ btn.label }}
      </q-btn>
      <q-btn
        label="Ver detalle"
        color="primary"
        dense
        rounded
        @click="goDetails"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import { formatDateOnly } from 'src/helpers/dateHelper';
import { computed, ref } from 'vue';
import { useAccountStore } from 'stores/account-store';
import AccountType from 'src/types/AccountType';
import userTemplate from 'src/assets/icons/user_template.png';
import ViajeState from 'src/logic/ViajeState/ViajeState';
import getState from 'src/logic/ViajeState';
import { ActionFn } from 'src/logic/ViajeState/types/ActionButton';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'ViajeCard',
});

interface Props {
  viajeReview: ViajeReviewDTO;
}

const props = defineProps<Props>();

const emit = defineEmits(['refreshTrips']);

const router = useRouter();

const accountStore = useAccountStore();

// Ref
const puntuacion = ref(props.viajeReview.review?.puntuacion ?? 0);

// Computed
const user = computed<AccountType>(() => {
  if (accountStore.isGuide) return props.viajeReview.viaje.turista;
  return props.viajeReview.viaje.guia;
});

const photo = computed(() => {
  return user.value.foto ? user.value.foto : userTemplate;
});

const userFullName = computed<string>(() => {
  return getFullname(user.value);
});

const fechaInicio = computed<string>(() => {
  return formatDateOnly(new Date(props.viajeReview.viaje.fechaInicio));
});

const fechaFin = computed<string>(() => {
  return formatDateOnly(new Date(props.viajeReview.viaje.fechaFin));
});

const viajeStateUI = computed<ViajeState>(() => {
  return getState(props.viajeReview.viaje);
});

// Method
const goDetails = () => {
  router.push({
    name: 'viajeDetails',
    query: {
      viajeId: props.viajeReview.viaje.id,
    },
  });
};

const getFullname = (user: AccountType) => {
  return user.nombre + ' ' + user.apellido;
};

const triggerAction = async (action: ActionFn) => {
  try {
    await action();
    emit('refreshTrips');
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="scss">
.card {
  width: 345px;

  .card-info {
    p {
      margin: 0;
    }

    .city {
      font-weight: bold;
      font-size: 20px;
    }

    .country {
      color: #3d3b40;
    }
  }

  .info-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 12px;
  }
}
</style>
