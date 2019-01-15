import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router'
import Favourites from './Favourites';
let storageArr = [];


class DisplayData extends Component {

  state = {
    title: this.props.title,
    body: this.props.body,
    favourite: false,
    favouriteData: localStorage.getItem('favourites'),
  }

  setData = (data) => {
    this.props.onStarClick(data)
  }

  toggleFavourite = () => {

    if(this.state.favourite === false) {
      storageArr.push(this.state)
      localStorage.setItem('favourites', JSON.stringify(storageArr))
      this.setState({
        favourite:true,
        favouriteData: localStorage.getItem('favourites'),
      })
      this.setData(localStorage.getItem('favourites'))

  }
    if(this.state.favourite === true) {
      for(var i = 0; i < storageArr.length; i++) {
        if(storageArr[i].title === this.state.title){
          storageArr.splice(i,1)
        }
      }
      localStorage.setItem('favourites', JSON.stringify(storageArr))
      this.setState({
        favourite: false,
        favouriteData: localStorage.getItem('favourites'),
      })
      this.setData(localStorage.getItem('favourites'))
  }
}




  render(){
    const { title, body } = this.props;
    return(
      <div className="container">
        <div className="row">
          <div className="col-5" >{this.state.favourite ? <i onClick={this.toggleFavourite} style={{color: "#006400"}} className="fas fa-star icon-a"></i> : <i onClick={this.toggleFavourite} style={{color: '#888'}} className="fas fa-star icon-a"></i>}{title}</div>
          <div className="col-7">{body}</div>
        </div>
      </div>
    )
  }
}

export default DisplayData;
