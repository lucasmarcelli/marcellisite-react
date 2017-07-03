import Config from "../Config/config"
import Constants from "../Constants/Constants";
import Cookies from 'universal-cookie';

const EventEmitter = require('events');

const cookies = new Cookies();

class AuthStore extends EventEmitter {

  constructor() {
    super();
    this._currentUser = null;
    this._id_token = null;
  }

  authenticate(id_token){
    this._id_token = id_token;
    console.log(id_token);
    let headers = new Headers();
    headers.append("token", id_token);
    let init = {...Constants.RESTConstants.POST}
    init.headers = headers;
    let cookieUser = (cookies.get("user") !== "undefined" ? cookies.get("user") : false);
    if(cookieUser && cookieUser.google_id){
      init.headers.append("google_id", cookieUser.google_id);
      fetch(Config.api.base + '/auth/verifycookie', init)
        .then(function(response){
          if(response.ok){
            return cookieUser;
          }else{
            cookies.remove("user");
          }
        }).then((cookieUser) => this.setUser(cookieUser));
    }

    if(!cookies.get("user") || cookies.get("user") === "undefined"){
      fetch(Config.api.base + '/auth/user', init)
        .then(function(response){
          if(response.ok){

            return response.json();
          }
        })
        .then((user) => this.setUser(user));
    }
  }

  setUser(user){
    cookies.set("user", user, {path: "/", maxAge: 86400});
    this._currentUser = user;
    this.emit(Constants.AuthConstants.USER_LOADED, user);
  }

  getUser(id_token, google_id, refresh){
    if(this._currentUser && (id_token === this._id_token || this._currentUser.google_id === google_id) && !refresh){
      this.emit(Constants.AuthConstants.USER_LOADED, this._currentUser);
    }else{
      this.authenticate(id_token);
    }
  }

  getToken(){
    return this._id_token;
  }

  logout(){
    this._currentUser = null;
    this._id_token = null;
    this.emit(Constants.AuthConstants.USER_LOGGED_OUT);
  }

}

export default new AuthStore();
