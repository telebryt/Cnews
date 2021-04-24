import React from "react";
import { Route} from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, posts,Auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (posts.isLoading) {
        return (
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        );
      } else if (Auth.isLoading) {
         return (
           <div className="spinner-border text-info" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
         );
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
    Auth: state.Auth,
    posts:state.posts
});

export default connect(mapStateToProps)(PrivateRoute);
