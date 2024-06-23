import { AuthorizedService } from 'src/api/ServerApi';
import ChatDTO from 'src/dto/chat/ChatDTO';

const BASE_URL = '/chat';

export const getChats = async (): Promise<Array<ChatDTO>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};
