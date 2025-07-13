import { ListingCreateRequestDto } from '~/common/types/types';

const DEFAULT_LISTING_CREATE_PAYLOAD: ListingCreateRequestDto = {
  name: '',
  description: '',
  category: '',
  subcategory: '',
  pricePerSession: '0',
  lengthOfSession: '0',
  images: [],
  filters: [],
  location: '',
  country: '',
  city: '',
};

export { DEFAULT_LISTING_CREATE_PAYLOAD };
