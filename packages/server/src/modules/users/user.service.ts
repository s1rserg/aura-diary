import { UserRepository } from './user.repository';
import { User as UserModel } from './user.model';
import { encryption } from '../../libs/encryption/encryption';
import { token } from '../../libs/token/token';
import { AuthResponseDto, Privacy, UserDto } from '../../libs/common/common';

class UserService {
  private userRepository = new UserRepository();

  public async create(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    if (await this.userRepository.findByEmail(email)) {
      throw { status: 409, errors: 'This email is already registered' };
    }

    password = await encryption.encrypt(password);
    const user = await this.userRepository.create({ name, email, password });
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), token: jwtToken };
  }

  public async signIn(
    email: string,
    password: string,
  ): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, errors: 'Invalid email or password' };
    }
    if (!(await encryption.compare(password, user.password))) {
      throw { status: 401, errors: 'Invalid email or password' };
    }
    const jwtToken = token.createToken({ id: user.id }, '24h');
    return { user: this.selectUserFields(user), token: jwtToken };
  }

  public async getById(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.findById(id);
    return user ? this.selectUserFields(user) : null;
  }

  public async togglePrivacy(id: string): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw { status: 401, errors: 'This user does not exist' };
    }
    await this.userRepository.update(id, {
      privacy:
        user.privacy === Privacy.Private ? Privacy.Public : Privacy.Private,
    });

    return this.selectUserFields(user);
  }

  public async update(userPayload: Partial<UserDto>, id: string) {
    const updatedUser = await this.userRepository.update(id, userPayload);
    if (!updatedUser) {
      throw { status: 500, errors: 'Error happened while updating the user.' };
    }

    return this.selectUserFields(updatedUser);
  }

  public async delete(id: string) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) {
      throw { status: 500, errors: 'Error happened while deleting the user.' };
    }

    return true;
  }

  private selectUserFields(user: UserModel): UserDto {
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
