import React, { Component } from 'react';
import RightMenu from './RightMenu'

export default class RssDiv extends Component {

  constructor(props){
      super(props);
      this.props.initFeedsList();
      this.state = {display: false};
  }

  rightClick(e) {
    e.preventDefault(); 
    console.log("click right")
    this.state.display = true
    this.forceUpdate(); 
  }

  render() {
    let self = this
    let row = self.props.feedsList.map(function (feed,index) {
      let  cssName = self.props.url == feed.feedUrl ? 'active' : '';
      return (
            <div key={index} className={cssName}>
                  <span 
                  onClick={ (e) => {e.preventDefault(); self.props.handlerClick(feed.feedUrl)} } 
                  onContextMenu={self.rightClick} >{feed.title}</span>
                  <span>{self.props.flag}</span>
            </div>
      )
    })

    return (
       <div className="rss-div" >
        { row }
        { this.state.display ? <RightMenu /> : null }
       </div>
    );
  }
}