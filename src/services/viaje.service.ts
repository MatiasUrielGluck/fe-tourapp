import { AuthorizedService } from 'src/api/ServerApi';
import ViajeReviewDTO from 'src/dto/viaje/ViajeReviewDTO';
import ViajeType from 'src/types/ViajeType';
import ViajeRequestDTO from 'src/dto/viaje/ViajeRequestDTO';

const BASE_URL = '/viaje';

export const getViajes = async (): Promise<Array<ViajeReviewDTO>> => {
  const response = await AuthorizedService.get(BASE_URL);
  return response.data;
};

export const createTrip = async (
  data: ViajeRequestDTO
): Promise<Array<ViajeType>> => {
  const response = await AuthorizedService.post(`${BASE_URL}/registrar`, data);
  return response.data;
};

export const confirmTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/confirmar/${id}`);
  return response.data;
};

export const cancelTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/cancelar/${id}`);
  return response.data;
};

export const concludeTrip = async (id: number): Promise<Array<void>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/concluir/${id}`);
  return response.data;
};
