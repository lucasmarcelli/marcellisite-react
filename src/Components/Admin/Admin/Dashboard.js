/* global gapi */
import React, { Component } from 'react';
import AuthStore from '../../../Stores/AuthStore';
import Constants from '../../../Constants/Constants';


import '../Layout/css/dashboard.css';

class Dashboard extends Component {

    constructor(){
      super();
      this.mounted = false;
      this.state = {
        authenticated: false,
        authorized: false,
        validGoogle: false
      }
      this.onSignIn = this.onSignIn.bind(this);
      this.handleUser = this.handleUser.bind(this);
      this.logout = this.logout.bind(this);
      this.renderSignin = this.renderSignin.bind(this);
      this.authorize = this.authorize.bind(this);
    }

    componentDidMount(){
      this.mounted = true;
      AuthStore.addListener(Constants.AuthConstants.USER_LOADED, this.handleUser);
      this.renderSignin();
    }


    componentWillUnmount(){
      this.mounted = false;
    }

    renderSignin(timeout){
      let self = this;
      setTimeout(function(){
        gapi.signin2.render('googlebutton', {
          'scope': 'profile',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': self.onSignIn,
          'onfailure': null
        });
      }, (timeout ? 500 : 0));

    }

    onSignIn(googleUser){
      // All the auth logic will move in the next update to a folder in common
      if(googleUser.error){
        // I dunno, I don't really care right now either.
      }else{
        this.setState({validGoogle: true})
        AuthStore.getUser(googleUser.getAuthResponse().id_token, googleUser.getBasicProfile().getId());
      }
    }

    logout(){
      gapi.auth2.getAuthInstance().signOut();
      AuthStore.logout();
      this.setState({authenticated: false, authorized: false, validGoogle: false}, () => this.renderSignin(true));
    }

    render(){
      let dashboard = null;
      if(!this.state.authenticated && !this.state.authorized && !this.state.validGoogle){
        dashboard = <div className="btn-container" id="googlebutton"> </div>
      }else if(this.state.authenticated && !this.state.authorized){
        dashboard = <h1> You aint allowed here kiddo. </h1>
      }else if(this.state.authenticated && this.state.authorized){
        dashboard = <h1 onClick={this.logout}> Authed </h1>
      }else if(this.state.validGoogle && !this.state.authenticated){
        dashboard = (
          <div onClick={this.logout}>
            <h1> You dont even go here </h1>
          </div>)
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
      if(user && this.mounted){
          this.setState({authenticated: true}, () => this.authorize(user.admin));
        }
      }

    authorize(admin){
      if(admin){
        this.setState({authorized: true});
      }
    }
}

export default Dashboard;
