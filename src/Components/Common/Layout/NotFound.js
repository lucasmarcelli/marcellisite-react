import React, { Component } from 'react';
import NavBar from '../Nav/NavBar';

import './css/notFound.css';
import './css/container.css';

class NotFound extends Component {

  render(){
      return(
        <div className="container-fluid not-found">
          <NavBar/>
          <h1> Oops, that page is not real. </h1>
        </div>
      )
  }
}

export default NotFound;
