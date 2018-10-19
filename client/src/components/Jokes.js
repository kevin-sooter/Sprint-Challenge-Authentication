import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LogoutButton = styled.div`
  position: absolute;
  right: 30px;
  top: 15px;
`;

const JokesDiv = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const NameCard = styled.div`
  border: 1px solid gray;
  height: 200px;
  width: 300px;
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
`;

class Jokes extends Component {
  state = {
    jokes: []
  };
  componentDidMount() {
    const token = localStorage.getItem('token');
    const requestOptions = {
      headers: {
        authorization: token
      }
    };
    axios
      .get('http://localhost:3300/api/jokes', requestOptions)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.error(err);
        window.alert('You need an account to see this info');
        this.props.history.push('/');
      });
  }
  logoutHandler = e => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <LogoutButton>
          {localStorage.getItem('token') && (
            <button onClick={this.logoutHandler}>Logout</button>
          )}
        </LogoutButton>
        <JokesDiv>
          {this.state.jokes.map((joke, index) => (
            <NameCard key={index}>
              <p>type: {joke.type}</p>
              <p>setup: {joke.setup}</p>
              <p>punchline: {joke.punchline}</p>
            </NameCard>
          ))}
        </JokesDiv>
      </div>
    );
  }
}
export default Jokes;
