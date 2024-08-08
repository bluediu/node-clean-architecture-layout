import {
  AuthDatasource,
  AuthRepository,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }

  login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDatasource.login(loginUserDto);
  }
}
