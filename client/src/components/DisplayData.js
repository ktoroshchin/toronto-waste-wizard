import React, { Component } from 'react';
let parser = require('html-react-parser');
let storageArr = [];

class DisplayData extends Component {
  state = {
    title: this.props.title,
    body: this.props.body,
    favourite: false,
    favouriteData: localStorage.getItem('favourites'),
  }

//passing favourited data from localStorage to ParentComponent
  setData = (data) => {
    this.props.onStarClick(data)
  }

//Add and remove favourited items to/from LocalStorage onClick
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
      <div className="row">
          <div className="col-5" >{this.state.favourite ? <i onClick={this.toggleFavourite} style={{color: "#228B22"}} className="fas fa-star icon-a"></i> : <i onClick={this.toggleFavourite} style={{color: '#888'}} className="fas fa-star icon-a"></i>}{title}</div>
          <div className="col-7">{parser(body)}</div>
      </div>
    )
  }
}

export default DisplayData;
