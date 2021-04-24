import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../../Actions/Auth";
import { createMessage } from "../../../Actions/messages";
import Avatar from "react-avatar";
const DetailedPage = (props) => {
  const history = useHistory();
  DetailedPage.prototype = {
    Auth: PropTypes.object.isRequired,
  };
  props.history.listen((location, action) => {
    window.scrollTo(0, 0);
  });
  const { id } = useParams();
  const { user, token, profiles } = props.Auth;
  const [data, setData] = useState({
    posts: [],
  });
  const [comments, setcomment] = useState({
    coms: [],
  });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = props.Auth;

  const [lform, setlform] = useState({ username: "", password: "" });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MY_BASEURL}/api/detail/` + id)
      .then((res) => {
        setData({
          posts: res.data,
        });
        setLoading(true);
        console.log(res.data);
      });

    axios
      .get(`${process.env.REACT_APP_MY_BASEURL}/api/comments/` + id)
      .then((res) => {
        setcomment({
          coms: res.data,
        });
        setLoading(true);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [id, setData, setcomment]);

  const initialformdata = {
    author: "",
    body: "",
  };
  const [formdata, updateformdata] = useState(initialformdata);
  const onChange = (e) => {
    updateformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (formdata.body !== "") {
      const body = formdata.body;
      const name = user.username;
      const post = data.posts.id;
      const profile = profiles.data.id;
      const datas = { post, name, body, profile };
      console.log(datas);

      axios
        .post(`${process.env.REACT_APP_MY_BASEURL}/api/postcomment/`, datas)
        .then((res) => {
          toast.success("commented successfully");
        })
        .catch((err) => {
          toast.error(err + "Try Again");
        });
      history.push({
        pathname: `/detailpage/${id}`,
      });
      window.location.reload();
      toast.success("commented successfully");
    } else {
      toast.error("You Can't Submit Empty Field");
    }
  };

  const OnChange = (e) => {
    setlform({
      ...lform,
      [e.target.name]: e.target.value,
    });
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    props.login(lform.username, lform.password);
  };

  // const onLike = ({e}) => {
  //   const url = ``${process.env.REACT_APP_MY_BASEURL}/api/post/${id}/vote/`;
  //    const config = {
  //      headers: {
  //        "Content-Type": "application/json",
  //      },
  //    };

  //    // If token, add to headers config
  //    if (token) {
  //      config.headers["Authorization"] = `Token ${token}`;
  //    }
  //   axios.post(url,config);

  // }
  // const onUnLike = (e) => {
  //         const url = ``${process.env.REACT_APP_MY_BASEURL}/api/post/${id}/vote/`;
  //         const config = {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         };

  //         // If token, add to headers config
  //         if (token) {
  //           config.headers["Authorization"] = `Basic ${token}`;
  //         }
  //   const body  = JSON.stringify({"action":"down"})
  //     axios.post(url,body,config);
  //   };

  const sendcomment = comments.coms;

  return (
    <>
      <section>
        {loading ? (
          <div className="col-md-12 shadow-lg">
            <div className="container">
              <div className="col mb-4 text-center">
                <img
                  src={data.posts.images}
                  className="card-img-top col-md-6"
                  alt="have fun"
                  height="240"
                  width="150"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{data.posts.title}</h5>
                  <p className="card-text">{data.posts.content}</p>

                  <div className="card-footer">
                    <small className="text-muted">
                      Published on: {data.posts.Published} By{" "}
                      {data.posts.subAuthor}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="spins mt-4">
            <span className="spinner"></span>
          </div>
        )}
      </section>
      <div className="container col-md-4">
        <button
          className="btn btn-primary btn-lg btn-block col-md-8 mt-5"
          data-toggle="modal"
          data-target="#myModal"
        >
          {sendcomment.length}
          <i className="fa fa-comments" aria-hidden="true"></i>
          Comments
        </button>

        <div id="myModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  &times;
                </button>
                <h4 className="modal-title pl-2">
                  {" "}
                  {sendcomment.length} Comments
                </h4>
              </div>
              <div className="modal-body ">
                <div className="container">
                  <h4 className="text-center"> Comments</h4>
                  <hr />

                  {sendcomment.map(function (o, i) {
                    return (
                      <div className="col-md-12" key={i}>
                        <div className="alert">
                          <h4>
                            <span>
                              {/* <Avatar
                                textSizeRatio={1.75}
                                color={Avatar.getRandomColor("sitebase", [
                                  "red",
                                  "yellow",
                                  "green",
                                ])}
                                name={o.name}
                                size="50"
                                round={true}
                              /> */}
                              <img
                                src={o.profile.image}
                                alt="profile"
                                className="avatar"
                              />
                            </span>
                            <small className="text-capitalize flex">
                              {"  "}
                              {o.name}
                            </small>
                          </h4>
                          <span>{o.body}</span>
                        </div>
                        <hr className="solid col-md-12" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="modal-footer">
                {isAuthenticated ? (
                  <div className="container">
                    <form className="px-4 py-3 col-md-12" onSubmit={onSubmit}>
                      <div className="form-group">
                        <label htmlFor="exampleDropdownFormPost">
                          Add Comment
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          id="exampleDropdownFormPost"
                          placeholder="Comment"
                          name="body"
                          value={formdata.body}
                          onChange={onChange}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-md btn-block"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        ""
      ) : (
        <div className="container mt-2 col-md-4">
          <div id="accordianId" role="tablist" aria-multiselectable="true">
            <div className="card">
              <div className="card-header" role="tab" id="section1HeaderId">
                <h5 className="mb-0">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordianId"
                    href="#section1ContentId"
                    aria-expanded="true"
                    aria-controls="section1ContentId"
                  >
                    Login to add comment
                  </a>
                </h5>
              </div>
              <div
                id="section1ContentId"
                className="collapse in"
                role="tabpanel"
                aria-labelledby="section1HeaderId"
              >
                <div className="card-body">
                  <div>
                    <form onSubmit={OnSubmit} className="px-4 py-3">
                      <div className="form-group">
                        <label htmlFor="exampleDropdownFormEmail1">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleDropdownFormEmail1"
                          placeholder="Doe"
                          name="username"
                          value={lform.username}
                          onChange={OnChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleDropdownFormPassword1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleDropdownFormPassword1"
                          placeholder="Password"
                          name="password"
                          value={lform.password}
                          onChange={OnChange}
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
                          <label
                            className="form-check-label"
                            htmlFor="dropdownCheck"
                          >
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
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" role="tab" id="section2HeaderId">
                <h5 className="mb-0">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordianId"
                    href="#section2ContentId"
                    aria-expanded="true"
                    aria-controls="section2ContentId"
                  >
                    Register to add Comment
                  </a>
                </h5>
              </div>
              <div
                id="section2ContentId"
                className="collapse in"
                role="tabpanel"
                aria-labelledby="section2HeaderId"
              >
                <div className="card-body">
                  <div className="container col-md-6">
                    <div className="container text-primary">
                      <h4 className="text-center heading">
                        {" "}
                        <Link to="/register">Click here to Register</Link>
                      </h4>{" "}
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

export default connect(mapStateToProps, { login, createMessage })(DetailedPage);

