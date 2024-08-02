import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  // abstract login() {}

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
