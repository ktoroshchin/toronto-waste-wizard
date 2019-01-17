import React, { Component } from 'react';
import Search from './components/search';
import Header from './components/header';

class App extends Component {
  render() {
    return (
        <div>
          <Header/>
          <Search/>
        </div>
    );
  }
}

export default App;
