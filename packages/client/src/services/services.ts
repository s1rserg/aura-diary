import { Http } from './http/http.service';
import { Auth } from './auth/auth.service';
import { ApiPath } from '~/common/enums/enums';
import { Listings } from './listings/listing.service';
import { Images } from './images/images.service';
import { Attributes } from './attributes/attribute.service';

const http = new Http();

const auth = new Auth({
  baseUrl: ApiPath.API_URL,
  http,
});

const listings = new Listings({
  baseUrl: ApiPath.API_URL,
  http,
});

const images = new Images({
  baseUrl: ApiPath.API_URL,
  http,
});

const attributes = new Attributes({
  baseUrl: ApiPath.API_URL,
  http,
});

export { http, auth, listings, images, attributes };
