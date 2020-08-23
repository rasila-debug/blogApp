import React from 'react';
import {connect} from 'react-redux';
import {startLogin,startFacebookLogin,startEmailLogin} from '../actions/auth';
import LoginModal from './LoginModal';

export class LoginPage extends React.Component{
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
      <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">My Blog</h1>
        <p>Tag line for app.</p>
        <button className="button" onClick={this.props.startLogin} >
          <i className="fa fa-google" aria-hidden="true">
                <span className="box-layout_span">Login with Google</span>
            </i>
          </button>
         
        <button className="button box-layout_button" onClick={this.props.startFacebookLogin}>
            <i className="fa fa-facebook-square" aria-hidden="true">
                <span className="box-layout_span">Login with Facebook</span>
            </i></button>
        <button className="button" onClick={this.handleOpenLoginModal}>
             <i className="fa fa-envelope" aria-hidden="true">
                <span className="box-layout_span"> Login with Email / Password</span>
            </i>
         </button>
      </div>
      <LoginModal loginpopup={this.state.loginPrompt} handleCloseModal={this.handleCloseLoginModal} />
    </div>
    );
  }
}

const mapDispatchToProps =(dispatch) =>({
    startLogin :()=>dispatch(startLogin()),
    startFacebookLogin :()=>dispatch(startFacebookLogin())
});

export default connect(undefined,mapDispatchToProps)(LoginPage);