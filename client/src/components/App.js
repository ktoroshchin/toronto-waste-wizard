import React, { Component } from 'react';
import Search from './Search';
import DisplayData from './DisplayData';

class App extends Component {
  render() {
    return (
      <div className="main-conatainer">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            Hello World
        </nav>
        <Search/>
      </div>
    );
  }
}

export default App;
