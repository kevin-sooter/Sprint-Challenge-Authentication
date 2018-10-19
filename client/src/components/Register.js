import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const RegisterOuterDiv = styled.div`
  border: 1px solid gray;
  height: 325px;
  width: 500px;
  margin: 70px auto auto;
`;

const RegisterLinkButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 35px;
  margin-bottom: 60px;

  a {
    border: 1px solid gray;
    width: 100%;
    height: 100%;
    line-height: 200%;
    text-align: center;
    color: black;
    text-decoration: none;
  }
`;

const RegisterInnerDiv = styled.div`
  width: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const RegisterFormDiv = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 30px;
    line-height: 25px;
    font-size: 12px;
    padding-left: 10px;
  }

  button {
    height: 25px;
  }
`;

class Register extends Component {
  state = {
    username: '',
    password: ''
  };

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3300/api/register', this.state)
      .then(res => {
        console.log('response', res);
        const { token } = res.data;
        localStorage.setItem('token', token);
        this.props.history.push('/jokes');
      })
      .catch(err => {
        console.error('Axios error:', err);
      });
  };

  render() {
    return (
      <RegisterOuterDiv>
        <RegisterLinkButtons>
          <Link to={`/`}>Sign In</Link>
          <Link to={`/signup`}>Become a Member</Link>
        </RegisterLinkButtons>
        <RegisterInnerDiv>
          <RegisterFormDiv onSubmit={this.submitHandler}>
            <input
              value={this.state.username}
              onChange={this.inputChangeHandler}
              type="text"
              placeholder="username"
              name="username"
            />
            <input
              value={this.state.password}
              onChange={this.inputChangeHandler}
              type="password"
              placeholder="password"
              name="password"
            />
            <button type="submit">Create Account</button>
          </RegisterFormDiv>
        </RegisterInnerDiv>
      </RegisterOuterDiv>
    );
  }
}
export default Register;
