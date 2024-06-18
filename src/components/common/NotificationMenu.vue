<template>
  <q-btn flat dense round icon="notifications" class="q-ml-md">
    <q-badge color="red" floating>{{ notificationCount }}</q-badge>

    <q-menu transition-show="jump-down" transition-hide="jump-up">
      <q-list style="min-width: 100px">
        <div v-for="(notification, index) in notificationList" :key="index">
          <q-item
            clickable
            v-ripple
            @click="onNotificationClick(notification.id)"
          >
            <q-item-section>
              <q-item-label lines="1"
                ><span v-html="notification.mensaje"></span
              ></q-item-label>
              <q-item-label caption
                ><span :class="[notification.visto ? '' : 'unseen']">{{
                  formatDate(notification.fecha)
                }}</span></q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="notification-actions">
                <q-btn
                  v-if="!notification.visto"
                  class="btn"
                  icon="check"
                  dense
                  flat
                  color="primary"
                  @click.stop="onNotificationRead(notification.id)"
                />

                <q-btn
                  icon="delete"
                  dense
                  flat
                  color="red"
                  @click.stop="onNotificationDelete(notification.id)"
                />
              </div>
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup lang="ts">
import { useNotificationStore } from 'stores/notification-store';
import { computed } from 'vue';
import { formatDate } from 'src/helpers/dateHelper';

defineOptions({
  name: 'NotificationMenu',
});

// Store
const notificationStore = useNotificationStore();

// Computed
const notificationList = computed(() => {
  return notificationStore.notifications;
});

const notificationCount = computed(() => {
  return notificationList.value.filter((notification) => !notification.visto)
    .length;
});

// Method
const onNotificationClick = (id: number) => {
  console.warn(id);
};

const onNotificationRead = (id: number) => {
  notificationStore.readNotification(id);
};

const onNotificationDelete = (id: number) => {
  notificationStore.deleteNotification(id);
};
</script>

<style scoped lang="scss">
.unseen {
  font-weight: bold;
  color: $primary;
}

.notification-actions {
  display: flex;
  flex-flow: row nowrap;
  gap: 4px;
}
</style>
