import React, { Component } from 'react';
import './css/navbar.css';



class NavBar extends Component {

  componentDidMount(){
    let toggler = document.getElementsByClassName("navbar-toggler")[0];
    toggler.classList.add("no-toggler");

    window.onscroll = function() {
      let pos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      let nav = document.getElementsByClassName("main-nav");
      if (pos < 80) {
          nav[0].style.backgroundColor = 'rgba(0,0,0,0)';
          toggler.classList.add("no-toggler");
          if(document.getElementsByClassName("navbar-collapse")[0].classList.contains("show")){
            toggler.click();
          }
      }else{
          nav[0].style.backgroundColor = '#140605';
          toggler.classList.remove("no-toggler");
      }
    }
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
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;
