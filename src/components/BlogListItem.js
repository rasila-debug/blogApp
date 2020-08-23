import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import trimPost from '../selectors/trimPost';



export const BlogListItem =({id,title,body,author,createdAt,uid,authID}) =>(
    
        <div className="list-item">
            <h3 className="list-item__title">{title}</h3>
            <div className="list-item__data"> {trimPost(body)} </div>
            <div className="list-item__text">
                <span className="list-item__sub-title">Posted By {author}</span> 
                <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>
            </div>           
           <div> 
                <Link className="button" to={`read/${id}`}>Read</Link>
               {(authID === uid)? <Link className="button" to={`/edit/${id}`}>Edit</Link> :''}
           </div>    
             
        </div>
           
           
    
);


export default BlogListItem;