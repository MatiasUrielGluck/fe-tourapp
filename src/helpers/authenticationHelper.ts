import LoginDTO from 'src/dto/authentication/LoginDTO';
import { login, signup } from 'src/services/authentication.service';
import { getAccountInfo } from 'src/services/account.service';
import { useAccountStore } from 'stores/account-store';
import SignupDTO from 'src/dto/authentication/SignupDTO';
import LoginResponseDTO from 'src/dto/authentication/LoginResponseDTO';

export const setAccountInfo = async () => {
  const accountStore = useAccountStore();
  const accountResponse = await getAccountInfo();
  accountStore.setAccount(accountResponse);
};

export const handleLoginResponse = async (response: LoginResponseDTO) => {
  const { token, expiresIn } = response;
  const expiration = Date.now() + expiresIn;
  localStorage.setItem('token', token);
  localStorage.setItem('expiration', JSON.stringify(expiration));
  await setAccountInfo();
};

export const authenticate = async (loginRequest: LoginDTO) => {
  const loginResponse: LoginResponseDTO = await login(loginRequest);
  await handleLoginResponse(loginResponse);
};

export const makeSignup = async (signupDTO: SignupDTO) => {
  const signUpResponse = await signup(signupDTO);
  await handleLoginResponse(signUpResponse);
};

export const destroyAuthentication = () => {
  const accountStore = useAccountStore();
  localStorage.clear();
  accountStore.resetAccount();
};

export const logout = () => {
  destroyAuthentication();
  window.location.replace('/login');
};
