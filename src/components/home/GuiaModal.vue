<template>
  <q-dialog
    v-model="modalOpen"
    backdrop-filter="blur(4px)"
    full-width
    full-height
  >
    <q-card>
      <div class="modal">
        <div class="top-bar fixed-top-right">
          <q-btn icon="close" dense rounded color="primary" v-close-popup />
        </div>

        <p class="title">{{ fullname }}</p>

        <q-separator />

        <div class="list">
          <p class="info-title">Credencial</p>
          <p class="info-desc">
            Número: <span>{{ credentialNumber }}</span>
          </p>
          <p class="info-desc">
            Vencimiento: <span>{{ credentialDate }}</span>
          </p>
        </div>

        <div class="list">
          <p class="review-title">Reviews</p>

          <q-scroll-area style="width: 100%; height: 50vh">
            <q-list separator padding>
              <q-item
                v-for="(review, index) in guide?.reviews"
                :key="index"
                style="padding: 18px 0"
              >
                <q-item-section>
                  <q-item-label>{{
                    review.ciudad + ', ' + review.pais
                  }}</q-item-label>
                  <q-item-label caption
                    ><span v-html="review.comentario"></span
                  ></q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-rating
                    v-model="review.puntuacion"
                    size="22px"
                    max="5"
                    color="primary"
                    icon="star_border"
                    icon-selected="star"
                    readonly
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import GuiaResponseDTO from 'src/dto/usuario/GuiaResponseDTO';
import { useAppStore } from 'stores/app-store';
import { getGuideInfoById } from 'src/services/usuario.service';
import { formatDateSymbol } from 'src/helpers/dateHelper';

defineOptions({
  name: 'GuiaModal',
});

interface Props {
  guiaId: number;
}

const props = defineProps<Props>();

const modalOpen = defineModel<boolean>();
const appStore = useAppStore();

// Ref
const guide = ref<GuiaResponseDTO>();

// Computed
const fullname = computed<string>(() => {
  return guide.value?.nombre + ' ' + guide.value?.apellido;
});

const credentialNumber = computed(() => {
  return guide.value?.credencial.numero;
});

const credentialDate = computed(() => {
  if (!guide.value) return '';
  return formatDateSymbol(
    new Date(guide.value.credencial.vencimiento),
    '/',
    'dd-mm-yyyy'
  );
});

// Methods
const fetchGuideDetails = async () => {
  try {
    appStore.showPreloader();
    guide.value = await getGuideInfoById(props.guiaId);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

// Cycle
onMounted(async () => {
  await fetchGuideDetails();
});
</script>

<style scoped lang="scss">
.modal {
  .top-bar {
    padding: 10px;
  }

  .title {
    padding: 8px;
    font-size: 28px;
    margin-bottom: 0;
  }

  .list {
    padding: 8px;

    .info-title {
      font-size: 22px;
      margin-bottom: 12px;
      color: $primary;
      font-weight: 500;
    }

    .review-title {
      font-size: 22px;
      margin: 12px 0 8px;
      color: $primary;
      font-weight: 500;
    }

    .info-desc {
      margin-bottom: 8px;
    }
  }
}
</style>
