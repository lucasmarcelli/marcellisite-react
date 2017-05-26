import Config from "../Config/config";
import Constants from "../Constants/Constants";
const EventEmitter = require('events');

const BlogConstants = {
  POSTS_LOADED: "POSTS_LOADED",
  POST_LOADED: "POST_LOADED"
};

class BlogStoreClass extends EventEmitter {

  constructor(){
    super();
    this.postList = null;
  }

  getPost(slug){
    let self = this;
    fetch(Config.api.base + "/blog/posts/" + slug, Constants.RESTConstants.GET)
      .then(function(response){
        if(response.ok){
          return(response.json())
        }
      })
      .then(function(post){
        self.emit(BlogConstants.POST_LOADED, post);
      })
  }

  getPostList(refresh){
    if(!refresh && this.postList){
      this.emit(BlogConstants.POSTS_LOADED, this.postList);
    }else{
      let self = this;
      fetch(Config.api.base + "/blog/posts", Constants.RESTConstants.GET)
        .then(function(response){
          if(response.ok){
            return(response.json())
          }
        })
        .then(function(posts){
          self.setPostList(posts);
        });
    }
  }

  setPostList(posts){
    this.postList = posts;
    this.emit(BlogConstants.POSTS_LOADED, posts);
  }
}

let BlogStore = new BlogStoreClass();

 export default BlogStore;
