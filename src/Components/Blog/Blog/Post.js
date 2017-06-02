import React, { Component } from 'react';
import Constants from  '../../../Constants/Constants';
import BlogStore from '../../../Stores/BlogStore';
import BlogLayout from '../Layout/BlogLayout';
import MarkdownUtils from '../../../Utils/MarkdownUtils';

import "./css/post.css";

let md = require('markdown-it')({
  breaks: true,
  html: true
});


class Post extends Component {

  constructor(){
    super();
    this.loadPost = this.loadPost.bind(this);
    this.state = {
      loaded: false,
      title: null,
      subtitle: null,
      content: null,
      pubDate: null,
      slug: null
    }
  }

  componentDidMount(){
    MarkdownUtils.blankTargets(md);
    BlogStore.addListener(Constants.BlogConstants.POST_LOADED, this.loadPost);
    BlogStore.getPost(this.props.match.params.slug);
  }

  componentWillUnmount(){
    BlogStore.removeListener(Constants.BlogConstants.POSTS_LOADED, this.loadPost);
  }

  render(){
    return this.state.loaded ? (
      <BlogLayout>
        <div className="post-header">
          <h1 className="title">{this.state.title}</h1>
          <h3 className="subtitle">{this.state.subtitle}</h3>
          <h6 className="date">{this.state.pubDate.slice(0,10)}</h6>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{__html:md.render(this.state.content)}}/>
        <div id="disqus_thread"></div>
        {(function() { // DON'T EDIT BELOW THIS LINE
              var d = document, s = d.createElement('script');
              s.src = 'https://marcelli.disqus.com/embed.js';
              s.setAttribute('data-timestamp', +new Date());
              (d.head || d.body).appendChild(s);
              })()}
      </BlogLayout>
    ) : null;
  }

  loadPost(post){
    this.setState({...post, loaded: true});

  }
}
export default Post;
