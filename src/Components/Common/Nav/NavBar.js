import React, { Component } from 'react';
import './css/navbar.css';



class NavBar extends Component {

  componentDidMount(){

  }

  render(){
    return(
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top main-nav">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#topNav" aria-controls="topNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="/">Lucas Marcelli</a>
        <div className="collapse navbar-collapse" id="topNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/blog">Blog</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;
