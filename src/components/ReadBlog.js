import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import Header from './Header';

export const ReadBlog =(props) =>(
    <div>
        <Header />        
        <div className="content-container">
        <div className="page-header"> <h1 className="page-header__title">{props.blog.title}</h1> </div>
        <div className="list-item__data"> {parse(props.blog.body,{ trim: true })}</div>
        <div className="list-item__text">
                <span className="list-item__sub-title">Posted By {props.blog.author}</span> 
                <span className="list-item__sub-title">{moment(props.blog.createdAt).format('MMMM Do, YYYY')}</span>
        </div> 
            <Link className="button" to="/">Back to DashBoard</Link>      
        </div>
    </div>
);

const mapStateToProps =(state, props)=>({
    blog: state.blogs.find((blog) => blog.id === props.match.params.id)
});

export default connect(mapStateToProps)(ReadBlog);