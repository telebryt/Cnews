import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Category(props) {
  const [catBlog, setCateBlog] = useState({ post: [] });
  const [category, setCategory] = useState("");
  useEffect(() => {
    const categorys = props.match.params.id;
    setCategory(categorys);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
      axios
        .post(
          `${process.env.REACT_APP_MY_BASEURL}/api/category`,
          { categorys },
          config
        )
        .then((res) => {
          setCateBlog({ post: res.data });
        })
        .catch((err) => console.log(err));
     
  }, [props.match.params.id]);
    
  console.log(catBlog.post);
  const cat = catBlog.post
    return (
      <>
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content-between">
            <Link className="p-2 link-secondary" to="/category/News">
              News
            </Link>
            <Link className="p-2 link-secondary" to="/category/Politics">
              Politics
            </Link>
            <Link className="p-2 link-secondary" to="category/Relationship">
              Relationship
            </Link>
            <Link className="p-2 link-secondary" to="/category/Education">
              Education
            </Link>
            <Link className="p-2 link-secondary" to="/category/Blog">
              Blog
            </Link>
            <Link className="p-2 link-secondary" to="/category/Article">
              Article
            </Link>

            <Link className="p-2 link-secondary" to="/category/Science">
              Science
            </Link>
            <Link className="p-2 link-secondary" to="/category/Entertainment">
              Entertainment
            </Link>
          </nav>
        </div>
        <h3 className="text-center text-capitalize trend">{category} Post</h3>
        <hr />
        {cat.length === 0 ? (
          <div className="col md-6">
            {" "}
            <h1>No Post for {category} .....</h1>
          </div>
        ) : (
          <div className="container row row-cols-1 row-cols-md-2 ml-3 mr-3">
            {cat.map((post) => (
              <div key={post.id} className="col mb-4">
                <img
                  src={`${process.env.REACT_APP_MY_BASEURL}` + post.images}
                  className="card-img-top"
                  alt="have fun"
                  height="240"
                  width="200"
                />
                <div className="card-body">
                  <Link to={"/detailPage/" + post.id}>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.excerpt}</p>
                  </Link>
                  <div className="card-footer">
                    <small className="text-muted">
                      Published on: {post.Published} By {post.subAuthor} As{" "}
                      {post.category}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <h4>
          <Link className="float-right pr-4" to="/">
            Back to Home
          </Link>
        </h4>
      </>
    );
}

export default Category;
