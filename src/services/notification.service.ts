import { AuthorizedService } from 'src/api/ServerApi';
import NotificatonResponseDTO from 'src/dto/notification/NotificatonResponseDTO';

const BASE_URL = '/notificacion';

export const getNotifications = async (): Promise<
  Array<NotificatonResponseDTO>
> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};

export const deleteNotification = async (id: number): Promise<void> => {
  const response = await AuthorizedService.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const readNotification = async (id: number): Promise<void> => {
  const response = await AuthorizedService.get(`${BASE_URL}/${id}`);
  return response.data;
};
