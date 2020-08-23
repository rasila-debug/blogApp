import React from 'react';
import {Link} from 'react-router-dom';
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
            <div className="content-container">
                <div className="header__content">
                    <Link  className="header__title" to="/"><h1>My Blog</h1></Link>             
                    { !!this.props.uid ?
                            (
                                <div>
                                     <span className="header__title">{this.props.userName}</span>   
                                <button className="button--link" onClick={this.props.startLogout}>Logout</button>
                                </div>
                            ) :(
                                <button className="button--link" onClick={this.handleOpenLoginModal}>Login</button>
                                ) 
                            
                    }
                    
                </div>
                <LoginModal loginpopup={this.state.loginPrompt} handleCloseModal={this.handleCloseLoginModal} />
            </div>
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


