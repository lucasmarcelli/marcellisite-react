import React, { Component } from 'react';
import NavBar from '../Nav/NavBar';

import './css/container.css';

class Container extends Component {


  render(){
    return(
      <div className="container-fluid top-container">
        <NavBar/>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
