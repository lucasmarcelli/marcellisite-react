import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import AuthStore from '../../../Stores/AuthStore';
import Constants from '../../../Constants/Constants';


import '../Layout/css/dashboard.css';

class Dashboard extends Component {

    constructor(){
      super();
      this.state = {
        authenticated: false,
        authorized: false
      }
      this.onSignIn = this.onSignIn.bind(this);
      this.handleUser = this.handleUser.bind(this);
      this.authorize = this.authorize.bind(this);
    }

    componentDidMount(){
      AuthStore.addListener(Constants.AuthConstants.USER_LOADED, this.handleUser);
      let token = AuthStore.getToken();
      if(token !== null){
          AuthStore.getUser(token);
      }
    }

    onSignIn(googleUser){
      // All the auth logic will move in the next update to a folder in common
      if(googleUser.error){
        // I dunno, I don't really care right now either.
      }else{
        AuthStore.getUser(googleUser.tokenId);
      }
    }

    render(){
      let dashboard = null;
      if(!this.state.authenticated){
        dashboard = <GoogleLogin
              className="google-button"
              clientId="702656611928-etumg78clanb2f80ahuv5am7lumm0f3m.apps.googleusercontent.com"
              onSuccess={this.onSignIn}
              onFailure={this.onSignIn}
            />
      }else if(this.state.authenticated && !this.state.authorized){
        dashboard = <h1> You aint allowed here kiddo. </h1>
      }else if(this.state.authenticated && this.state.authorized){
        dashboard = <h1> Authed </h1>
      }else{
        dashboard = <h1> Stop fucking with the state... </h1>
      }
      return (

        <div className="wrapper">
          {dashboard}
        </div>
      )
    }

    handleUser(user){
      if(user){
        this.setState({authenticated: true}, this.authorize(user));
      }
    }

    authorize(user){
      if(user.admin){
        this.setState({authorized: true});
      }
    }
}

export default Dashboard;
