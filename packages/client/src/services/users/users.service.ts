import { UserDto } from '~/common/types/types';
import { ApiPath, ContentType } from '../../common/enums/enums';
import { getToken } from '../../utils/auth';
import { Http } from '../http/http.service';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Users {
  private http: Http;

  private baseUrl: string;

  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.USERS;
  }

  public update(id: string, data: Partial<UserDto>): Promise<UserDto> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public deleteCurrentUser(): Promise<UserDto> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'DELETE',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Users };
export type { Constructor as UsersConstructor };
