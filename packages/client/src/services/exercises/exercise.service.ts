import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { ExerciseDto, ExerciseQueryOptions } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Exercises {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.EXERCISES;
  }

  public getById(id: string): Promise<ExerciseDto> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
      token,
    });
  }

  public getAll(query: ExerciseQueryOptions): Promise<ExerciseDto[]> {
    const token = getToken();

    const queryParams: Record<string, string> = {};

    if (query.name) queryParams.name = query.name;
    if (query.page !== undefined) queryParams.page = String(query.page);
    if (query.perPage !== undefined)
      queryParams.perPage = String(query.perPage);
    if (query.force) queryParams.force = query.force;
    if (query.level) queryParams.level = query.level;
    if (query.mechanic) queryParams.mechanic = query.mechanic;
    if (query.equipment) queryParams.equipment = query.equipment;
    if (query.category) queryParams.category = query.category;

    if (query.primaryMuscles && query.primaryMuscles.length > 0) {
      queryParams.primaryMuscles = query.primaryMuscles.join(',');
    }

    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: queryParams,
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Exercises };
export type { Constructor as ExercisesConstructor };
