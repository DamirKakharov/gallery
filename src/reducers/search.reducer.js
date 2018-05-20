const initialState = {
    search: '',
};

export default function searchResponse(state = initialState, action) {
    switch (action.type) {
    case 'SET_SEARCH':
        return { ...state, search: action.payload };
    default:
        return state;
    }
}
