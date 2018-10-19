import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import LogIn from './components/Login';
import Jokes from './components/Jokes';
import Register from './components/Register';
import styled from 'styled-components';

const AppDiv = styled.div`
  width: 100%;
  margin: auto;
`;

class App extends Component {
  render() {
    return (
      <AppDiv>
        <Route exact path="/" component={LogIn} />
        <Route path="/signup" component={Register} />
        <Route path="/jokes" component={Jokes} />
      </AppDiv>
    );
  }
}

export default withRouter(App);
