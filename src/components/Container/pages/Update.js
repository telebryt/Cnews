import React, { Fragment,useEffect, useState } from 'react';
import {useHistory,useParams } from 'react-router-dom';
import axios from 'axios';



export default function UpdatePosts() {
    const { id } = useParams();
    const history = useHistory()
    const initialState = Object.freeze({
        title: '',
        excerpt: '',
        content: '',
        campus: '',
        category: '',
    });
    const [formdata, updateformdata] = useState(initialState);
    useEffect(() => {
       
        const url = `${process.env.REACT_APP_MY_BASEURL}/api/detail/` + id;
        axios
            .get(url)
            .then((res) => {
                updateformdata({
                    ...formdata,
                    title: res.data.title,
                    excerpt: res.data.excerpt,
                    content: res.data.content,
                    campus : res.data.campus,
                    category: res.data.category,
    
                });
                console.log(res.data);

        })
    }, [updateformdata,id,formdata]);
    
    const onChange = (e) => {
        updateformdata({
            ...formdata,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formdata);
        axios.put(
          `${process.env.REACT_APP_MY_BASEURL}/api/detail/` + id + "/",
          {
            title: formdata.title,
            excerpt: formdata.excerpt,
            content: formdata.content,
            campus: formdata.campus,
            category: formdata.category,
          }
        );
        history.push({
            pathname: '/',
        });
        // window.location.reload();
    };

        return(
                <Fragment>

                 <div className = "container col-md-6">
                    <div className = "container text-primary"> 
                    <h1 className =  " display-4 text-center heading"> Create Post</h1> <hr />
                    </div>
                    <form className="px-4 py-3" onSubmit = {onSubmit}>
                    <div className="form-group">
                    <label htmlFor="exampleDropdownFormPost">Title</label>
                    <input type="text" className="form-control" id="exampleDropdownFormPost" placeholder="Title" name= "title" value={formdata.title} onChange = {onChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleDropdownFormPost">Excerpt</label>
                    <textarea type="text" className="form-control" id="exampleDropdownFormPost" placeholder="Excerpt" name= "excerpt" value={formdata.excerpt} onChange = {onChange} />
                    </div>
                    <div className="form-group">
                    <label htmlFor="exampleDropdownFormPost">Content</label>
                    <textarea type="text" className="form-control" id="exampleDropdownFormPost" placeholder="Content" name= "content" value={formdata.content} onChange = {onChange} />
                    </div>

                   
                        <div className="form-group">
                           <label htmlFor="sel1">Select Category:</label>
                           <select className="form-control" id="sel1" name= "category" value={formdata.category} onChange = {onChange} >
                              <option>.....</option>
                              <option>News</option>
                              <option>Politics</option>
                              <option>Education</option>
                              <option>Blog</option>
                              <option>Article</option>
                              <option>Entertainment</option>
                           </select>
                           </div>
                        <div className="form-group">
                           <label htmlFor="sel1">Select Campus:</label>
                           <select className="form-control" id="sel1" name= "campus" value={formdata.campus} onChange = {onChange}>
                              <option disabled>.....Or if not available just choose university</option>
                              <option>University</option>
                              <option>Legon</option>
                              <option>KNUST</option>
                              <option>UCC</option>
                              <option>UHAS</option>
                              <option>KTU</option>
                           </select>
                           </div>
                   
               
                    <button type="submit" className="btn btn-primary btn-block btn-rounded">Create Post</button>
                </form>
                </div>              
                </Fragment>


                
                
        )
    
}




