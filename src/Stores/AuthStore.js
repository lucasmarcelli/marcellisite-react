import Config from "../Config/config"
import Constants from "../Constants/Constants";
const EventEmitter = require('events');

let _currentUser = null;
let _id_token = null;

function _setUser(user){
  _currentUser = user;
}

function _setToken(id_token){
  _id_token = id_token;
}

class AuthStore extends EventEmitter {

  constructor() {
    super();
  }

  authenticate(id_token){
    let self = this;
    _setToken(id_token);
    let headers = new Headers();
    headers.append("id_token", id_token);
    let init = {...Constants.RESTConstants.POST}
    init.headers = headers;
    console.log(id_token);
    fetch(Config.api.base + '/auth/user', init)
      .then(function(response){
        if(response.ok){
          return response.json()
        }
      })
      .then(function(user){
        self.setUser(user);
      })
  }

  setUser(user){
    _setUser(user);
    this.emit(Constants.AuthConstants.USER_LOADED, user);
  }

  getUser(id_token, refresh){
    if(_currentUser && !refresh){
      this.emit(Constants.AuthConstants.USER_LOADED, _currentUser);
    }else{
      this.authenticate(id_token);
    }
  }

  getToken(){
    return _id_token;
  }

}

export default new AuthStore();
