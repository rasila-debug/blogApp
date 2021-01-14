import React from 'react';

import {connect} from 'react-redux';
import LoginModal from './LoginModal';
import {startLogout} from '../actions/auth';


export class Header extends React.Component{
    state={
        loginPrompt :undefined
      }
      handleOpenLoginModal=()=>{
        this.setState({loginPrompt:true});       
      }
      handleCloseLoginModal=()=>{
        this.setState({loginPrompt:undefined})
      }
    render(){
        return(
        <header className="header">
                <div className="header__content content-container">
                <div className="logo">  </div>               
                    { !!this.props.uid ?
                            (
                                <div>
                                     <span className="header__title">{`Hello ${this.props.userName}`}</span>   
                                <button className="button" onClick={this.props.startLogout}>Logout</button>
                                </div>
                            ) :(
                                <button className="button" onClick={this.handleOpenLoginModal}>Login</button>
                                ) 
                            
                    }
                    
                </div>
                <LoginModal loginpopup={this.state.loginPrompt} handleCloseLoginModal={this.handleCloseLoginModal} tagline={'Welcome MyBlog'}/>
         </header>
        );
    }
}
const mapStateToProps = (state) =>({    
    userName : state.auth.userName,
    uid :state.auth.uid
});
const mapDispatchToProps =(dispatch) =>({
    startLogout :()=>dispatch(startLogout())
});
export default connect(mapStateToProps,mapDispatchToProps)(Header);


