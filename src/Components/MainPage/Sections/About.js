import React, { Component } from 'react';

import './css/about.css';

import bitty from '../../../Assets/Images/MainPage/bitty.jpg';

class About extends Component {

  render(){
    return(
      <section className="about full-height" id="about">
          <div className="content">
            <div className="inner-content about-content">
              <h1 className="about-title">About</h1>
              <p className="about-text">
              My Name is Lucas Marcelli. I have a degree in Computing from Queen’s, several years of experience and a passion for development.
              </p>
              <p className="about-text">
              Coding is both my livelihood and the way I challenge myself to grow each day. I think programming is an incredibly powerful tool not only for the consumer space, but as a way to teach problem solving and analytical skills. When I was in university I co-founded and managed a not-for-profit called Code For Kids, which really showed me how fast kids pick up coding concepts.
              </p>
              <p className="about-text">
              I’m much more than just a developer or engineer. I love astronomy, cats, cooking and video games. I’m passionate about mental health and self improvement. I love to explore new ways of incorporating my skills and interests into living well. Currently I’m dabbling in adult colouring books, journaling, and network programming.
              </p>
              <p className="about-text">
              If you ever want to chat about anything at all, email me at <a href="mailto:lucas@marelli.ca">lucas@marcelli.ca</a>.
              </p>
              <div className="d-flex justify-content-center picture">
                <img className="rounded-circle" src={bitty} alt="Shes the best cat ever."/>
              </div>
            </div>
          </div>
      </section>
    )
  }
}

export default About;
