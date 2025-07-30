import { ApiPath, ContentType } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import {
  GetAllWorkoutsDto,
  WorkoutCreateRequestDto,
  WorkoutDto,
  WorkoutQueryOptions,
  WorkoutUpdateRequestDto,
} from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Workouts {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.WORKOUTS;
  }

  public getById(id: string): Promise<WorkoutDto> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
      token,
    });
  }

  public getAll(query: WorkoutQueryOptions): Promise<GetAllWorkoutsDto> {
    const token = getToken();
    const queryParams: Record<string, string> = {};

    if (query.name) queryParams.name = query.name;
    if (query.createdAt) queryParams.createdAt = query.createdAt;
    if (query.page !== undefined) queryParams.page = String(query.page);
    if (query.perPage !== undefined)
      queryParams.perPage = String(query.perPage);

    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: queryParams,
      token,
    });
  }

  public create(data: WorkoutCreateRequestDto): Promise<WorkoutDto> {
    const token = getToken();

    return this.http.load(this.getUrl(), {
      method: 'POST',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public update(
    id: string,
    data: WorkoutUpdateRequestDto,
  ): Promise<WorkoutDto> {
    const token = getToken();

    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PUT',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public delete(id: string): Promise<void> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Workouts };
export type { Constructor as WorkoutsConstructor };
