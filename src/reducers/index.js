import { combineReducers } from 'redux';
import searchResponse from './search.reducer';
import homePageResponse from './home.reduser';

const rootReducer = combineReducers({
    searchResponse,
    homePageResponse,
});

export default rootReducer;
