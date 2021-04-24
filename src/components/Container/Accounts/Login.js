import React, { Component } from 'react'
import { login } from '../../../Actions/Auth'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import {createMessage} from '../../../Actions/messages';
class Login extends Component {
  state = {
    username:'',
    password:'',
  };
  static propTypes ={
    login: PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,

  };

   onChange = (e) =>this.setState({[e.target.name]:e.target.value})
   onSubmit = (e) =>{

     e.preventDefault();
     this.props.login(this.state.username, this.state.password);
    
    };
  
     
   
  render() {
      if (this.props.isAuthenticated) {
        return <Redirect to = "/" />
      }
      const { username, password } = this.state
     
        return (
          <div className="container col-md-6">
            <div className="container text-primary">
              <h1 className=" display-4 text-center heading"> Login</h1> <hr />
            </div>
            <form onSubmit={this.onSubmit} className="px-4 py-3">
              <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail1">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="Doe"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="dropdownCheck"
                  />
                  <label className="form-check-label" htmlFor="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-rounded"
                >
                  Login
                </button>
              
              
            </form>
            <div className="dropdown-divider"></div>
            <Link to="/register">New around here? Sign up</Link> <br />
            <Link to="/register"> Forgot Password?</Link>
          </div>
        );
    }
}
const mapPropsToState =(state)=>({
  isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapPropsToState,{login,createMessage})(Login);