import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Searchbar() {
   
	const search = `${process.env.REACT_APP_MY_BASEURL}/api/search/`;
  const [appState, setAppState] = useState({
    search: "",
    posts: [],
  });
const [isloading, setisLoading]=useState(false)
  useEffect(() => {
      axios
          .get( search + window.location.search)
          .then((res) => {
            const allPosts = res.data;
            setAppState({ posts: allPosts });
            console.log(res.data);
            setisLoading(true)
          });
  }, [setAppState]);
    const post = appState.posts;
    const success = (
      <>
        <div className="container">
          <div className="container text-primary">
            <h1 className=" display-4 text-center heading"> Search Results</h1>{" "}
            <hr />
          </div>
          <section>
            <div className="row row-cols-1 row-cols-md-3 mainrow">
              {appState.posts.map((post) => (
                <div key={post.id} className="col mb-4">
                  <img
                    src={post.images}
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
          </section>
        </div>
      </>
    );
    const failed = (
      <>
        <div className="container col-md-6 mt-12 mb-12">
        <h1 className=" display-4 text-center heading"> Search Results</h1>{" "}
        <hr />
          <h2 className="alert-info display-5 ">No Results Found!!..Try Again </h2>
        </div>
      </>
    );
        return (
          <div>
            <>
            
             {!post || post.length===0?failed:success}
              <hr />
             
            </>
          </div>
        );
    }
