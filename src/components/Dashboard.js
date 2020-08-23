import React from 'react';

import Header from './Header';
import BlogFilterPage from './BlogFilterPage';
import BlogList from './BlogList';
const DashboardPage =()=>(
    <div>
      <Header/>
       <BlogFilterPage/>     
      <BlogList/>
    </div>
);

export default DashboardPage;