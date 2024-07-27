import { ApiPath, ContentType } from '../../common/enums/enums';
import { WorkoutEntry } from '../../common/types/data/workout-entry.type';
import { Leaderboard, UserStatistics } from '../../common/types/types';
import { getToken } from '../../utils/auth';
import { formatDateYYYYMMDD } from '../../utils/date/date';
import { Http } from '../http/http.service';

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

  public getWorkoutsForPeriod(start: Date, end: Date): Promise<WorkoutEntry[]> {
    const token = getToken();
    return this.http.load(
      this.getUrl(
        `/period?start=${formatDateYYYYMMDD(start)}&end=${formatDateYYYYMMDD(
          end,
        )}`,
      ),
      {
        method: 'GET',
        token,
      },
    );
  }

  public postNewWorkout(workout: WorkoutEntry): Promise<WorkoutEntry> {
    const token = getToken();
    return this.http.load(this.getUrl(''), {
      method: 'POST',
      token,
      contentType: ContentType.JSON,
      payload: JSON.stringify(workout),
    });
  }

  public editWorkoutById(workout: WorkoutEntry): Promise<WorkoutEntry> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${workout.id}`), {
      method: 'PATCH',
      token,
      contentType: ContentType.JSON,
      payload: JSON.stringify(workout),
    });
  }

  public deleteWorkoutById(id: WorkoutEntry['id']): Promise<boolean> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
      token,
    });
  }

  public getUserStats(id: string | undefined): Promise<UserStatistics> {
    const token = getToken();
    let path = `/stats`;
    if (id && id !== 'default') path += `?userId=${id}`;
    return this.http.load(this.getUrl(path), {
      method: 'GET',
      token,
    });
  }

  public getLeaderboard(): Promise<Leaderboard> {
    const token = getToken();
    return this.http.load(this.getUrl('/stats/leaderboard'), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Workouts };
export type { Constructor as AuthConstructor };
