import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter,{history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login,logout} from './actions/auth';
import {firebase} from './firebase/firebase';
//import 'normalize.css/normalize.css';
import 'react-quill/dist/quill.snow.css';
import './styles/styles.scss';

import LoadingPage from './components/LoadingPage';
import {startUserBlog} from './actions/blogAction';
import {bookmarkById} from './actions/bookmarkAction';
const store =configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
let hasRendered = false;
const renderApp =() =>{
    if(!hasRendered){
        ReactDOM.render(jsx,document.getElementById('app'));
        hasRendered = true;
    }
}

ReactDOM.render(<LoadingPage/>,document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) =>{  
    if(user){ 
        if(user.emailVerified){  
            const userName = user.displayName === null ? 'User' : user.displayName;
            store.dispatch(login(user.uid,userName));
         } 
    }
    else{     
        store.dispatch(logout());          
        
    }
    store.dispatch(startUserBlog()).then(()=>{
        renderApp();
    });
    history.push('/');
})


