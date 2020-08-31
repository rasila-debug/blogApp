import React from 'react';
import Header from './Header';
import BlogFilterPage from './BlogFilterPage';
import BlogList from './BlogList';
const DashboardPage =()=>(
  <React.Fragment>
    <Header/>
    <BlogFilterPage/>     
    <BlogList/>  
  </React.Fragment>
);

export default DashboardPage;