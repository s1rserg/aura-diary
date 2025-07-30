import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import {
  ExerciseDto,
  ExerciseQueryOptions,
  GetAllExercisesDto,
} from '~/common/types/types';

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

  public getAll(query: ExerciseQueryOptions): Promise<GetAllExercisesDto> {
    const token = getToken();

    const queryParams: Record<string, string> = {};

    if (query.name) queryParams.name = query.name;
    if (query.page !== undefined) queryParams.page = String(query.page);
    if (query.perPage !== undefined)
      queryParams.perPage = String(query.perPage);

    const arrayToQuery = (key: string, arr?: string[] | null) => {
      if (arr?.length) {
        queryParams[key] = arr.join(',');
      }
    };

    arrayToQuery('force', query.force);
    arrayToQuery('level', query.level);
    arrayToQuery('mechanic', query.mechanic);
    arrayToQuery('equipment', query.equipment);
    arrayToQuery('category', query.category);
    arrayToQuery('primaryMuscles', query.primaryMuscles);

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
