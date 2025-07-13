import { User, IUser } from './user.model';
import { BaseRepository } from '../../libs/core/base-repository';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(IUser);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }
}

export { UserRepository };
