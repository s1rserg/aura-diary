import { AuthResponse, Privacy, User } from 'shared';
import { UserRepository } from './user.repository';
import { User as UserModel } from './user.model';
import { encryption } from '../../libs/encryption/encryption';
import { token } from '../../libs/token/token';

class UserService {
  private userRepository = new UserRepository();

  public async create(
    name: string,
    email: string,
    password: string,
  ): AuthResponse {
    if ((await this.userRepository.findByEmail(email)).length !== 0) {
      throw { status: 409, errors: 'This email is already registered' };
    }

    password = await encryption.encrypt(password);
    const user = await this.userRepository.create({ name, email, password });
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async signIn(email: string, password: string): AuthResponse {
    const [user] = await this.userRepository.findByEmail(email);
    if (!(await encryption.compare(password, user.password))) {
      throw { status: 403, errors: 'Wrong email or password' };
    }
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), jwtToken };
  }

  public async getById(id: string): User {
    const user = await this.userRepository.find(id);
    return user ? this.selectUserFields(user) : null;
  }

  public async togglePrivacy(id: string): User {
    const user = await this.userRepository.find(id);
    await this.userRepository.update(id, {
      privacy:
        user.privacy === Privacy.Private ? Privacy.Public : Privacy.Private,
    });

    return this.selectUserFields(user);
  }

  private selectUserFields(user: UserModel): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      privacy: user.privacy,
      createdAt: user.createdAt,
    };
  }
}

export { UserService };
