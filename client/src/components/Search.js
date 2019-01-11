import React, { Component } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData';
const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"


class Search extends Component {


  state = {
    requestData: "",
    responseData: [],
  }


  handleInput = (event) => {
    const target = event.target;
    const name = target.name

    if(target.value.trim() === ""){
      this.setState({
        [name]: null
      })
    }
    this.setState({
      [name]: target.value,
    })
  }

  searchData = (event) => {
    event.preventDefault();
    let requestData = this.state.requestData;
    var config = {
      responseType: 'json'
    };
    axios.get(`${url}`,
      config)
      .then( obj => {
      let result = [];
          obj.data.forEach( req => {

            if(req.keywords.indexOf(requestData) !== -1){
              result.push(req)
            }
          })
          this.setState({
            responseData: result,
          })
        })
        .catch(error => console.log(error));
      }


  render () {

    return (
      <div>
        <form onSubmit={this.searchData} className="form-inline my-2 my-lg-0">
          <input onChange={this.handleInput}className="form-control  mr-sm-2" type="search" name="requestData" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>

        {this.state.responseData.map(({ title, body }, index) => {
          return (
            <div key={index}>
              <DisplayData title={title} body={body}></DisplayData>
            </div>
          )})}
      </div>
    );

  }
}





export default Search;