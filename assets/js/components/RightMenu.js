import React, { Component } from 'react';

export default class RightMenu extends Component {

  render() {
    //Uncaught Error: Invariant Violation: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.
    return (
       <div  >
        <button>取消订阅</button>
        <button>取消订阅</button>
        <button>取消订阅</button>
        <button>取消订阅</button>
        <button>取消订阅</button>
        <button>取消订阅</button>
       </div>
    );
  }
}