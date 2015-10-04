import axios from 'axios';
import localforage from 'localforage';

const subFeedsListStorageKey = 'robbinhan_feeds_lists'
/*
 * action types
 */
export function showGistsRequest (url) {
	return {
		type: 'SHOW_GISTS_REQUEST',
		url
	}
}

export function showGistsSuccess (url,json) {
	return {
		type: 'SHOW_GISTS_SUCCESS',
		url,
		json
	}
}

export function showGistsFail (url,json) {
	return {
		type: 'SHOW_GISTS_FAIL',
		url,
            error: json.statusText
	}
}

export function changeUrl (url) {
  return {
    type: 'CHANGE_URL',
    url
  }
}


export function subFeedsUrlSucces (feedsList) {
  return {
    type: 'SUB_FEEDS_URL_SUCCESS',
    feedsList
  }
}


// 来看一下我们写的第一个 thunk action creator！
// 虽然内部操作不同，你可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'));

export function fetchFeed(url) {

  return function (dispatch) {

      dispatch(showGistsRequest(url));

      axios.get('http://127.0.0.1:8000/feed?url='+url).then((rep) => {
            console.log(rep.data);
            let feed = rep.data.responseData.feed.entries;
            console.log(feed)
            dispatch(showGistsSuccess(url,feed))
      }).catch((e) => console.error(e))
  };
}


export function subFeeds(url) {
      return function (dispatch) {
            axios.get('http://127.0.0.1:8000/feed?url='+url).then((rep) => {
                  console.log(rep.data);
                  let feed = rep.data.responseData.feed;
                  var feedObject = {title:feed.title,feedUrl:feed.feedUrl,link:feed.link,author:feed.author}
                  console.log(feed)

                  localforage.getItem(subFeedsListStorageKey).then((listString,err) => {
                        var list = [];
                        if (listString) {
                              list = JSON.parse(listString);
                        }
                        list.push(feedObject);
                        localforage.setItem(subFeedsListStorageKey,JSON.stringify(list));
                        dispatch(subFeedsUrlSucces(list))
                  });
                  // dispatch(showGistsSuccess(url,feed.entries))
            }).catch((e) => console.error(e))
      }
}


export function getFeedsLists(){
      return function (dispatch) {
            console.log('after call init')
            localforage.getItem(subFeedsListStorageKey).then((list,err) => {
                  list = JSON.parse(list);
                  console.log('json parse',list);
                  dispatch(subFeedsUrlSucces(list))
            });
    }
}




