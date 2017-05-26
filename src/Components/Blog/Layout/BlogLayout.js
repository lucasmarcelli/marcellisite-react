import React, { Component } from 'react';

import './css/blogLayout.css';

class BlogLayout extends Component {

  render(){
    return (
      <div className="blog-outer-div">
        <div className="blog-inner-div">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BlogLayout;
