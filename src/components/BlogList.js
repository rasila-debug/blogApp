import React from 'react';
import {connect} from 'react-redux';
import BlogListItem from './BlogListItem';
import SelectFilterBlog from '../selectors/blog';
import ReactPaginate from 'react-paginate';

export class BlogList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            offset:0,
            dataSlice:[],
            perPage:3,
            currentPage:0
            // pageCount:0,
            // dataSlice2:[]
        }
    }
    receivedData=()=>{      
        const data=this.props.blogs;      
        const slice =data.slice(this.state.offset, this.state.offset + this.state.perPage)  
        this.setState({
            pageCount:Math.ceil(data.length / this.state.perPage),
            dataSlice:slice
        })
       
    }
    handlePageClick=(e)=>{
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage:selectedPage,
            offset:offset
        },()=>{
            this.receivedData()
        });
    }
    componentDidMount(){
        this.receivedData()
    }componentDidUpdate(prevProps, prevState) {
        if(this.props.blogs !== prevProps.blogs){
            this.receivedData()
        }
        
    }
    render(){
        return(
            
            <div className="content-container"> 
            {
                this.state.dataSlice.length === 0 ?(
                   <div className="list-item list-item--message">
                    <span>No Post</span>
                   </div>
                ):( 
                  
                         this.state.dataSlice.map((blog) =>{                 
                        return <BlogListItem key={blog.id}  {...blog} authID={this.props.authID} />
                    })
                )
                
            }
           <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
           
        </div> 
        
        );
    }
   
}
const mapStateToProps =(state) =>({    
    blogs:SelectFilterBlog(state.blogs,state.filters),
    authID:state.auth.uid 
});

export default connect(mapStateToProps)(BlogList);

// this.props.blogs.length === 0 ?
// ( 
//     <div className="list-item list-item--message">
//     <span>No Post</span>
//     </div>
// ):(               
//    this.props.blogs.map((blog) =>{                 
//     return <BlogListItem key={blog.id}  {...blog} authID={this.props.authID} />
// })
// )