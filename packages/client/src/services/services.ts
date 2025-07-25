import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Exercises } from './exercises/exercise.service';
import { Workouts } from './workouts/workout.service';

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const exercises = new Exercises({
  baseUrl: ApiPath.API_URL,
  http,
});

const workouts = new Workouts({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, exercises, workouts };
