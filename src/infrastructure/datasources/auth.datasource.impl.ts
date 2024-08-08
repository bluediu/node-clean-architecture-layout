import { BcryptAdapter } from '../../config';

import { UserModel } from '../../data/mongodb';

import { UserMapper } from '../mappers';

import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

type THashFn = (password: string) => string;
type TCompareFn = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPw: THashFn = BcryptAdapter.hash,
    private readonly comparePw: TCompareFn = BcryptAdapter.compare
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await UserModel.find();
      return users;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    const msg = 'Email or password incorrect!';
    try {
      // Check email existence.
      const user = await UserModel.findOne({ email });

      if (!user) throw CustomError.badRequest(msg);

      const passwordCorrect = this.comparePw(password, user.password);

      if (!passwordCorrect) throw CustomError.badRequest(msg);

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      // Check email existence.
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.badRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPw(password),
      });
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
