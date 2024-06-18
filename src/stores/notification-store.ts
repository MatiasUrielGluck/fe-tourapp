import { defineStore } from 'pinia';
import {
  deleteNotification,
  getNotifications,
  readNotification,
} from 'src/services/notification.service';
import NotificationType from 'src/types/NotificationType';

type NotificationStoreType = {
  notifications: NotificationType[];
};

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationStoreType => ({
    notifications: [],
  }),

  getters: {},

  actions: {
    async fetchNotifications() {
      try {
        const notificationList = await getNotifications();

        this.notifications = notificationList.map((notification) => {
          const mappedNotification: NotificationType = {
            accion: notification.accion,
            fecha: new Date(notification.fecha),
            id: notification.id,
            mensaje: notification.mensaje,
            visto: notification.visto,
          };
          return mappedNotification;
        });

        this.notifications = this.notifications.sort(
          (a: NotificationType, b: NotificationType) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          }
        );
      } catch (e) {
        console.error(e);
      }
    },

    async readNotification(id: number) {
      try {
        await readNotification(id);
        await this.fetchNotifications();
      } catch (e) {
        console.error(e);
      }
    },

    async deleteNotification(id: number) {
      try {
        await deleteNotification(id);
        await this.fetchNotifications();
      } catch (e) {
        console.error(e);
      }
    },
  },
});
