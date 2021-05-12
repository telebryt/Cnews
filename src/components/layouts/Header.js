import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/Auth";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import logo from './logo.JPG';
import axios from 'axios';
import { Profiles } from "../../Actions/Auth";

const Header = (props) => {
  Header.prototype = {
    Auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };

  // const [profileData, setprofileData] = useState({ profiles: [] });
  const { isAuthenticated, user, profiles } = props.Auth;

  // console.log(profileData, profile)
 console.log(profiles)
let history = useHistory();
const [data, setData] = useState({ search: "" });
  const goSearch = (e) => {
    if (data.search !== "") {
      history.push({
        pathname: "/search/",
        search: "?search=" + data.search,
      });
      window.location.reload();
    }
    else {
      toast.error("You cannot Search Empty Field");
    }
  };
  let isStaff =false
  let profiledata = []
  if (profiles != null) {
    profiledata = profiles.data.image
    isStaff = profiles.data.prouser.is_staff
  } else {
    profiledata = []
  }
  console.log(profiledata,isStaff)
  const date = new Date();
  const hour = date.getHours();
  const AuthLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item pr-2">
        <h4 className="text-capitalize ">
          {" "}
          <Link to="/profile">
            {" "}
            <img
              src={`${process.env.REACT_APP_MY_BASEURL}` + profiledata}
              alt="Campus New"
              className="avatar rounded-circle"
            />{" "}
            {user ? `${user.username}` : ""}{" "}
          </Link>
        </h4>
      </li>
      <li className="nav-item">
        <span className="nav-link">
          <Link to="/">Home</Link>
        </span>
      </li>
      {isStaff ? (
        <>
        <li className="nav-item">
          <span className="nav-link">
            {" "}
            <Link to="/createPost">Create Post</Link>
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link">
            {" "}
            <Link to="/dashboard">Dashboard</Link>
          </span>
          </li>
        </>
      ) : (
        ""
      )}
      {"  "}
      <li className="nav-item">
        <span className="nav-link">
          <Link className="text-danger" to="/" onClick={props.logout}>
            Logout
          </Link>
        </span>
      </li>
      <li className="nav-item">
        <strong>
          <form
            className="form-inline my-2 my-md-0 float-right"
            onSubmit={goSearch}
          >
            <div className="input-group">
              <input
                className="form-control mr-sm-1 rounded-left"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="search"
                required
                onChange={(newValue) => setData({ search: newValue })}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  className="btn btn-outline-info rounded-right"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </strong>
      </li>
    </ul>
  );

  const GuestLnks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <span className="nav-link">
          <Link to="/">Home</Link>
        </span>
      </li>
      <li className="nav-item">
        <span className="nav-link">
          {" "}
          <Link to="/register">Register</Link>
        </span>
      </li>
      <li className="nav-item">
        <span className="nav-link">
          {" "}
          <Link to="/login">Login</Link>
        </span>
      </li>
    </ul>
  );

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Campus New" className="image" />
            <span className="name">Campus News</span>
          </Link>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <em className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            {isAuthenticated ? AuthLinks : GuestLnks}
          </div>
        </div>
      </nav>
      <header className="masthead">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                <h1>Campus News</h1>
                <span className="subheading">
                  Explore Your Campus Always With A smile 😊 😌{" "}
                </span>
                
                <div className="text-white font-weight-bold h5 mt-4">
                  <span>
                    <div>
                      {hour < 12
                        ? "Good Morning"
                        : hour > 11 && hour < 17
                        ? "Good afternoon "
                        : "Good evening"}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
  logout: state.Auth,
});
export default connect(mapStateToProps, { logout,Profiles })(Header);




