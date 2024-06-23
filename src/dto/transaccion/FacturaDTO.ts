import DocumentoEnum from 'src/enums/DocumentoEnum';

type FacturaDTO = {
  id: number;
  viajeId: number;
  total: number;
  precio: number;
  comision: number;
  motivo: DocumentoEnum;
  pagada: boolean;
};

export default FacturaDTO;
