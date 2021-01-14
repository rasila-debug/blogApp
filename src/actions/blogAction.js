import database from '../firebase/firebase';



export const addBlog =(blog)=>({
    type:'ADD_BLOG',
    blog
});

export const startAddBlog =(blogData={})=>{
    return (dispatch,getState)=>{
        const uid =getState().auth.uid;
        const {title ='',body='',author='',createdAt=0}=blogData;
        const blog={title,body,author,createdAt};
       database.ref(`users/${uid}/blogs`).push(blog).then((ref)=>{      
            return dispatch(addBlog({
                id:ref.key,
                ...blog,
                uid
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
        const uid =getState().auth.uid;
        return database.ref(`users/${uid}/blogs/${id}`).remove().then(()=>{
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
        const uid = getState().auth.uid; 
       return database.ref(`users/${uid}/blogs/${id}`).update(updates).then(()=>{
            dispatch(editBlog(id,updates));
        });
    }
}


//BLOG_LIST
export const listBlog = (blogs) =>({
    type:'LIST_BLOG',
    blogs
});
//BOOKMARK_LIST
export const listBookmark =(bookmarks) =>({
    type:'LIST_BOOKMARK',
    bookmarks
})

export const startUserBlog = () =>{
    return (dispatch,getState) => { 
        const uid = getState().auth.uid;       
        let query="";
        const ref =database.ref();

        query = ref.child('users').once('value');
        return query.then((snapshot) => {
            const posts = [];
            const blogList =[];
            snapshot.forEach((childSnapshot) => {
                posts.push({
                    id : childSnapshot.key,
                    ...childSnapshot.val()
                })
                
            })
           
            const bookmark =[];
           
            posts.filter(({id,blogs,bookmarks})=>{
            Object.entries(blogs).filter((blog)=>{
                blogList.push({id:blog[0],...blog[1],uid:id})
                })
                if(bookmarks){
                    Object.entries(bookmarks).filter((bm)=>{
                        if(id === uid){
                            bookmark.push({id:bm[0],val:bm[1]})
                        }
                    })
                }
           
           })
           dispatch(listBookmark(bookmark))
            dispatch(listBlog(blogList));
        })
    };

};
   