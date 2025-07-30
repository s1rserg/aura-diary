import { User } from './user.model';
import { BaseRepository } from '../../libs/core/base-repository';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.model.findOne({ where: { email } });
  }
}

export { UserRepository };
