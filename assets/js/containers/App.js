import { connect } from 'react-redux';
import { getFeedsLists,subFeeds,fetchFeed,changeUrl,rightClickFeed,cancelSubFeed } from '../actions/user';
import UserBox from '../components/index';

// Which part of the Redux global state does our component want to receive as props?
// 给子组件的props对象定义数据
function mapStateToProps(state) {
    console.log('connet state', state)
    return {
        url: state.feeds.url,
        items: state.feeds.items || [],
        isFetching: state.feeds.isFetching,
        error: state.feeds.error,
        feedsList: state.feeds.feedsList || [],
        flag: state.feeds.flag || 0,
        menuX: state.feeds.menuX || 0,
        menuY: state.feeds.menuY || 0,
        displayMenu: state.feeds.displayMenu || false,
        currentFeedUrl: state.feeds.currentFeedUrl || null
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch, ownProps) {
    return {
        handlerSubmit: (url) => dispatch(subFeeds(url)),
        handlerChange: (url) => dispatch(changeUrl(url)),
        handlerClick: (url) => dispatch(fetchFeed(url)),
        initFeedsList: () => dispatch(getFeedsLists()),
        handlerRightClick: (url, e) => dispatch(rightClickFeed(url, e)),
        cancelSubFeed: (url) => dispatch(cancelSubFeed(url))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserBox);