import database from '../firebase/firebase';



export const addBlog =(blog)=>({
    type:'ADD_BLOG',
    blog
});

export const startAddBlog =(blogData={})=>{
   
    return (dispatch,getState)=>{
        const uid =getState().auth.uid;
        const {title ='',body='',author='',createdAt=0}=blogData;
        const blog={title,body,author,createdAt,uid};
       
       database.ref('blogs').push(blog).then((ref)=>{      
            return dispatch(addBlog({
                id:ref.key,
                ...blog
            }));
           
        });
    };
  
};

export const removeBlog =({id}={}) =>({
    type:'REMOVE_BLOG',
    id
});

export const startRemoveBlog =({id}={}) =>{
    return(dispatch,getState) =>{
     
        return database.ref(`blogs/${id}`).remove().then(()=>{
            dispatch(removeBlog({id}));
        });
    }
}

//EDIT_BLOG
export const editBlog =(id,updates)=>({    
    type:'EDIT_BLOG',
    id,
    updates
});

export const startUpdateBlog = (id,updates)=>{
    return(dispatch,getState) =>{ 
       return database.ref(`blogs/${id}/`).update(updates).then(()=>{
            dispatch(editBlog(id,updates));
        });
    }
}


//BLOG_LIST
export const listBlog = (blogs) =>({
    type:'LIST_BLOG',
    blogs
});

export const startUserBlog = () =>{
    return (dispatch,getState) => { 
        const uid = getState().auth.uid;       
        let query="";
        const ref =database.ref();

        query = ref.child('blogs').once('value');
        return query.then((snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                posts.push({
                    id : childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(listBlog(posts));
        })
    };

};
   