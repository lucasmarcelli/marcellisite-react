import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BlogStore from '../../../Stores/BlogStore';
import Constants from '../../../Constants/Constants';
import BlogLayout from '../Layout/BlogLayout';

class PostList extends Component {

  constructor(){
    super();
    this.state = {posts: []}
    this.setPostList = this.setPostList.bind(this);
    this.renderPostList = this.renderPostList.bind(this);
  }

  componentDidMount(){
    BlogStore.addListener(Constants.BlogConstants.POSTS_LOADED, this.setPostList);
    BlogStore.getPostList();
  }

  componentWillUnmount(){
    BlogStore.removeListener(Constants.BlogConstants.POSTS_LOADED, this.setPostList);
  }

  render(){
    return(
      <BlogLayout>
        {this.renderPostList()}
      </BlogLayout>
    )
  }

  renderPostList(){
    let posts = [];
    if(this.state.posts !== []){
      for (let post of this.state.posts){
        let subtitle = null;
        if(post.subtitle){
          subtitle = (<h3 className="subtitle">{post.subtitle}</h3>);
        }
        posts.push(<div className="post-div" key={post.slug}>
                     <Link to={"/blog/" + post.slug}>
                     <div className="inner-post-div">
                        <h1 className="title">{post.title}</h1>
                        {subtitle}
                        <span className="date">{post.pubDate.slice(0,10)}</span>
                      </div>
                      </Link>
                    </div>);
      }
      return posts;
    }else{
      return null;
    }
  }

  setPostList(posts){
    this.setState({posts: posts})
  }


}
export default PostList;
