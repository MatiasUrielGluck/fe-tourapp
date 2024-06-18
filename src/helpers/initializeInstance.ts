import { useNotificationStore } from 'stores/notification-store';
import { useAccountStore } from 'stores/account-store';
import { getAccountInfo } from 'src/services/account.service';

export const initializeAccountInfo = async () => {
  const accountStore = useAccountStore();
  const accountResponse = await getAccountInfo();
  accountStore.setAccount(accountResponse);
};

const initializeNotifications = async () => {
  const notificationStore = useNotificationStore();
  await notificationStore.fetchNotifications();
};

export const initializeInstance = async () => {
  await initializeAccountInfo();
  await initializeNotifications();
};
