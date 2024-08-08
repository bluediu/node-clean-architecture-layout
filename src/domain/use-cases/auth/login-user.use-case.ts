import { JwtAdapter } from '../../../config';

import { CustomError } from '../../errors';
import { TSignToken } from '../../../types';
import { IUserToken } from '../../../interfaces';

import { LoginUserDto } from '../../dtos/auth';

import { AuthRepository } from '../../repositories';

interface ILoginUseUseCase {
  execute(loginUserDto: LoginUserDto): Promise<IUserToken>;
}

export class LoginUser implements ILoginUseUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: TSignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<IUserToken> {
    // Login
    const user = await this.authRepository.login(loginUserDto);

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
