import { Notify, QNotifyCreateOptions } from 'quasar';

const errorSnackbarProp: QNotifyCreateOptions = {
  position: 'top-right',
  type: 'negative',
  actions: [
    {
      icon: 'close',
      color: 'white',
      round: true,
    },
  ],
};

const successSnackbarProp: QNotifyCreateOptions = {
  position: 'top-right',
  type: 'positive',
  actions: [
    {
      icon: 'close',
      color: 'white',
      round: true,
    },
  ],
};

const snackbarMap = new Map<string, QNotifyCreateOptions>();
snackbarMap.set('error', errorSnackbarProp);
snackbarMap.set('success', successSnackbarProp);

export const showSnackbar = (type: 'success' | 'error', message: string) => {
  const props = snackbarMap.get(type);
  const snackbarProps = { ...props, message };
  Notify.create(snackbarProps);
};
