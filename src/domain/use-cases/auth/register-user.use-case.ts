import { JwtAdapter } from '../../../config';

import { CustomError } from '../../errors';
import { TSignToken } from '../../../types';
import { IUserToken } from '../../../interfaces';

import { RegisterUserDto } from '../../dtos/auth';

import { AuthRepository } from '../../repositories';

interface IRegisterUseUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<IUserToken>;
}

export class RegisterUser implements IRegisterUseUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: TSignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<IUserToken> {
    // Create user.
    const user = await this.authRepository.register(registerUserDto);

    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
