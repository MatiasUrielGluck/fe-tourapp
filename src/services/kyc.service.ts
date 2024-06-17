import { AuthorizedService } from 'src/api/ServerApi';

import GeneralKycRequestDTO from 'src/dto/kyc/GeneralKycRequestDTO';
import GuiaKycRequestDTO from 'src/dto/kyc/GuiaKycRequestDTO';
import KycResponseDTO from 'src/dto/kyc/KycResponseDTO';

export const saveGeneralKyc = async (
  generalKycRequestDTO: GeneralKycRequestDTO
): Promise<KycResponseDTO> => {
  const response = await AuthorizedService.put(
    '/usuario/kyc',
    generalKycRequestDTO
  );
  return response.data;
};

export const saveGuiaKyc = async (
  guiaKycRequestDTO: GuiaKycRequestDTO
): Promise<KycResponseDTO> => {
  const response = await AuthorizedService.put(
    '/usuario/kyc/guia',
    guiaKycRequestDTO
  );
  return response.data;
};
