import { reducer as authReducer } from './auth/auth';
import { reducer as listingsReducer } from './listings/listings';
import { reducer as imagesReducer } from './images/images';
import { reducer as attributesReducer } from './attributes/attributes';

const rootReducer = {
  auth: authReducer,
  listings: listingsReducer,
  images: imagesReducer,
  attributes: attributesReducer,
};

export { rootReducer };
