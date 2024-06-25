import { AuthorizedService } from 'src/api/ServerApi';
import ChatDTO from 'src/dto/chat/ChatDTO';
import MessageResponseDTO from 'src/dto/chat/MessageResponseDTO';
import MessageRequestDTO from 'src/dto/chat/MessageRequestDTO';

const BASE_URL = '/chat';

export const getChats = async (): Promise<Array<ChatDTO>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};

export const getMessagesByChat = async (
  chatId: number
): Promise<Array<MessageResponseDTO>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/${chatId}`);
  return response.data;
};

export const sendMessage = async (
  data: MessageRequestDTO
): Promise<MessageResponseDTO> => {
  const response = await AuthorizedService.post(`${BASE_URL}/msg`, data);
  return response.data;
};
