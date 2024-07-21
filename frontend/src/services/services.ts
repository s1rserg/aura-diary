import { Http } from "./http/http.service";
import { Auth } from "./auth/auth.service";
import { ApiPath } from "../common/enums/enums";
import { Workouts } from "./workouts/workouts.service";

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const workouts = new Workouts({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, workouts };
