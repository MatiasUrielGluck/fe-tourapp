import AuthStrategiesEnum from 'src/enums/AuthStrategiesEnum';

type LoginDTO = {
  authStrategy: AuthStrategiesEnum;
  email: string;
  password?: string;
};

export default LoginDTO;
