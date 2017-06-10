import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthStore from '../../../Stores/AuthStore';
import Constants from '../../../Constants/Constants';

import './css/navbar.css';



class NavBar extends Component {

  constructor(){
    super();
    this.state = {
      admin: undefined
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount(){
    AuthStore.addListener(Constants.AuthConstants.USER_LOADED, this.handleUser);
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
            <li className="nav-item">
              <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link to="/blog" className="nav-link">Blog</Link>
            </li>
            {this.state.admin ? (<li className="nav-item">
                      <Link to="/admin" className="nav-link">Admin</Link>
                    </li>) : null}
          </ul>
        </div>
      </nav>
    )
  }

  handleUser(user){
    if(user.admin){
      this.setState({admin: true})
    }
  }
}

export default NavBar;
