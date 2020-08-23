import React from 'react';
import {Router,Route,Switch,Link ,NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import AddBlogPage  from '../components/AddBlogPage';
import DashboardPage from '../components/Dashboard';
import EditBlogPage from '../components/EditBlogPage';
import NotFoundPage from '../components/NotFoundPage';
import ReadBlog from '../components/ReadBlog';

export const history =createHistory();
const AppRouter =()=>(
        <Router history = {history} >
    <div>
       
        <Switch>      
            <PublicRoute path="/" component={DashboardPage} exact={true} />     
           
            <PublicRoute path="/read/:id" component={ReadBlog}/>           
            <PrivateRoute path="/create" component={AddBlogPage} />   
            <PrivateRoute path="/edit/:id" component={EditBlogPage} />  
                        
            <Route component={NotFoundPage} />
        </Switch>
       
    </div>        
    </Router>
);
export default AppRouter;