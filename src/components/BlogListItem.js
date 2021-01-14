import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import trimPost from '../selectors/trimPost';



export const BlogListItem =(props) =>{
    const blog = {...props}
    return(
            <div className="list-item">
                
                <Link className="list-item__title" to={{pathname:`read/${blog.id}`,
                                                        blogData:{...blog}}}><h3>{blog.title}</h3></Link>
                <div className="list-item__data">{trimPost(blog.body)}</div>
                <div className="list-item__sub-title"> Posted By
                    <span>{` ${blog.author} `}</span>on
                    <span>{` ${moment(blog.createdAt).format('MMMM Do, YYYY')}.`}</span>   
                </div>            
               <div> 
                   {(blog.authID === blog.uid)?<Link className="button" to={`/edit/${blog.id}`}>Edit</Link> :''}
                  
               </div>    
               
            </div>
           
               
        
    );
}



export default BlogListItem;