import React from 'react';
import {connect} from 'react-redux';
import BlogForm from './BlogForm';
import {startUpdateBlog,startRemoveBlog} from '../actions/blogAction';
import DeletePostModal from './DeletePostModal';
import BackToDashboard from './BackToDashboard';

export class EditBlogPage extends React.Component{
    
     state={
      showModal:undefined
     }
      handleOpenModal = () => {
        this.setState({ showModal: true });
      }
      handleCloseModal =() =>{
        this.setState({ showModal: undefined });
      }
      onSubmit = (blog) => {
          this.props.startUpdateBlog(this.props.blog.id, blog);
          this.props.history.push('/');
      };
      onRemove = () => {
          this.props.startRemoveBlog({ id: this.props.blog.id });
          this.props.history.push('/');
      };
     
    render(){
      return(
        <div className="content-container">
            <div className="page-header">
               <div className="page-header__title">
                    <h2>Edit Post</h2> 
                    <BackToDashboard/>
                    </div>                    
            </div>
            <div>
              <BlogForm onSubmit={this.onSubmit} {...this.props.blog} />
              <button className="button" onClick={this.handleOpenModal}>Delete Post</button>
            <DeletePostModal 
              isOpen={this.state.showModal} 
              isClose={this.handleCloseModal}              
              onRemove={this.onRemove}/>
   
            </div>
          </div>
      );
    }

}
const mapStateToProps = (state, props) => ({
    blog: state.blogs.find((blog) => blog.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateBlog: (id, blog) => dispatch(startUpdateBlog(id, blog)),
  startRemoveBlog: (data) => dispatch(startRemoveBlog(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBlogPage);
