import AuthStrategiesEnum from 'src/enums/AuthStrategiesEnum';

type SignupDTO = {
  authStrategy: AuthStrategiesEnum;
  email: string;
  password?: string;
};

export default SignupDTO;
