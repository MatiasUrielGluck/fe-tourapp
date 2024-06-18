type NotificationType = {
  id: number;
  mensaje: string;
  accion: string | null;
  fecha: Date;
  visto: boolean;
};

export default NotificationType;
