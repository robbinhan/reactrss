import axios from 'axios';
import localforage from 'localforage';
import _ from 'lodash'

const subFeedsListStorageKey = 'robbinhan_feeds_lists'
const lastestEntryStorageKey = 'robbinhan_feeds_last_entry'
const requestAPI = "http://reactrss.robbinhan.aws-jp-1.goodrain.net"

/*
 * action types
 */
export function showGistsRequest(url) {
    return {
        type: 'SHOW_GISTS_REQUEST',
        url
    }
}

export function showGistsSuccess(url, json, flag) {
    return {
        type: 'SHOW_GISTS_SUCCESS',
        url,
        json,
        flag
    }
}

export function showGistsFail(url, json) {
    return {
        type: 'SHOW_GISTS_FAIL',
        url,
        error: json.statusText
    }
}

export function changeUrl(url) {
    return {
        type: 'CHANGE_URL',
        url
    }
}

export function rightClickFeed(url, e) {
    return {
        type: 'RIGHT_CLICK_FEED',
        url,
        e
    }
}


export function subFeedsUrlSucces(feedsList) {
    return {
        type: 'SUB_FEEDS_URL_SUCCESS',
        feedsList
    }
}


export function cancelFeedsUrlSucces(feedsList, evens) {
    return {
        type: 'CANCEL_FEEDS_URL_SUCCESS',
        feedsList,
        evens
    }
}


export function cancelSubFeed(url) {

    return function (dispatch) {

        localforage.getItem(subFeedsListStorageKey).then((listString, err) => {
            var list = [];
            if (listString) {
                list = JSON.parse(listString);
            }
            //删除取消订阅的URL
            let evens = _.remove(list, function (feed) {
                return feed.feedUrl == url;
            });

            localforage.setItem(subFeedsListStorageKey, JSON.stringify(list));

            console.log("remove feed", evens, list);

            dispatch(cancelFeedsUrlSucces(list, evens))
        });
    };
}


// 来看一下我们写的第一个 thunk action creator！
// 虽然内部操作不同，你可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'));

export function fetchFeed(url) {

    return function (dispatch) {

        dispatch(showGistsRequest(url));

        axios.get(requestAPI+'/feed?url=' + url).then((rep) => {
            console.log(rep.data);
            let feeds = rep.data.responseData.feed.entries;
            console.log(feeds)

            localforage.getItem(lastestEntryStorageKey).then((urls, err) => {
                console.log(urls, err)
                let flag = 0;
                if (urls) {
                    //       urls = JSON.parse(urls)
                    //       oldHash = urls.url
                    //       for (va [index, feed] of feeds) {
                    //             let hash = md5(feed.title)
                    //             if (oldHash === hash) {
                    //                   flag = index;
                    //                   urls.url = hash;
                    //                   break;
                    //             }
                    //       }

                    //       feeds.map((feed,index) => {

                    //       })
                } else {
                    let hash = md5(feeds[0].title)
                    console.log('hash', hash)
                    urls = {url: hash}
                }

                // localforage.setItem(lastestEntryStorageKey,JSON.stringify(urls));

                dispatch(showGistsSuccess(url, feeds, flag))
            })
        }).catch((e) => console.error(e))
    };
}


export function subFeeds(url) {
    return function (dispatch) {
        console.log(requestAPI+'/feed?url=' + url);
        axios.get(requestAPI+'/feed?url=' + url).then((rep) => {
            console.log(rep.data);
            let feed = rep.data.responseData.feed;
            var feedObject = {title: feed.title, feedUrl: feed.feedUrl, link: feed.link, author: feed.author}
            console.log(feed)

            localforage.getItem(subFeedsListStorageKey).then((listString, err) => {
                var list = [];
                if (listString) {
                    list = JSON.parse(listString);
                }
                //判断是否已经存在URL
                let findIndex = _.findIndex(list, function (feed) {
                    return feed.feedUrl == url;
                });
                if (findIndex == -1) {
                    list.push(feedObject);
                    localforage.setItem(subFeedsListStorageKey, JSON.stringify(list));
                }

                dispatch(subFeedsUrlSucces(list))
            });
            // dispatch(showGistsSuccess(url,feed.entries))
        }).catch((e) => console.error(e))
    }
}


export function getFeedsLists() {
    return function (dispatch) {
        console.log('after call init')
        localforage.getItem(subFeedsListStorageKey).then((list, err) => {
            list = JSON.parse(list);
            console.log('json parse', list);
            dispatch(subFeedsUrlSucces(list))
        });
    }
}




