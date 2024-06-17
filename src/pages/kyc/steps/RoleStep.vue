<template>
  <div class="btn-container">
    <q-btn
      class="btn"
      color="primary"
      icon="beach_access"
      label="TURISTA"
      @click="setRole(RolUsuarioEnum.TURISTA)"
    />

    <q-btn
      class="btn"
      color="secondary"
      icon="support_agent"
      label="GUIA"
      @click="setRole(RolUsuarioEnum.GUIA)"
    />
  </div>
</template>

<script setup lang="ts">
import { useKycStore } from 'stores/kyc-store';
import RolUsuarioEnum from 'src/enums/RolUsuarioEnum';

defineOptions({
  name: 'RoleStep',
});

const emit = defineEmits(['onNext', 'onBack']);

const kycStore = useKycStore();

const setRole = (role: RolUsuarioEnum) => {
  kycStore.rol = role;
  emit('onNext');
};
</script>

<style scoped lang="scss">
.btn-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 18px;

  .btn {
    width: 50%;
    max-width: 140px;
    height: 130px;
  }
}
</style>
