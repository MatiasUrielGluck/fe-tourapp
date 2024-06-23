import ViajeType from 'src/types/ViajeType';
import ReviewType from 'src/types/ReviewType';
import ServicioType from 'src/types/ServicioType';

type ViajeReviewDTO = {
  viaje: ViajeType;
  review: ReviewType;
  servicio: ServicioType;
};

export default ViajeReviewDTO;
