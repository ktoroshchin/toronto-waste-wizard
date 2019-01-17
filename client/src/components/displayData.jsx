import React, { Component } from 'react';
let parser = require('html-react-parser');
let storageArr = JSON.parse(localStorage.getItem('favourites')) || [];

class DisplayData extends Component {
  state = {
    title: this.props.title,
    body: this.props.body,
    favourite: false,
    favouriteData: [],
    exist: false,
  }

//on componentdidmount i am checking if item exist in local storage and setting state to TRUE;
  componentDidMount(){
  let localStorageItems = JSON.parse(localStorage.getItem('favourites')) || [];
    localStorageItems.forEach(obj => {
      if(obj.title.indexOf(this.state.title) !== -1){
        this.setState({
          exist: true,
          favourite: true,
        })
      }
    })
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
        exist:false,
        favouriteData: localStorage.getItem('favourites'),
      })
      this.setData(localStorage.getItem('favourites'))
  }
}
//Passing favourited data from localStorage to ParentComponent
  setData = (data) => {
    this.props.onStarClick(data)
  }

  render(){
    const { title, body } = this.props;
    if(this.state.exist){
      return(
        <div className="row">
            <div className="col-5" ><i onClick={this.toggleFavourite} style={{color: "#228B22"}} className="fas fa-star icon-a"></i>{title}</div>
            <div className="col-7">{parser(body)}</div>
        </div>
      )
    }
      return(
        <div className="row">
            <div className="col-5" >{this.state.favourite ? <i onClick={this.toggleFavourite} style={{color: "#228B22"}} className="fas fa-star icon-a"></i> : <i onClick={this.toggleFavourite} style={{color: '#888'}} className="fas fa-star icon-a"></i>}{title}</div>
            <div className="col-7">{parser(body)}</div>
        </div>
      )
    }
}

export default DisplayData;
