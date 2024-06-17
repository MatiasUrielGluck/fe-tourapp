import axios, { AxiosInstance } from 'axios';
import { destroyAuthentication } from 'src/helpers/authenticationHelper';
import { showSnackbar } from 'src/utils/snackbar';

const BASE_URL = process.env.SERVER_URL;

const getToken = (): string | null => {
  return localStorage.getItem('token');
};

const UnauthorizedService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

const AuthorizedService: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AuthorizedService.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

AuthorizedService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      destroyAuthentication();
      window.location.replace('/login?error=true');
    } else if (error.response.status === 500) {
      showSnackbar('error', 'Ups! Parece que estamos teniendo problemas');
    }
    return;
  }
);

export { UnauthorizedService, AuthorizedService };
