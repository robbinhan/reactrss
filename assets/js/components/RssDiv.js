import React, { Component } from 'react';


export default class RssDiv extends Component {

    constructor(props) {
        super(props);
        this.props.initFeedsList();
    }

    render() {
        let self = this;
        let row = self.props.feedsList.map(function (feed, index) {
            let cssName = self.props.url == feed.feedUrl ? 'active' : '';
            return (
                <div key={index} className={cssName}
                     onClick={ (e) => {e.preventDefault(); self.props.handlerClick(feed.feedUrl)} }
                     onContextMenu={(e) => {e.preventDefault();self.props.handlerRightClick(feed.feedUrl,e)} }>
                    <span>{feed.title}</span>
                    <span>{self.props.flag}</span>
                </div>
            )
        })

        return (
            <div className="rss-div">
                { row }
            </div>
        );
    }
}