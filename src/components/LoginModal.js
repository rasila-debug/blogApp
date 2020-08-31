import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import {startLogin,startFacebookLogin,startEmailLogin,startEmailSignUp} from '../actions/auth';

export class LoginModal extends React.Component{
   state={
       mode:'SIGNIN',
       error:'',
       toggleDiv:false
   }
   onModeChange =(e)=>{
       const mode = e.target.value
       this.setState({mode})
       this.setState({error: ''})
    
   }
   onEmailSubmit = (e) =>{
    this.setState({error: ''})
       e.preventDefault();     
       const email = e.target.email.value;
       const password = e.target.password.value;     
       if(this.state.mode === 'SIGNIN'){          
          startEmailLogin(email,password).then((user)=>{
            if(user.emailVerified === false){
                this.setState({error: 'Email address is not verified. please verify your email address.'})
              }
              else{
                this.setState({error: ''})
                this.props.handleCloseModal();
              }
          }).catch((error)=>{
                let errorCode = error.code;
                let errorMessage = error.message;      
                if(errorCode === 'auth/user-not-found'){
                    this.setState({error :'Email address not register.Create an account or try again'})
                }else if(errorCode === 'auth/wrong-password'){
                    this.setState({error :'Enter the wrong password.Try again.'})
                }else if (errorCode === 'auth/too-many-requests'){ 
                   this.setState({error: 'You have attempted to login too many times. Try again later.'})
                }else if (errorCode === 'auth/invalid-email') {
                    this.setState({error: 'Enter a valid email address.'})
                }else {                   
                    this.setState({error: errorMessage})
                }                    
            })
                   
       }
       else if(this.state.mode === 'CREATE'){   
           startEmailSignUp(email,password).then((user)=>{
              window.alert('Verification email send to your email address.');
              this.setState({error: ''})
              this.props.handleCloseModal();
           }).catch((e)=>{
                    this.setState({error : e.message})
            })
      
       }
       e.target.email.value="";
       e.target.password.value="";     
   }
onGoogleLogin =()=>{
    this.props.startLogin().then((res)=>{
        !!res?this.props.handleCloseModal():'';
    })     
   
}
onFacebooklogin = ()=>{
    this.props.startFacebookLogin().then((res)=>{
        !!res?this.props.handleCloseModal():'';
    })      
}
 render(){
        return(
            <Modal
            isOpen={!!this.props.loginpopup}
            onRequestClose={this.props.handleCloseModal}
            contentLabel="Email Sign up"
            closeTimeoutMS={200}
            className='modal'
            appElement={app}
           >
            <div className="modal__header">
                 <div className="logo">  </div>
                 <button className="modal__cross_btn" onClick={this.props.handleCloseModal}>X</button>
             </div>
            <div className="box-layout__box">
                <button className="modal_button" onClick={this.onGoogleLogin} >
                    <i className="google_logo" aria-hidden="true"></i>
                    <span className="box-layout_span">Sign in with Google</span>
                </button>
                <button className="modal_button" onClick={this.onFacebooklogin}>
                     <i className="facebook_logo" aria-hidden="true"> </i>
                    <span className="box-layout_span">Sign in with Facebook</span>
                </button>
            <div className="modal__body">
            <h3 className='modal__title'>SignIn or SignUp </h3> 
            {this.state.error !=='' ?<p className="modal__form-error">{this.state.error}</p>:''}
               
                    <select className="modal__select" onChange={this.onModeChange}>
                        <option value='SIGNIN'>SignIn</option>
                        <option value='CREATE'>Create an account</option>
                    </select>
                    <form className="form" onSubmit={this.onEmailSubmit}>
                    <input className='modal__input' type='email' id='email' 
                            placeholder='you@example.com' required
                            />
                            <input className='modal__input' type='password' id='password' 
                                placeholder='Password' 
                                minLength='6' 
                                required
                                    />
                       
                        <button className='modal_button'>Login</button>
                       
                    </form>
            </div>
                
            </div>
        </Modal>
        
        );
        
    }
}
const mapDispatchToProps =(dispatch) =>({
    startLogin :()=>dispatch(startLogin()),
    startFacebookLogin :()=>dispatch(startFacebookLogin()),
  
});
export default connect(undefined,mapDispatchToProps)(LoginModal);