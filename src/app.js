import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Components/Common/TopLevel/Container';
import NotFound from './Components/Common/TopLevel/NotFound';
import Main from './Components/MainPage/TopLevel/Main';
import PostList from './Components/Blog/Blog/PostList';
import Post from './Components/Blog/Blog/Post';

class App extends Component {

  render(){
    return(
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/blog" component={PostList}/>
            <Route path="/blog/:slug" component={Post}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Container>
      </Router>
    )
  }
}

export default App;
