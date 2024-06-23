<template>
  <q-layout>
    <q-page-container>
      <q-page class="outer-container">
        <div class="container">
          <div class="left-container">
            <h1>{{ title }}</h1>
            <p class="subtitle">Te damos la bienvenida a TourApp!</p>
            <div :class="['form', isLogin ? 'login' : 'signup']">
              <slot name="form"></slot>
            </div>
            <div :class="['form-actions', isLogin ? 'login' : 'signup']">
              <p :class="['error-msg', showErrorMsg ? 'active' : '']">
                Por favor revisá tu usuario y contraseña
              </p>

              <q-btn
                no-caps
                rounded
                text-color="white"
                :class="['left-btn', isLogin ? 'login' : 'signup']"
                @click="$emit('executeMain')"
              >
                {{ mainBtnText }}
              </q-btn>
              <p
                v-if="action === 'login'"
                class="text-weight-medium secondary-link"
              >
                Olvidé mi contraseña
              </p>
              <p
                v-if="action === 'login'"
                class="text-weight-medium secondary-link mobile-signup"
                @click="$router.push('/signup')"
              >
                {{ secondarySubtitle }} <span>{{ secondaryBtnText }}</span>
              </p>
              <p
                v-else
                class="text-weight-medium secondary-link mobile-signup"
                @click="$router.push('/login')"
              >
                {{ secondarySubtitle }} <span>{{ secondaryBtnText }}</span>
              </p>
              <div class="social-login">
                <div class="social-login-separator">
                  <div class="separator"></div>
                  <p>O CONTINUAR CON</p>
                  <div class="separator"></div>
                </div>
                <div class="social-login-buttons">
                  <q-btn
                    square
                    :icon="`img:${googleIcon}`"
                    class="social-btn"
                    @click="showSocialModal(AuthStrategiesEnum.GOOGLE)"
                  />
                  <q-btn
                    square
                    :icon="`img:${facebookIcon}`"
                    class="social-btn"
                    @click="showSocialModal(AuthStrategiesEnum.FACEBOOK)"
                  />
                  <q-btn
                    square
                    :icon="`img:${appleIcon}`"
                    class="social-btn reduced"
                    @click="showSocialModal(AuthStrategiesEnum.APPLE)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="right-container">
            <div class="right-action">
              <h1>Te damos la bienvenida a<br />¡Encontrá tu guía!</h1>
              <p style="margin: 0">{{ secondarySubtitle }}</p>
              <q-btn
                no-caps
                rounded
                outline
                color="white"
                style="height: 40px"
                @click="$router.push(secondaryRedirection)"
              >
                {{ secondaryBtnText }}
              </q-btn>
            </div>
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              autoplay
              class="full-height full-width"
            >
              <q-carousel-slide
                :name="1"
                img-src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-carousel-slide
                :name="2"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide :name="4" :img-src="nycImage" />
            </q-carousel>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import googleIcon from '/src/assets/icons/google.png';
import facebookIcon from '/src/assets/icons/facebook.svg';
import appleIcon from '/src/assets/icons/apple.png';
import nycImage from '/src/assets/images/nyc.jpg';
import AuthStrategiesEnum from 'src/enums/AuthStrategiesEnum';
import { showSnackbar } from 'src/utils/snackbar';
import LoginDTO from 'src/dto/authentication/LoginDTO';
import { authenticate, makeSignup } from 'src/helpers/authenticationHelper';
import SignupDTO from 'src/dto/authentication/SignupDTO';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { isEmailValid } from 'src/helpers/formValidationRules';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'AuthenticationLayout',
});

interface Props {
  title: string;
  action: 'login' | 'sigup';
  showErrorMsg?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showErrorMsg: false,
});

defineEmits(['executeMain']);

const $q = useQuasar();
const router = useRouter();
const accountStore = useAccountStore();

const isLogin = props.action === 'login';
const mainBtnText = isLogin ? 'Ingresar' : 'Registrarme';
const secondaryBtnText = isLogin ? 'Registrarme' : 'Ingresar';
const secondaryRedirection = isLogin ? '/signup' : '/login';
const secondarySubtitle = isLogin
  ? 'Todavía no tenés una cuenta?'
  : 'Ya tenés una cuenta?';
const slide = ref(1);
const socialEmail = ref('');

