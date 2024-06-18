<template>
  <div>
    <q-stepper
      v-model="currentStep"
      ref="stepper"
      :vertical="Platform.is.mobile"
      color="primary"
      animated
      flat
      active-color="primary"
      class="stepper"
    >
      <h1 v-if="Platform.is.mobile">Antes de comenzar</h1>
      <p v-if="Platform.is.mobile">
        Por favor completá la siguiente información
      </p>

      <q-step
        v-for="(step, index) of stepsToShow"
        :key="index"
        :name="step.name"
        :title="step.title"
        :icon="step.icon"
        :done="step.done"
      >
        <BaseStep>
          <component
            :is="step.component"
            @nextDisabled="nextDisabled"
            @onNext="stepper.next()"
            @onBack="stepper.previous()"
          />
        </BaseStep>
      </q-step>

      <template v-slot:navigation>
        <div class="stepper-nav">
          <transition name="fade">
            <q-btn
              v-if="currentStep > 1"
              flat
              color="primary"
              @click="stepper.previous()"
              label="Atrás"
              class="q-ml-sm btn"
            />
          </transition>

          <q-btn
            @click="onNext"
            color="primary"
            :label="
              currentStep === stepsToShow.length ? 'Finalizar' : 'Continuar'
            "
            class="btn"
            :disable="isNextDisabled"
          />
        </div>
      </template>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import { Platform, QStepper } from 'quasar';
import KycStepType from 'pages/kyc/KycStepType';
import RoleStep from 'pages/kyc/steps/RoleStep.vue';
import BaseStep from 'pages/kyc/BaseStep.vue';
import { useKycStore } from 'stores/kyc-store';
import PersonalInfoStep from './steps/PersonalInfoStep.vue';
import AditionalInfoStep from 'pages/kyc/steps/AdditionalInfoStep.vue';
import CredentialStep from './steps/CredentialStep.vue';
import RolUsuarioEnum from 'src/enums/RolUsuarioEnum';
import { handleGeneralKyc, handleGuiaKyc } from 'src/helpers/kycHelper';
import { useRouter } from 'vue-router';
import { showSnackbar } from 'src/utils/snackbar';
import { initializeInstance } from 'src/helpers/initializeInstance';

defineOptions({
  name: 'KycPage',
});

const kycStore = useKycStore();
const router = useRouter();

// Ref
const stepper = ref() as Ref<QStepper>;
const currentStep = ref(1);
const isNextDisabled = ref(true);

// Computed
const stepsToShow = computed<Array<KycStepType>>(() => {
  return steps.value.filter((step) => step.show);
});

const steps = computed<Array<KycStepType>>(() => {
  return [
    {
      name: 1,
      title: 'Tu rol',
      icon: 'settings',
      done: currentStep.value > 1,
      component: RoleStep,
      show: true,
    },
    {
      name: 2,
      title: 'Información básica',
      icon: 'person',
      done: currentStep.value > 2,
      component: PersonalInfoStep,
      show: true,
    },
    {
      name: 3,
      title: 'Información adicional',
      icon: 'info',
      done: currentStep.value > 3,
      component: AditionalInfoStep,
      show: true,
    },
    {
      name: 4,
      title: 'Tu credencial',
      icon: 'badge',
      done: currentStep.value > 4,
      component: CredentialStep,
      show: kycStore.rol === 'GUIA',
    },
  ];
});

// Method
const nextDisabled = (state: boolean) => {
  isNextDisabled.value = state;
};

const onNext = async () => {
  nextDisabled(true);
  if (currentStep.value < stepsToShow.value.length) stepper.value.next();
  else await saveKycData();
};

const saveKycData = async () => {
  try {
    let kycCompleted = await handleGeneralKyc();

    if (kycStore.rol === RolUsuarioEnum.GUIA) {
      kycCompleted = await handleGuiaKyc();
    }

    if (kycCompleted) {
      await initializeInstance();
      showSnackbar('success', 'Ahora a viajar!');
      await router.push('/');
    }
  } catch (e) {
    console.error(e);
    showSnackbar(
      'error',
      'Alguno de tus datos son incorrectos. Por favor revisalos y volvé a intentar.'
    );
  }
};
</script>

<style scoped lang="scss">
.stepper {
  height: 100vh;
  padding: 0;

  h1 {
    padding: 24px;
    font-size: 30px;
    font-weight: 400;
    text-align: center;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .stepper-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 24px;
    width: 100%;
    background: #fff;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    .btn {
      width: 100%;
      max-width: 800px;
      font-size: 16px;
    }
  }
}
</style>
