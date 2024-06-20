enum TipoServicioEnum {
  TOUR_INDIVIDUAL = 'TOUR_INDIVIDUAL',
  TOUR_GRUPAL = 'TOUR_GRUPAL',
  TRADUCCION = 'TRADUCCION',
}

export const tipoServicioEnumToLabel = (tipo: TipoServicioEnum): string => {
  switch (tipo) {
    case TipoServicioEnum.TOUR_INDIVIDUAL:
      return 'Tour Individual';

    case TipoServicioEnum.TOUR_GRUPAL:
      return 'Tour Grupal';

    case TipoServicioEnum.TRADUCCION:
      return 'Traducción';
  }
};

export const tipoServicioToString = (
  tipo: TipoServicioEnum
): string | undefined => {
  const map = new Map<TipoServicioEnum, string>([
    [TipoServicioEnum.TOUR_INDIVIDUAL, 'Tour Individual'],
    [TipoServicioEnum.TOUR_GRUPAL, 'Tour Grupal'],
    [TipoServicioEnum.TRADUCCION, 'Traducción'],
  ]);

  return map.get(tipo);
};

export const stringToTipoServicio = (cadena: string): TipoServicioEnum => {
  const map = new Map<string, TipoServicioEnum>([
    ['Tour Individual', TipoServicioEnum.TOUR_INDIVIDUAL],
    ['Tour Grupal', TipoServicioEnum.TOUR_GRUPAL],
    ['Traducción', TipoServicioEnum.TRADUCCION],
  ]);

  const result = map.get(cadena);
  if (!result) throw new Error('TipoServicio inválido');
  return result;
};

export default TipoServicioEnum;
