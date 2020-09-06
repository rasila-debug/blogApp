import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import parse from 'html-react-parser';
import moment from 'moment';
import Header from './Header';
import BackToDashboard from './BackToDashboard';
export const ReadBlog =(props) =>(
    <div>
        <Header />   
        {console.log(props.blog.id)}     
        <div className="content-container">
        <div className="page-header">
             <div className="page-header__title">
                    <h2>{props.blog.title}</h2> 
                    <BackToDashboard/>
             </div>
             <div className="list-item__sub-title"> Posted By
                <span>{` ${props.blog.author} `}</span>on
                <span>{` ${moment(props.blog.createdAt).format('MMMM Do, YYYY')}.`}</span>         
            </div>
        </div> 
        <div className="list-item__data"> {parse(props.blog.body,{ trim: true })}</div>
        </div>
    </div>
);

const mapStateToProps =(state, props)=>({
    blog: state.blogs.find((blog) => blog.id === props.match.params.id)
});

export default connect(mapStateToProps)(ReadBlog);