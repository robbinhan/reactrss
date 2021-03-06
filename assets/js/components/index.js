import React, { Component } from 'react';
import RssForm from './RssForm';
import RssDiv from './RssDiv';
import ReaderDiv from './ReaderDiv'
import { fetchGists } from '../actions/user';
import Menu from './Menu';

export default class UserBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('call once');
        console.log(this.props)
        return (
            <div>
                <div className="header">
                    <h1>ReactRss</h1>
                    <RssForm url={this.props.url}
                             handlerSubmit={this.props.handlerSubmit}
                             handlerChange={this.props.handlerChange}/>
                </div>
                <div className="container">
                    <RssDiv feedsList={this.props.feedsList} initFeedsList={this.props.initFeedsList}
                            handlerClick={this.props.handlerClick} url={this.props.url} flag={this.props.flag}
                            handlerRightClick={this.props.handlerRightClick}/>
                    <ReaderDiv items={this.props.items} isFetching={this.props.isFetching} error={this.props.error}/>
                </div>
                {this.props.displayMenu ?
                    <Menu x={this.props.menuX} y={this.props.menuY} cancelSubFeed={this.props.cancelSubFeed}
                          currentFeedUrl={this.props.currentFeedUrl}/> : null}
            </div>
        );
    }
}