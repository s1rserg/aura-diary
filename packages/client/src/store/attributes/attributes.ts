import {
  getAllCategories,
  getAllFilters,
  getAllSubcategories,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  getAllCategories,
  getAllSubcategories,
  getAllFilters,
};

export { allActions as actions, reducer };
