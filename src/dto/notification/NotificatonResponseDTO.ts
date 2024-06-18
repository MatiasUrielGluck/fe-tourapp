type NotificatonResponseDTO = {
  id: number;
  mensaje: string;
  accion: string | null;
  fecha: string;
  visto: boolean;
};

export default NotificatonResponseDTO;
