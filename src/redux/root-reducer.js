import { combineReducers } from 'redux';
import { reducer as movie } from './MovieRedux';

const reducers = combineReducers({
  movie,
});

export default reducers;
