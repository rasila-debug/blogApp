import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import blogReducer from '../reducers/blogReducer';
import filterReducer from '../reducers/filterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Combine Reducers
export default () =>{
    const store =createStore(
        combineReducers({  
                filters:filterReducer,
                blogs:blogReducer,           
                auth:authReducer
            }),
       composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}

