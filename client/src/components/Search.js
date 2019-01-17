import React, { Component } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';
import Favourites from './Favourites';
let decode = require('decode-html');
const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"

class Search extends Component {
  state = {
    requestData: "",
    responseData: [],
    isHidden: false,
    favouriteData: [],
  }


  componentDidMount(){
    let localStorageItems = JSON.parse(localStorage.getItem('favourites')) || [];
    this.setState({
      favouriteData: localStorageItems,
    })
  return true;
  }


//adding favourited data to state array and passing to child component later below
  onStarClick = (data) => {
    this.setState({
      favouriteData : JSON.parse(data),
     });
  }

//search "input" parameters
  handleInput = (event) => {
    const target = event.target;
    const name = target.name

    if(target.value !== ""){
      this.setState({
        [name]: target.value,
      })
    }
  }

//hidding search results on DELETE press
  handleDeleteSearch = (event) => {
    if (event.keyCode === 8) {
      this.setState({
        isHidden: true,
      })
    }
  }


//API call and decoding req.body
  searchData = (event) => {
    event.preventDefault();
    let requestData = this.state.requestData;
    axios({
      method: 'get',
      url: `${url}`,
      responseType: 'json'
    })
      .then( obj => {
      let result = [];
      obj.data.forEach( req => {
        if(req.keywords.indexOf(requestData) !== -1){
          let objBody = decode(req.body)
            let newObj = {
              title: req.title,
              body: objBody,
            }
            result.push(newObj)
          }
        })
        this.setState({
          responseData: result,
          isHidden: false,
        })
      })
      .catch(error => console.log(error))
  }


  render () {
    return (
      <div className="main-container">
        <div className="row search-bar">
          <form onSubmit={this.searchData} className="form">
            <input  onKeyDown={this.handleDeleteSearch} onChange={this.handleInput} className="form-control input" type="search" name="requestData" aria-label="Search"/>
            <button className="search-button" type="submit"><i class="fab fa-sistrix fa-2x" data-fa-transform="rotate-180"></i></button>
          </form>
        </div>
        <div className="search-results-row">
          {this.state.responseData.map(({ title, body }, index) => {
            return (
              <div key={index}>
                {!this.state.isHidden ? <DisplayData searchLocalStorage={this.searchLocalStorage} onStarClick={this.onStarClick}  index={index} title={title} body={body}></DisplayData> : null}
              </div>)})}
        </div>
        <div className="favourites-background-settings">
            <div className="favourites-row-container">
              <div id="title">Favourites</div>
                {this.state.favouriteData.map(({ title, body }, index) => {
                  return (
                    <div key={index}>
                       <Favourites index={index} title={title} body={body}/>
                    </div>)})}
            </div>
        </div>
       </div>
    );
  }
}

export default Search;