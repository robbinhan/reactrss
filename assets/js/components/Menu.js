import React, { Component } from 'react';

export default class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="right-menu" style={{left: this.props.x + 'px',top:this.props.y + 'px'}}>
                <span
                    onClick={ (e) => {e.preventDefault(); this.props.cancelSubFeed(this.props.currentFeedUrl)} }
                    >取消订阅</span>
            </div>
        );
    }
}