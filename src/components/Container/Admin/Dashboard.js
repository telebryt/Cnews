import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
function Dashboard(props) {
   Dashboard.prototype = {
    Auth: PropTypes.object.isRequired,
  };
  const [Data, setData] = useState({ post: [] })
    const { user,token } = props.Auth;
  const author = user.username;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

   // If token, add to headers config
   if (token) {
     config.headers["Authorization"] = `Token ${token}`;
   }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MY_BASEURL}/api/publisher/`,config)
      .then((res) => {
        setData({ post: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [null])
  console.log(Data.post)
  const data = Data.post;

    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Dashboard </h4>
            <h3 className="text-primary text-capitalize">
              {" "}
              Hello {author} you have {data.length} number of posts And you can
              Edit but for delete contact Admin
            </h3>

            <div className="table-responsive">
               {data.length === 0 ? (
                    <h3>
                      You Have No Post Yet{" "}
                      <Link to="/createPost">Create One Now!</Link>
                    </h3>
                  ) : (
                   <h3 className="mt-2">Thanks For All Your Post!! You Can Still Do More</h3>
                  )}
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>post Title</th>
                    <th>Status</th>
                    <th>Categoty</th>
                    <th>Excerpt</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                 
                   {data.map((post) => (
                      <tr key={post.id}>
                        <td>{post.title} </td>
                        <td>{post.status}</td>
                        <td>{post.category}</td>
                        <td>{post.excerpt.substr(0,50)}....</td>
                        <td>
                          <Link to={"/update/" + post.id}>Edit post</Link>{" "}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}
const mapStateToProps = (state) => ({
  Auth: state.Auth,

});
export default connect(mapStateToProps)(Dashboard);
