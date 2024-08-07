import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { AuthRepository } from '../../repositories/auth.repository';

interface IUserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface IRegisterUseUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<IUserToken>;
}

type TSignToken = (
  payload: Object,
  duration?: string
) => Promise<string | null>;

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
