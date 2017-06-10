import Config from "../Config/config";
import Constants from "../Constants/Constants";
const EventEmitter = require('events');

class BlogStore extends EventEmitter {

  constructor(){
    super();
    this.postList = null;
    this.lastPost = null;
  }

  getPost(slug, refresh){
    if(!!this.lastPost && slug === this.lastPost.slug && !refresh){
      this.emit(Constants.BlogConstants.POST_LOADED, this.lastPost);
    }else{
      let self = this;
      let request = new Request(Config.api.base + "/blog/posts/" + slug, Constants.RESTConstants.GET);
      fetch(request)
        .then(function(response){
          if(response.ok){
            return(response.json())
          }
        })
        .then(function(post){
          self.setPost(post);
        })
    }
  }

  setPost(post){
    this.lastPost = post;
    this.emit(Constants.BlogConstants.POST_LOADED, post);
  }

  getPostList(refresh){
    if(!refresh && this.postList){
      this.emit(Constants.BlogConstants.POSTS_LOADED, this.postList);
    }else{
      let self = this;
      let request = new Request(Config.api.base + "/blog/posts", Constants.RESTConstants.GET);
      fetch(request)
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
    this.emit(Constants.BlogConstants.POSTS_LOADED, posts);

    // Preload the first post as well, since it's the most likely to be clicked.

    let self = this;
    let request = new Request(Config.api.base + "/blog/posts/" + posts[0].slug, Constants.RESTConstants.GET);
    fetch(request)
      .then(function(response){
        if(response.ok){
          return(response.json())
        }
      })
      .then(function(post){
        self.setPost(post);
      })
  }
}

export default new BlogStore();
