import database from '../firebase/firebase';


    export const addComment =(comment)=>({
    type:'ADD_COMMENT',
    comment
})
export const startAddComment =(commentData={},blogID='',uid='')=>{
    return (dispatch,getState)=>{
        const {text ='',userName='',authID='',posted=0}=commentData;
        const comment={text,userName,authID,posted};
         database.ref(`users/${uid}/blogs/${blogID}/comments`).push(comment).then((ref)=>{      
            return dispatch(addComment({id:ref.key,...comment}));
            
        });
    }
}


export const removeComment =(id='')=>({
    type:'REMOVE_COMMENT',
    id
})
export const startRemoveComment =(uid,blogID,id) =>{
    return(dispatch,getState)=>{
        return database.ref(`users/${uid}/blogs/${blogID}/comments/${id}`).remove().then(()=>{
            dispatch(removeComment(id));
        })
    }
}


//COMMENT_LIST
export const listComment = (comments)=>({
    type:'LIST_COMMENT',
    comments
})
