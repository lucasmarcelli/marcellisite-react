import React, { Component } from 'react';
import Hero from '../Sections/Hero';
import About from '../Sections/About';
import Project from '../Sections/Project';

import './css/main.css';
import '../Sections/css/common.css';

class Main extends Component {

  render(){
    return(
      <div className="main">
        <Hero/>
        <About/>
        <Project/>
      </div>
    )
  }
}

export default Main;
