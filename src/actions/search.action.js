import Api from '../api/api';

export const SET_SEARCH = 'SET_SEARCH';
export const CHANGE_RAGE = 'CHANGE_PAGE';

export function setSearchAction(search) {
    return {
        type: SET_SEARCH,
        payload: search,
    };
}

export function changePage(findResponse) {
    return {
        type: CHANGE_RAGE,
        payload: findResponse,
    };
}

export function loadHomePage() {
    return function (dispatch) {
        return Api.getHomePage().then((findResponse) => {
            dispatch(changePage(findResponse));
        }).catch((error) => {
            throw (error);
        });
    };
}

export function loadSearchPage(searchResp) {
    return function (dispatch) {
        return Api.getSearchPage(searchResp).then((findResponse) => {
            dispatch(changePage(findResponse.results));
        }).catch((error) => {
            throw (error);
        });
    };
}
