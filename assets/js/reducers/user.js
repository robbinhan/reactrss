import { combineReducers } from 'redux';
/**
 * reducer中写每个action的业务逻辑
 * @param  {[type]} state  [description]
 * @param  {[type]} action [description]
 * @return {[type]}        [description]
 */
function gets(state = {
    isFetching: false,
    items: []
}, action = {}) {
    switch (action.type) {
        case 'SHOW_GISTS_REQUEST':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'SHOW_GISTS_SUCCESS':
            return Object.assign({}, state, {
                isFetching: false,
                items: action.json,
                url: action.url,
                flag: action.flag,
                displayMenu: false
            });
        case 'SHOW_GISTS_FAIL':
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state;
    }
}


function getFeeds(state = {url: '', items: [], isFetching: false, error: null, feedsList: []}, action = {}) {
    switch (action.type) {
        case 'SHOW_GISTS_REQUEST':
        case 'SHOW_GISTS_SUCCESS':
        case 'SHOW_GISTS_FAIL':
            return Object.assign({}, state, gets(state[action.url], action));
        case 'CHANGE_URL':
            return Object.assign({}, state, {
                url: action.url
            });
        case 'CANCEL_FEEDS_URL_SUCCESS' :
            console.log('CANCEL_FEEDS_URL_SUCCESS');
            return Object.assign({}, state, {
                feedsList: action.feedsList,
                cancelFeed: action.evens,
                displayMenu: false
            });
        case 'SUB_FEEDS_URL_SUCCESS':
            return Object.assign({}, state, {
                feedsList: action.feedsList
            });
        case 'RIGHT_CLICK_FEED':
            return Object.assign({}, state, {
                menuX: action.e.clientX,
                menuY: action.e.clientY,
                displayMenu: true,
                currentFeedUrl: action.url
            });
        default:
            return state;
    }
}


const feedReducer = combineReducers({
    feeds: getFeeds
});

export default feedReducer;