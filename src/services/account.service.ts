import { AuthorizedService } from 'src/api/ServerApi';
import AccountType from 'src/types/AccountType';

export const getAccountInfo = async (): Promise<AccountType> => {
  const response = await AuthorizedService.get('/usuario');
  return response.data;
};
