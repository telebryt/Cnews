import React, { Fragment, useEffect, useState } from "react";
import { GetPost } from "../../../Actions/Post";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { Profiles } from "../../../Actions/Auth";
import { loadUser } from "../../../Actions/Auth";
function Post(props) {
  const [feature, setfeature] = useState({
    post: [],
  });
  const [trending, setTrending] = useState({
    post: [],
  });
  const [loading, setloading] = useState(false);
  Post.propTypes = {
    posts: PropTypes.array.isRequired,
    GetPost: PropTypes.func.isRequired,
  };

  useEffect(() => {
    props.GetPost();
    props.Profiles();
    // props.loadUser();
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_MY_BASEURL}/api/featured/`)
      .then((res) => {
        setfeature({
          post: res.data[0],
        });
      });
    axios.get(`${process.env.REACT_APP_MY_BASEURL}/api/trending`).then((res) => {
      setTrending({
        post: res.data,
      });
      toast.success("Welcome to CN 😊 😘");
      setloading(true);
    });
  }, []);
  const [pageNumber, setPagenumber] = useState(0);
  const PostperPage = 10;
  const pagesVisited = PostperPage * pageNumber;
  const pageCount = Math.ceil(props.posts.length / PostperPage);
  const ChangePage = ({ selected }) => {
    setPagenumber(selected);
  };
  const trend = trending.post;
  console.log(trend);
  console.log(props.posts)
  return (
    <Fragment>
      <div className="container">
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            <Link className="p-2 link-secondary" to="category/News">
              News
            </Link>
            <Link className="p-2 link-secondary" to="category/Politics">
              Politics
            </Link>
            <Link className="p-2 link-secondary" to="category/Relationship">
              Relationship
            </Link>
            <Link className="p-2 link-secondary" to="category/Education">
              Education
            </Link>
            <Link className="p-2 link-secondary" to="category/Blog">
              Blog
            </Link>
            <Link className="p-2 link-secondary" to="category/Article">
              Article
            </Link>

            <Link className="p-2 link-secondary" to="category/Science">
              Science
            </Link>
            <Link className="p-2 link-secondary" to="category/Entertainment">
              Entertainment
            </Link>
          </nav>
        </div>

        {loading ? (
          <div>
            <div className="p-4 p-md-5 mb-4 text-white rounded featured ">
              <div className="col-md-6 px-0">
                <h3 className="fst-italic text-capitalize">
                  {feature.post.title}
                </h3>
                <p className="lead my-3">{feature.post.excerpt}</p>
                <p className="lead mb-0">
                  <Link
                    to={"/detailPage/" + feature.post.id}
                    className="text-white fw-bold"
                  >
                    Continue reading...
                  </Link>
                </p>
              </div>
            </div>
            <h3 className="text-center trend">Trending Post</h3>
            <hr />
            <div className="row row-cols-1 row-cols-md-2 mainrow">
              {trending.post.map((post) => (
                <div key={post.id} className="col mb-4">
                  <img
                    src={post.images}
                    className="card-img-top postImage"
                    alt="have fun"
                    height="240"
                    width="200"
                    loading="lazy"
                  />
                  <div className="card-body">
                    <Link to={"/detailPage/" + post.id}>
                      <h5 className="card-title text-capitalize">
                        {post.title}
                      </h5>
                      <p className="card-text">
                        {post.excerpt.substr(0, 100)}....
                      </p>
                    </Link>
                    <div className="card-footer rounded">
                      <small className="text-muted text-capitalize">
                        Published on: {post.Published} By {post.subAuthor} As{" "}
                        {post.category} From {post.campus}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="container text-primary">
              <h1 className="text-center heading"> Post</h1> <hr />
            </div>
            <section>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                {props.posts
                  .slice(pagesVisited, pagesVisited + PostperPage)
                  .map((post) => (
                    <div key={post.id} className="col mb-4 shadow-lg">
                      <div className="card border-0 p-0">
                        <img
                          src={post.images}
                          className="card-img-top"
                          alt="have fun"
                          height="240"
                          width="200"
                          loading="lazy"
                        />
                        <div className="card-body">
                          <Link to={"/detailPage/" + post.id}>
                            <h5 className="card-title text-capitalize">
                              {" "}
                              {post.title}
                            </h5>
                            <p className="card-text">
                              {" "}
                              {post.excerpt.substr(0, 100)}....
                            </p>
                          </Link>
                          <p className="card-text">
                            <small className="text-muted">
                              {" "}
                              Published on: {post.Published} By {post.subAuthor}{" "}
                              As {post.category} From {post.campus}
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="spins mt-4">
            <span className="spinner"></span>
          </div>
        )}
      </div>
      <hr />
      <div className="clearfix">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={ChangePage}
          containerClassName={"paginatebtn"}
          previousClassName={"PrevBtn"}
          nextClassName={"NextBtn"}
          disabledClassName={"disBtn"}
          activeClassName={"actBtn"}
        />
        <button className="btn btn-sm" onClick={window.scrollTo(0, 5)}></button>
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { GetPost, Profiles,loadUser })(Post);
