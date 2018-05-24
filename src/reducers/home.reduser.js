import { CHANGE_RAGE } from '../actions/search.action';

const initialState = {
    data: [],
};

export default function homePageResponse(state = initialState, action) {
    switch (action.type) {
    case CHANGE_RAGE:
        return { ...state, data: action.payload };
    default:
        return state;
    }
}
