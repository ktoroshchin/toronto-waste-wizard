import React, { Component } from 'react';
import axios from 'axios';


class DisplayData extends Component {

  state = {
    dataRender: this.props.value,
    requestData: this.props.value2,

  }


  render(){


    const { title, body } = this.props;
    // const replace = this.props.body


    return(
      <div className="conatainer">
        <div className="row">
          <div className="col-5">{title}</div>
          <div className="col-7">{body}</div>
        </div>
      </div>

    )
  }
}

export default DisplayData;
