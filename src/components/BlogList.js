import React,{ useState, useEffect} from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import SelectFilterBlog from '../selectors/blog';
import ReactPaginate from 'react-paginate';

export const BlogList =(props)=>{
    const postData=props.blogs;  
    const [data,setData]=useState([]);
    const [offset,setOffset] =useState(0);
    const [perPage,setPerpage]=useState(3);
    const [currentPage,setCurrentPage]=useState(0);
    const [pageCount,setPageCount]=useState(0);
   
    
    const receivedData=()=>{
        const slice =postData.slice(offset, offset + perPage)           
        setPageCount(Math.ceil(postData.length / perPage))
        setData(slice)      
      //+++++++++++++++++++++++++++
     
    }
    const handlePageClick=(e)=>{        
        const selectedPage = e.selected;
        const offset = selectedPage * perPage;
        setCurrentPage(selectedPage);
        setOffset(offset);             
    }
    useEffect(()=>{       
       receivedData();     
    },[currentPage,props.blogs])  

    return(            
            <div className="content-container">          
            {
               data.length === 0 ?(
                   <div className="list-item list-item--message">
                    <span>No Post</span>
                   </div>
                ):( 
                        data.map((blog) =>{                 
                        return <BlogListItem key={blog.id}  {...blog} authID={props.authID} />
                    })
                )
                
            }
           <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
           
        </div> 
        
        );
}
const mapStateToProps =(state) =>({    
    blogs:SelectFilterBlog(state.blogs,state.filters),
    authID:state.auth.uid 
});

export default connect(mapStateToProps)(BlogList);

