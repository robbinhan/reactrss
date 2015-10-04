import { connect } from 'react-redux';
import { getFeedsLists,subFeeds,fetchFeed,changeUrl } from '../actions/user';
import UserBox from '../components/index';

// Which part of the Redux global state does our component want to receive as props?
// 给子组件的props对象定义数据
function mapStateToProps(state) {
  console.log('connet state',state)
  return {
    url: state.feeds.url,
    items: state.feeds.items || [],
    isFetching: state.feeds.isFetching,
    error: state.feeds.error,
    feedsList: state.feeds.feedsList
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch,ownProps) {
  return {
    handlerSubmit: (url) => dispatch(subFeeds(url)),
    handlerChange: (url) => dispatch(changeUrl(url)),
    handlerClick: (url) => dispatch(fetchFeed(url)),
    initFeedsList: () => dispatch(getFeedsLists())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox);