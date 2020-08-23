import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setTitleFilter,searchByTitle,searchByAuthor} from '../actions/blogFilterAction';

export const BlogFilterPage =({setTitleFilter,searchByTitle,searchByAuthor,filters,uid}) =>{

   const onTextChange =(e)=>{
        setTitleFilter(e.target.value);
    }
   const onSortChange =(e) =>{
        if(e.target.value === 'title'){
            searchByTitle();
        }else if(e.target.value === 'author'){
            searchByAuthor();
        }
           
    }
   
        return(
            <div className="content-container">           
                <div className="input-group">              
                    <div className="input-group__item">
                        <input 
                            className="text-input" 
                            placeholder="Search Post"
                            type="text" 
                            value={filters.title}
                            onChange={onTextChange}
                        />
                    </div>
                    <div className="input-group__item">
                        <select 
                            className="select"
                            onChange={onSortChange}
                            value={filters.searchBy}
                        >
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                </div>                
                    <div className="input-group__item">                           
                            {!!uid ? 
                                <Link className="button" to="/create">Add Post</Link> :
                                <span></span>                              
                            }
                    </div>
                </div>                    
            </div>
        );

}

const mapStateToProps =(state) =>({
    filters:state.filters,
    uid:state.auth.uid
});

const mapDispatchToProps =(dispatch) =>({
    setTitleFilter:(title) =>dispatch(setTitleFilter(title)),
    searchByTitle:()=>dispatch(searchByTitle()),
    searchByAuthor:()=>dispatch(searchByAuthor())
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogFilterPage);
