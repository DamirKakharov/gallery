import { combineReducers } from 'redux';
import searchResponse from './search.reducer';


const rootReducer = combineReducers({
    searchResponse,
});

export default rootReducer;
