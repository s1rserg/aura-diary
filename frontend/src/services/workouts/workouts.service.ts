import { ApiPath, ContentType } from "../../common/enums/enums";
import { WorkoutEntry } from "../../common/types/data/workoutEntry.type";
import { getToken } from "../../utils/auth";
import { Http } from "../http/http.service";

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

  public getAllWorkouts(): Promise<WorkoutEntry[]> {
    const token = getToken();
    return this.http.load(this.getUrl("/"), {
      method: "GET",
      token,
    });
  }

  public getAllWorkoutsforDate(date: string): Promise<WorkoutEntry[]> {
    const token = getToken();
    return this.http.load(this.getUrl(`/date/${date}`), {
      method: "GET",
      token,
    });
  }

  public getWorkoutById(id: WorkoutEntry["id"]): Promise<WorkoutEntry> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: "GET",
      token,
    });
  }

  public postNewWorkout(workout: WorkoutEntry): Promise<WorkoutEntry> {
    const token = getToken();
    return this.http.load(this.getUrl("/"), {
      method: "POST",
      token,
      contentType: ContentType.JSON,
      payload: JSON.stringify(workout),
    });
  }

  public editWorkoutById(workout: WorkoutEntry): Promise<WorkoutEntry> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${workout.id}`), {
      method: "PATCH",
      token,
      contentType: ContentType.JSON,
      payload: JSON.stringify(workout),
    });
  }

  public deleteWorkoutById(id: WorkoutEntry["id"]): Promise<boolean> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: "DELETE",
      token,
    });
  }

  private getUrl(path = ""): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Workouts };
export type { Constructor as AuthConstructor };
