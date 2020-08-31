import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import trimPost from '../selectors/trimPost';



export const BlogListItem =({id,title,body,author,createdAt,uid,authID}) =>(
      
        <div className="list-item">
            <Link className="list-item__title" to={`read/${id}`}><h3>{title}</h3></Link>
            <div className="list-item__data">{trimPost(body)}</div>
            <div className="list-item__sub-title"> Posted By
                <span>{` ${author} `}</span>on
                <span>{` ${moment(createdAt).format('MMMM Do, YYYY')}.`}</span>         
            </div>            
           <div> 
                
               {(authID === uid)? <Link className="button" to={`/edit/${id}`}>Edit</Link> :''}
           </div>    
             
        </div>
       
           
    
);


export default BlogListItem;