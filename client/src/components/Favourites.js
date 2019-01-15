import React, { Component } from 'react';
import axios from 'axios';

class Favourites extends Component {

  render () {
    const { title, body } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-5" >{title}</div>
          <div className="col-7">{body}</div>
        </div>
      </div>
    )
  }
}

export default Favourites;
