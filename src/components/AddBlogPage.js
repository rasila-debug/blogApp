import React from 'react';
import { connect } from 'react-redux';
import {startAddBlog} from '../actions/blogAction';
import BlogForm from './BlogForm';

export class AddBlogPage extends React.Component{
    onSubmit = (blog) =>{
        this.props.startAddBlog(blog);
        this.props.history.push('/');
    }   
    render(){
        return(
            <div className="content-container">
                <div className="page-header"><h1 className="page-header__title">Add Post</h1> </div>
                <BlogForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}
const mapDispatchToProps =(dispatch) =>({
    startAddBlog :(blog) => dispatch(startAddBlog(blog))
});

export default connect(undefined, mapDispatchToProps)(AddBlogPage);