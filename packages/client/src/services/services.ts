import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Listings } from './listings/listing.service';
import { Exercises } from './exercises/exercise.service';

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const listings = new Listings({
  baseUrl: ApiPath.API_URL,
  http,
});

const exercises = new Exercises({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, listings, exercises };
