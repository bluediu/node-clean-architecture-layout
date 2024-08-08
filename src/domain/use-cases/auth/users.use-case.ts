import { UserEntity } from '../../entities';

import { AuthRepository } from '../../repositories';

interface IUsesUseCase {
  list(): Promise<UserEntity[]>;
}

export class UsersUC implements IUsesUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async list(): Promise<UserEntity[]> {
    const users = await this.authRepository.getUsers();
    return users;
  }
}
