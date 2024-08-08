import { UserEntity } from '../entities';

import { RegisterUserDto, LoginUserDto } from '../dtos/auth';

export abstract class AuthRepository {
  abstract login(loginUseDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
