import { KEY, PAGE, PATH, PATH_SEARCH, PER_PAGE, QUERY } from '../constants/api';

class Api {
    static getHomePage() {
        return fetch(`${PATH}${KEY}${PAGE}1${PER_PAGE}20`)
            .then((Response) => {
                return Response.json();
            }).catch((error) => {
                return error;
            });
    }
    static getSearchPage(searchResp) {
        return fetch(`${PATH_SEARCH}${KEY}${PAGE}1${QUERY}${searchResp}${PER_PAGE}20`)
            .then((Response) => {
                return Response.json();
            }).catch((error) => {
                return error;
            });
    }
}

export default Api;
