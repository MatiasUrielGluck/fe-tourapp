<template>
  <authentication-layout
    title="Registro"
    action="sigup"
    @executeMain="onSignup(AuthStrategiesEnum.LOCAL)"
  >
    <template #form>
      <q-input
        v-model="email"
        type="text"
        label="Email"
        filled
        input-style="font-size: 17px"
        :error="userAlreadyExists"
        :rules="[(val) => required(val), (val) => isEmailValid(val)]"
      >
        <template v-slot:append>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        v-model.trim="password"
        :type="showPassword ? 'text' : 'password'"
        label="Contraseña"
        filled
        input-style="font-size: 17px"
        @keydown.enter="onSignup(AuthStrategiesEnum.LOCAL)"
        :rules="[(val) => isPasswordValid(val)]"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </template>
  </authentication-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  authenticate,
  destroyAuthentication,
  makeSignup,
} from 'src/helpers/authenticationHelper';
import { useRouter } from 'vue-router';
import AuthenticationLayout from 'layouts/AuthenticationLayout.vue';
import { showSnackbar } from 'src/utils/snackbar';
import {
  isEmailValid,
  isPasswordValid,
  required,
} from 'src/helpers/formValidationRules';
import SignupDTO from 'src/dto/authentication/SignupDTO';
import AuthStrategiesEnum from 'src/enums/AuthStrategiesEnum';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'SignupPage',
});

const router = useRouter();
const accountStore = useAccountStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const userAlreadyExists = ref(false);

const onSignup = async (authStrategy: AuthStrategiesEnum) => {
  const signupDTO: SignupDTO = {
    authStrategy: authStrategy,
    email: email.value,
    password: password.value,
  };
  try {
    userAlreadyExists.value = false;
    await makeSignup(signupDTO);
    await authenticate(signupDTO);
    if (!accountStore.kycCompleted) {
      showSnackbar('success', 'Por favor, completá los datos');
      return await router.push('/kyc');
    }
    showSnackbar('success', '¡Hola de nuevo!');
    await router.push('/');
  } catch (e) {
    console.error(e);
    destroyAuthentication();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (e.response.status === 409) userAlreadyExists.value = true;
    showSnackbar('error', 'Por favor intentá con otro email');
  }
};

onMounted(() => {
  if (new URLSearchParams(window.location.search).get('error')) {
    showSnackbar('error', 'Por favor volvé a iniciar sesión');
  }
});
</script>
