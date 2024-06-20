import { AuthorizedService } from 'src/api/ServerApi';
import ServicioType from 'src/types/ServicioType';
import ServicioRequestDTO from 'src/dto/servicio/ServicioRequestDTO';

const BASE_URL = '/servicio';

export const getServicios = async (
  guiaId: number
): Promise<Array<ServicioType>> => {
  const response = await AuthorizedService.get(`${BASE_URL}`, {
    params: {
      guiaId,
    },
  });

  return response.data;
};

export const crearServicio = async (
  data: ServicioRequestDTO
): Promise<void> => {
  const response = await AuthorizedService.post(`${BASE_URL}`, data);

  return response.data;
};

export const editarServicio = async (
  id: number,
  data: ServicioRequestDTO
): Promise<void> => {
  const response = await AuthorizedService.put(`${BASE_URL}/${id}`, data);

  return response.data;
};

export const eliminarServicio = async (id: number): Promise<void> => {
  const response = await AuthorizedService.delete(`${BASE_URL}/${id}`);
  return response.data;
};
