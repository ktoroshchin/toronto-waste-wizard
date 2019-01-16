import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  render() {
    return (
        <div className="">
          <nav className="nav">
              <h1 className="header">Toronto Waste Lookup</h1>
          </nav>
          <Search/>
        </div>
    );
  }
}

export default App;
