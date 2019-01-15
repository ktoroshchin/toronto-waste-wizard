import React, { Component } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';
import Favourites from './Favourites';
const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"


class Search extends Component {


  state = {
    requestData: "",
    responseData: [],
    isHidden: false,
    favouriteData: [],
  }

  onStarClick = (data) => {
    this.setState({
      favouriteData : JSON.parse(data),
     });
  }



  handleInput = (event) => {
    const target = event.target;
    const name = target.name
    console.log(target.value)

    if(target.value !== ""){
      this.setState({
        [name]: target.value,
      })
    }
  }

  handleDeleteSearch = (event) => {
    if (event.keyCode === 8) {
      this.setState({
        isHidden: true,
      })
  }
}

  searchData = (event) => {
    event.preventDefault();
    let requestData = this.state.requestData;
    var config = {
      responseType: 'json',
    };
    axios({
      method: 'get',
      url: `${url}`,
      responseType: 'json'
    })
      .then( obj => {
      let result = [];
          obj.data.forEach( req => {

            if(req.keywords.indexOf(requestData) !== -1){
              result.push(req)
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
      <div>
        <form onSubmit={this.searchData} className="form-inline my-2 my-lg-0">
          <input  onKeyDown={this.handleDeleteSearch} onChange={this.handleInput}className="form-control  mr-sm-2" type="search" name="requestData" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      <div>
        {this.state.responseData.map(({ title, body }, index) => {
          return (
            <div key={index}>
              {!this.state.isHidden ? <DisplayData onStarClick={this.onStarClick}  index={index} title={title} body={body}></DisplayData> : null}
            </div>)})}
        {this.state.favouriteData.map(({ title, body }, index) => {
          return (
            <div key={index}>
               <Favourites index={index} title={title} body={body}/>
            </div>)})}
          </div>
      </div>
    );
  }
}

export default Search;