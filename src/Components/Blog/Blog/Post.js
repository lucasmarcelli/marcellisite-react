import React, { Component } from 'react';
import Constants from  '../../../Constants/Constants';
import BlogStore from '../../../Stores/BlogStore';

class Post extends Component {

  constructor(){
    super();
    this.loadPost = this.loadPost.bind(this);
  }

  componentDidMount(){
    BlogStore.addListener(Constants.BlogConstants.POST_LOADED, this.loadPost);
    BlogStore.getPost(this.props.match.params.slug);
  }

  componentWillUnmount(){
    BlogStore.removeListener(Constants.BlogConstants.POSTS_LOADED, this.loadPost);
  }

  render(){
    return null;
  }

  loadPost(post){
    console.log(post);
  }
}
export default Post;
