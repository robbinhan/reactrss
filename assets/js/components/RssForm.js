import React, { Component } from 'react';

export default class RssForm extends Component {

  render() {
    let self = this
    console.log('gistform',self.props)
    return (
      <form onSubmit={ function(e) { e.preventDefault(); self.props.handlerSubmit(self.props.url) } } >
        <input name="url" 
        value={this.props.url} 
        onChange={(e) => self.props.handlerChange(e.target.value)} />
        <button>订阅</button>
      </form>
    );
  }
}