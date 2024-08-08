import { UserEntity } from '../entities';

import { RegisterUserDto, LoginUserDto } from '../dtos/auth';

export abstract class AuthDatasource {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract getUsers(): Promise<UserEntity[]>;
}
