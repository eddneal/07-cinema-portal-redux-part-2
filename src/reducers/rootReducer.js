import {combineReducers} from 'redux';
import login from './login';
import movies from './movies';

const rootReducer = combineReducers({
  login,
  movies
});

export default rootReducer;
