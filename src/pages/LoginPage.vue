<template>
  <authentication-layout
    title="Ingresar"
    action="login"
    :showErrorMsg="showErrorMsg"
    @executeMain="onLogin(AuthStrategiesEnum.LOCAL)"
  >
    <template #form>
      <q-input
        v-model="email"
        type="text"
        label="Email"
        filled
        input-style="font-size: 17px"
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
        @keydown.enter="onLogin(AuthStrategiesEnum.LOCAL)"
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
import LoginDTO from 'src/dto/authentication/LoginDTO';
import {
  authenticate,
  destroyAuthentication,
} from 'src/helpers/authenticationHelper';
import { useRouter } from 'vue-router';
import AuthenticationLayout from 'layouts/AuthenticationLayout.vue';
import { showSnackbar } from 'src/utils/snackbar';
import AuthStrategiesEnum from 'src/enums/AuthStrategiesEnum';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'LoginPage',
});

const router = useRouter();
const accountStore = useAccountStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const showErrorMsg = ref(false);

const onLogin = async (authStrategy: AuthStrategiesEnum) => {
  const loginDTO: LoginDTO = {
    authStrategy: authStrategy,
    email: email.value,
    password: password.value,
  };
  try {
    await authenticate(loginDTO);
    if (!accountStore.kycCompleted) {
      showSnackbar('success', 'Por favor, completá los datos');
      return await router.push('/kyc');
    }
    showSnackbar('success', '¡Hola de nuevo!');
    await router.push('/home');
  } catch (e) {
    console.error(e);
    destroyAuthentication();
    showErrorMsg.value = true;
  }
};

onMounted(() => {
  if (new URLSearchParams(window.location.search).get('error')) {
    showSnackbar('error', 'Please login again');
  }
});
</script>
