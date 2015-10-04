import React, { Component } from 'react';

export default class ReaderDiv extends Component {

    
  render() {
    let self = this
    
    let row = self.props.items.map(function (entry,index) {
       return (
            <div key={index}>
                  <h2><a href={entry.link} target="_blank">{entry.title}</a></h2>
                  <div dangerouslySetInnerHTML={{__html: entry.content}} ></div>
            </div>
      )
    })

    if (this.props.isFetching === true) {
      return (
            <div>
            <img src="./public/img/482.GIF" />
            </div>
        )
    }

    return (
       <div className="reader-div" >
        { row }
       </div>
    );
  }
}