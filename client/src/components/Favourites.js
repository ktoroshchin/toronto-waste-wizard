import React, { Component } from 'react';
var parser = require('html-react-parser');

class Favourites extends Component {

  render () {
    const { title, body } = this.props
    return (
        <div className="row single-favourite">
          <div className="col-5"><i style={{color: "#228B22"}} className="fas fa-star icon-a"></i>{title}</div>
          <div className="col-7">{parser(body)}</div>
        </div>
    )
  }
}

export default Favourites;