const showSocialModal = (authStrategy: AuthStrategiesEnum) => {
  $q.dialog({
    title: `Iniciar sesión con ${authStrategy}`,
    message: `Por favor ingresá tu email de ${authStrategy}`,
    prompt: {
      model: '',
      isValid: (val) => typeof isEmailValid(val) !== 'string',
      type: 'text',
    },
    cancel: true,
    persistent: true,
  }).onOk((data) => {
    socialEmail.value = data;
    onSocialLogin(authStrategy);
  });
};

const socialSignup = async (authStrategy: AuthStrategiesEnum) => {
  try {
    const signupDTO: SignupDTO = {
      authStrategy: authStrategy,
      email: socialEmail.value,
    };

    await makeSignup(signupDTO);
    await onSocialLogin(authStrategy, 1);
  } catch (e) {
    console.error(e);
    showSnackbar(
      'error',
      'Estamos teniendo problemas. Por favor intentá de nuevo.'
    );
  }
};

const onSocialLogin = async (
  authStrategy: AuthStrategiesEnum,
  attempts = 0
) => {
  const loginRequest: LoginDTO = {
    authStrategy: authStrategy,
    email: socialEmail.value,
  };
  try {
    await authenticate(loginRequest);
    if (!accountStore.kycCompleted) {
      showSnackbar('success', 'Por favor, completá los datos');
      return await router.push('/kyc');
    }

    showSnackbar('success', '¡Hola de nuevo!');
    await router.push('/');
  } catch (e) {
    if (attempts > 0) {
      showSnackbar(
        'error',
        'Estamos teniendo problemas. Por favor intentá de nuevo.'
      );
    }
    await socialSignup(authStrategy);
  }
};
</script>

<style scoped lang="scss">
.outer-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    flex-flow: row nowrap;
    width: 80%;
    max-width: 1110px;
    height: 530px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

    @media (width < 768px) {
      flex-flow: column nowrap;
      width: 100%;
      height: initial;
    }

    .left-container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      text-align: center;
      width: 50%;
      background: $light;
      padding: 36px;

      @media (width < 768px) {
        height: 100vh;
        width: 100%;
        padding: 24px;
        text-align: center;
      }

      .subtitle {
        display: none;
        margin-top: 12px;
        color: $primary;
        font-size: 16px;
        font-weight: bold;

        @media (width < 768px) {
          display: block;
        }
      }

      .form {
        margin-top: 36px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;

        &.login {
          gap: 24px;
        }

        &.signup {
          gap: 14px;
        }
      }

      .form-actions {
        &.login {
          margin-top: 12px;
        }

        .left-btn {
          &.login {
            margin-top: 12px;
          }

          width: 100%;
          height: 40px;
          background: rgb(55, 140, 231);
          background: linear-gradient(
            180deg,
            rgba(55, 140, 231, 1) 20%,
            rgba(103, 198, 227, 1) 100%
          );
        }

        .secondary-link {
          margin-top: 24px;
          color: $dark;
          cursor: pointer;
        }

        .mobile-signup {
          display: none;

          span {
            color: #378ce7;
          }

          @media (width < 768px) {
            display: block;
          }
        }

        .error-msg {
          color: $negative;
          margin: 0;
          opacity: 0;
          transition: opacity 0.3s ease;

          &.active {
            opacity: 100%;
          }
        }
      }

      .social-login {
        margin-top: 18px;

        .social-login-separator {
          display: flex;
          flex-flow: row nowrap;
          width: 100%;
          align-items: center;
          justify-content: center;

          p {
            width: 100%;
            text-wrap: nowrap;
            margin: 0 8px;
          }

          .separator {
            width: 100%;
            border: 1px solid $primary;
          }
        }

        .social-login-buttons {
          margin-top: 16px;
          display: flex;
          flex-flow: row nowrap;
          width: 100%;
          align-items: center;
          justify-content: space-between;

          .social-btn {
            width: 80px;
            height: 50px;
            border-radius: 4px;
          }
        }
      }
    }

    .right-container {
      position: relative;
      width: 50%;

      @media (width < 768px) {
        display: none;
      }

      .right-action {
        z-index: 100;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        gap: 18px;
        background: rgba(0, 0, 0, 0.48);

        h1,
        p {
          text-align: center;
          color: #fff;
        }

        h1 {
          font-size: 36px;
          font-weight: bold;
          letter-spacing: 1px;

          @media (width < 768px) {
            font-size: 28px;
          }
        }

        p {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
