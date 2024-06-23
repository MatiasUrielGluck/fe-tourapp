import { AuthorizedService } from 'src/api/ServerApi';
import FacturaDTO from 'src/dto/transaccion/FacturaDTO';

const BASE_URL = '/transaccion';

export const obtenerDocumentos = async (
  viajeId: number
): Promise<Array<FacturaDTO>> => {
  const response = await AuthorizedService.get(`${BASE_URL}/viaje/${viajeId}`);
  return response.data;
};

export const createTransaction = async (documentId: number) => {
  const response = await AuthorizedService.get(`${BASE_URL}/${documentId}`);
  return response.data;
};
