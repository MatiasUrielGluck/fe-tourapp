import { UnauthorizedService } from 'src/api/ServerApi';
import LoginDTO from 'src/dto/authentication/LoginDTO';
import LoginResponseDTO from 'src/dto/authentication/LoginResponseDTO';
import SignupDTO from 'src/dto/authentication/SignupDTO';

export const login = async (data: LoginDTO): Promise<LoginResponseDTO> => {
  const response = await UnauthorizedService.post('/usuario/login', data);
  return response.data;
};

export const signup = async (data: SignupDTO): Promise<LoginResponseDTO> => {
  const response = await UnauthorizedService.post('/usuario/signup', data);
  return response.data;
};
