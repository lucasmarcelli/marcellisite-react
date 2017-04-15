import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Container from './Components/Common/TopLevel/Container';
import NotFound from './Components/Common/TopLevel/NotFound';
import Main from './Components/MainPage/TopLevel/Main';

class App extends Component {

  render(){
    return(
      <Router>
        <Container>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Container>
      </Router>
    )
  }
}

export default App;
