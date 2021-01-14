import React, {useMemo, useState} from 'react';
import { connect } from 'react-redux';
import  {Node,createEditor} from 'slate';
import {Slate, Editable, withReact} from 'slate-react'// Import the Slate components and React plugin
import moment from 'moment';
import {startRemoveComment} from '../actions/commentAction';


export const Comment =(props)=>{
  
  const comments=props.commentList;
    const [error,setError] = useState('');
    //Slate JS
    const editor = useMemo(() => withReact(createEditor()),[]);
    const initialEditorValue = [{
      type: 'paragraph',
      children: [{ text: '' }],
    }];
    const [value, setValue] = useState(initialEditorValue)
    //Serialize and Deserialize Editor value  
    const serialize = (value) => {
        return (value
          .map(n => Node.string(n)).join('\n')
        )
      }
      const deserialize = (string) => {
        return string.split('\n').map(line => {
          return {children: [{ text: line }],}
        })
      }
    const publishComment =()=>{
      setError('');
      const content = serialize(value)
      if(content){
        if(props.authID === undefined){
          props.parentCallback({popupHeading:'Create or Sign in to an account to comment.',commnent:''})
        }else{
            setError('');
            props.parentCallback({popupHeading:'',comment:content})
            setValue(initialEditorValue)
        }
      }else{
        setError('Please enter comment.')
      }
    }
    
    const onRemoveComment=(comment_id)=>{
      props.dispatch(startRemoveComment(props.uid,props.blogID,comment_id))
    }
    return(
        <div>
             <h3>Comments{(!comments)?'(0)':`(${comments.length})`}</h3>
        
        {
          (!comments)?'Be the first to comment.':
          (
            comments.map((comment) =>{
            
              return <div key={comment.id} className="comment-section">
                <i className="userImage"></i>
                <div className="comment">
                  <span>{comment.userName}</span>
                  <span className="comment__posted">{moment(comment.posted).fromNow()}</span>
                  
                  {(props.authID === comment.authID)?<i className="remove_comment" title="Delete Comment" onClick={()=>onRemoveComment(comment.id)}></i>:''}
                  <p className="comment__text">{comment.text}</p>
                </div>
              </div>
            })
           
          )
        }
         {error && <p className="form__error">{error}</p>}
         <div className="slate_box">
            <Slate editor={editor} value={value} onChange={newValue =>setValue(newValue)} >
                    <Editable placeholder="What are your thoughts?" className="slate" />
            </Slate>
            <div className="post_btn">
                <button className="button" onClick={publishComment}>Post Comment</button>
                <button className="button" onClick={()=>{  setError(''); setValue(initialEditorValue)}}>Cancel</button>
            </div>
         </div>
        
        </div>
    );
}
const mapStateToProps =(state,props) =>({
    commentList : state.comments
})
export default connect(mapStateToProps)(Comment);