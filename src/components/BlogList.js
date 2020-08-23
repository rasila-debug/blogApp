import React from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import SelectFilterBlog from '../selectors/blog';


export const BlogList =(props)=>(    
   <div className="content-container"> 
        {  
            props.blogs.length === 0 ?
            ( 
                <div className="list-item list-item--message">
                <span>No Post</span>
                </div>
            ):(
               
                props.blogs.map((blog) =>{                 
                return <BlogListItem key={blog.id}  {...blog} authID={props.authID} />
            })
            )
        }
   </div> 
   
);

const mapStateToProps =(state) =>({    
    blogs:SelectFilterBlog(state.blogs,state.filters),
    authID:state.auth.uid 
});

export default connect(mapStateToProps)(BlogList);