import React, { Component } from 'react';

export default class RssDiv extends Component {

  constructor(props){
      super(props);
      console.log('rss div con props',this.props);
      this.props.initFeedsList();
  }

  render() {
    let self = this
    
    let row = self.props.feedsList.map(function (feed,index) {
       return (
            <div key={index}>
                  <span onClick={ (e) => {e.preventDefault(); self.props.handlerClick(feed.feedUrl)} } >{feed.title}</span>
            </div>
      )
    })

    return (
       <div className="rss-div" >
        { row }
       </div>
    );
  }
}