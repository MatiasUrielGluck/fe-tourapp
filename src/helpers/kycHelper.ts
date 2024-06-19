import { useKycStore } from 'stores/kyc-store';
import { saveGeneralKyc, saveGuiaKyc } from 'src/services/kyc.service';
import GeneralKycRequestDTO from 'src/dto/kyc/GeneralKycRequestDTO';
import GuiaKycRequestDTO from 'src/dto/kyc/GuiaKycRequestDTO';

const kycStore = useKycStore();

export const handleGeneralKyc = async (): Promise<boolean> => {
  const data: GeneralKycRequestDTO = {
    apellido: kycStore.apellido,
    dni: Number(kycStore.dni),
    foto: kycStore.foto,
    genero: kycStore.genero,
    nombre: kycStore.nombre,
    numTelefono: kycStore.numTelefono,
    rol: kycStore.rol,
  };

  const responseDTO = await saveGeneralKyc(data);
  return responseDTO.kycCompleted;
};

export const handleGuiaKyc = async (): Promise<boolean> => {
  const data: GuiaKycRequestDTO = {
    foto: kycStore.credencial.foto,
    numero: Number(kycStore.credencial.numero),
    vencimiento: new Date(kycStore.credencial.vencimiento),
    idiomas: kycStore.idiomas,
  };

  const responseDTO = await saveGuiaKyc(data);
  return responseDTO.kycCompleted;
};
