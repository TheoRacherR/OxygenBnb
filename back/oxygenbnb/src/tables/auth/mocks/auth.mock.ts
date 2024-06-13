import { RegisterDto } from '../dto/register-auth.dto';
import { LoginDto } from '../dto/login-auth.dto';

export const authLoginMock: LoginDto = {
  email: 'theo@gmail.com',
  password: 'toor',
};

export const authRegisterMock: RegisterDto = {
  firstname: 'Theo',
  lastname: 'RACHER RAULIN',
  email: 'tcvcvcvcvo@gmail.com',
  password: 'root',
};

export const authRegisterEmailFoundMock: RegisterDto = {
  firstname: 'Theo',
  lastname: 'RACHER RAULIN',
  email: 'theo@gmail.com',
  password: 'root',
};
