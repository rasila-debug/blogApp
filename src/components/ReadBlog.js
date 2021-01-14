import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import parse from 'html-react-parser';
import moment from 'moment';
import Header from './Header';
import Comment from './Comment';
import LoginModal from './LoginModal';
import BackToDashboard from './BackToDashboard';
import {startAddBookmark,startRemoveBookmark} from '../actions/bookmarkAction';
import {startAddComment,listComment} from '../actions/commentAction';

export const ReadBlog =(props) =>{ 
  const blog = props.location.blogData;
 const commentArr=[];

 useEffect(()=>{
  if(blog.comments != undefined){
    Object.entries(blog.comments).filter((comment)=>{
            commentArr.push({id:comment[0],...comment[1]})
        })
    props.dispatch(listComment(commentArr));
  }else{
    props.dispatch(listComment(commentArr));
  }
 })
  const [loginPrompt,setloginPrompt]=useState(undefined);
  const [heading,setHeading]=useState('');
  //Login modal popup
  const handleOpenLoginModal=()=>{setloginPrompt(true) }
  const handleCloseLoginModal=()=>{setloginPrompt(undefined)}
   
  //Save Bookmark in Database
  const bookmarkClick=()=>{
      if(blog.authID === undefined){
        setHeading('Create or Sign in to an account to bookmark.');
          setloginPrompt(true); 
      }else{
       
        if(props.bm_id === undefined){
          props.dispatch(startAddBookmark(blog.id))
        }else{   
            props.dispatch(startRemoveBookmark(props.bm_id.id))
        }
      }  
  }
   //handleCallback
  const handleCallback =(commentCallback)=>{
    if(commentCallback.comment === ''){
        setHeading(commentCallback.popupHeading);
        handleOpenLoginModal(); 
    }else{
        const newComment={text:commentCallback.comment,userName:props.userName,authID:blog.authID,posted:moment().valueOf()};
        props.dispatch(startAddComment(newComment,blog.id,blog.uid))
    }
   }
   //Delete Comment
   const handleDeleteComment=(id)=>{
      //props.dispatch(startRemoveComment(blog.uid,blog.id,id))
   }

   return (
    <div>
        <Header />   
        <div className="content-container">
        <div className="page-header">
             <div className="page-header__title">
                    <h2>{blog.title}</h2> 
                    <BackToDashboard/>
             </div>
             <div className="list-item__sub-title"> Posted By
                <span>{` ${blog.author} `}</span>on
                <span>{` ${moment(blog.createdAt).format('MMMM Do, YYYY')}.`}</span> 
               <a className="tooltip" onClick={bookmarkClick}>
                   {
                       (props.bm_id === undefined)?
                       ( <i className="bookmark" aria-hidden="true"></i>)
                       :
                       <i className="bookmarked" aria-hidden="true"></i>
                   }
                   <span className="tooltiptext">Bookmark</span>
               </a>
            </div>
        </div> 
        <div className="list-item__data">
            {parse(blog.body,{ trim: true })}
        </div>
        <Comment  parentCallback={handleCallback} authID={blog.authID} handleDeleteComment={handleDeleteComment} uid={blog.uid} blogID={blog.id} />
        </div>
        <LoginModal loginpopup={loginPrompt} handleCloseLoginModal={handleCloseLoginModal} tagline={heading}/>
    </div>
);
} 
const mapStateToProps =(state, props)=>({
    bm_id:state.bookmarks.find((bm) => bm.blogID === props.location.blogData.id),
    userName:state.auth.userName
});

export default connect(mapStateToProps)(ReadBlog);