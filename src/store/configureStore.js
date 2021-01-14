import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import blogReducer from '../reducers/blogReducer';
import filterReducer from '../reducers/filterReducer';
import bookmarkReducer from '../reducers/bookmarkReducer';
import commentReducer from '../reducers/commentReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Combine Reducers
export default () =>{
    const store =createStore(
        combineReducers({  
                filters:filterReducer,
                blogs:blogReducer,           
                auth:authReducer,
                bookmarks:bookmarkReducer,
                comments:commentReducer
            }),
       composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

