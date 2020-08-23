import React,{useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import Quill from './Quill';
import xss from 'xss';
export const BlogForm =({onSubmit,title,body,author,createdAt})=>{
    const [blogTitle,setTitle] = useState(title || '');
    const [blogBody, setBody] = useState(body || '');
    const [blogCreatedAt] = useState(createdAt || moment());
    const [error,setError] = useState('');

    const onTitleChange =(e)=>{
        setTitle(e.target.value);
    }
    const onBlogBodyChange =(value) =>{  
       setBody(value);
    }
    const onFormSubmit =(e) =>{
        e.preventDefault();       
        
        if(!blogTitle || !blogBody)
        {
            setError('Please provide blog title and blog content.')
        }
        else{
            setError('');           
          onSubmit({
                title:blogTitle,
                body:xss(blogBody),
                createdAt:blogCreatedAt.valueOf(),
                author:author
            })
        }
    }
    return(
        <form className="form" onSubmit={onFormSubmit}>
                 {error && <p className="form__error">{error}</p>}
                 <input 
                        autoFocus
                        className="text-input"
                        type="text" 
                        placeholder="Blog Title"                        
                        value={blogTitle} 
                        onChange={onTitleChange} 
                    />
                <Quill body={blogBody} setBody={onBlogBodyChange} />             
                    <div>
                        <button className="button">Save Blog</button>
                    </div>
            </form>
    );
}
const mapStateToProps =(state)=>({
    author :state.auth.userName
})

export default connect(mapStateToProps)(BlogForm);