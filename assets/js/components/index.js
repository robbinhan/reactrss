import React, { Component } from 'react';
import RssForm from './RssForm';
import RssDiv from './RssDiv';
import ReaderDiv from './ReaderDiv'
import { fetchGists } from '../actions/user';

export default class UserBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('call once');
    console.log(this.props)
    return (
      <div>
            <h1>ReactRss</h1>
            <RssForm url={this.props.url} 
                handlerSubmit={this.props.handlerSubmit}   
                handlerChange={this.props.handlerChange} />
            <RssDiv feedsList={this.props.feedsList} initFeedsList={this.props.initFeedsList} handlerClick={this.props.handlerClick} />
            <ReaderDiv items={this.props.items} isFetching={this.props.isFetching} error={this.props.error}/>
      </div>
    );
  }
}