import { RegisterDto } from "../dto/register-auth.dto";
import { LoginDto } from "../dto/login-auth.dto";

export const autLoginhMock: LoginDto = {
  email: "theo@gmail.com",
  password: "root"
}

export const authRegisterMock: RegisterDto = {
  firstname: "Theo",
  lastname: "RACHER RAULIN",
  email: "to@gmail.com",
  password: "root"
}

export const authRegisterEmailFoundMock: RegisterDto = {
  firstname: "Theo",
  lastname: "RACHER RAULIN",
  email: "theo@gmail.com",
  password: "root"
}