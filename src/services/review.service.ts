import { AuthorizedService } from 'src/api/ServerApi';
import ReviewRequestDTO from 'src/dto/review/ReviewRequestDTO';

const BASE_URL = '/review';

export const createReview = async (data: ReviewRequestDTO): Promise<void> => {
  const response = await AuthorizedService.post(`${BASE_URL}`, data);
  return response.data;
};
