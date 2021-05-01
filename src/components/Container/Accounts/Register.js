import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Registers }  from '../../../Actions/Auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createMessage } from "../../../Actions/messages";


class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };
  static propTypes = {
    Registers: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };
  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });
  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
     toast.error("Password do not match")
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      this.props.Registers(newUser);
    }
  };
 
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="container col-md-6">
        <div className="container text-primary">
          <h1 className=" display-4 text-center heading"> Register</h1> <hr />
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="htmlForm-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <small>please your email is very important because you need it to reset your password</small>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                value={email}
                onChange={this.onChange}
                required
                autoFocus
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputuser9">Username</label>
              <input
                type="type"
                className="form-control"
                id="inputuser9"
                name="username"
                value={username}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-group form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword7">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword7"
                name="password"
                value={password}
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                name="password2"
                value={password2}
                onChange={this.onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                keep me login
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
          <Link to="/login">Already Have Account?</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
  });
export default connect(mapStateToProps,{Registers,createMessage})(Register);