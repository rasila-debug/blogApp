import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';
import setError from '../selectors/error';
import {startLogin,startFacebookLogin,startEmailLogin,startEmailSignUp} from '../actions/auth';

Modal.setAppElement('#app')
export class LoginModal extends React.Component{
   
   state={
       mode:'SIGNIN',
       error:'',
       alert:undefined
     
   }
  
   openAlertModal=()=>{
    this.setState({alert:true});
  }
  closeAlertModal=()=>{
    this.setState({alert:undefined})
  }
  clearError=()=>{
    this.setState({error: ''})
  }
   onModeChange =(e)=>{
       const mode = e.target.value
       this.setState({mode})
       this.clearError();    
   }
   onEmailSubmit = (e) =>{   
       e.preventDefault();     
       const email = e.target.email.value;
       const password = e.target.password.value;     
       if(this.state.mode === 'SIGNIN'){          
          startEmailLogin(email,password).then((user)=>{            
              if(user){
                if(user.emailVerified === false){
                    this.setState({error: 'Email address is not verified. please verify your email address.'})
                  }
                  else{
                    this.clearError(); 
                    this.props.handleCloseLoginModal();
                  }
              }
            
          }).catch((e)=>{
                this.setState({error:setError(e)})
            })
           
       }
       else if(this.state.mode === 'CREATE'){   
           startEmailSignUp(email,password).then((user)=>{                        
              this.setState({error: '',email,mode:'SIGNIN'})
              this.openAlertModal();  
              this.props.handleCloseLoginModal();
           }).catch((e)=>{
                    this.setState({error : e.message})
            })
      
       }
       e.target.email.value="";
       e.target.password.value="";     
       this.clearError(); 
   }
onGoogleLogin =()=>{
    this.props.startLogin().then((res)=>{
        !!res?this.props.handleCloseLoginModal():'';
    }).catch((e)=>{
        this.setState({error:setError(e)})
    })
}
onFacebooklogin = ()=>{
    this.props.startFacebookLogin().then((res)=>{
        !!res?this.props.handleCloseLoginModal():'';
    }).catch((e)=>{
        this.setState({error:setError(e)})
    })   
}

 render(){
        return(
            <div>
           
            <Modal
            isOpen={!!this.props.loginpopup}
            onRequestClose={this.props.handleCloseLoginModal}
            contentLabel="Email Sign up"
            closeTimeoutMS={200}
            className='modal'           
           >
            <div className="modal__header">
                 <div className="logo">  </div>
                
                 <button className="modal__cross_btn" onClick={this.props.handleCloseLoginModal}>X</button>
             </div>
             <div className="modal__body">
            <div className="box-layout__box">
                <button className="modal_button" onClick={this.onGoogleLogin} >
                    <i className="google_logo" aria-hidden="true"></i>
                    <span className="box-layout_span">Sign in with Google</span>
                </button>
                <button className="modal_button" onClick={this.onFacebooklogin}>
                     <i className="facebook_logo" aria-hidden="true"> </i>
                    <span className="box-layout_span">Sign in with Facebook</span>
                </button>
              
                
           
            <h3 className='modal__title'>Sign in or Sign up with email</h3> 
            {this.state.error !=='' ?<p className="modal__form-error">{this.state.error}</p>:''}
               
                    <select className="modal__select" onChange={this.onModeChange}>
                        <option value='SIGNIN'>SignIn</option>
                        <option value='CREATE'>Create account</option>
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
                       
                        <button className='modal_button'>
                           
                            {this.state.mode === 'SIGNIN' ?'Continue':'Create account'}
                                
                            
                        </button>
                       
                    </form>
            </div>
                
            </div>
        </Modal>
        
            <Modal
                isOpen={!!this.state.alert}
                onRequestClose={this.closeAlertModal}
                contentLabel="Email Verification"
                closeTimeoutMS={200}
                className='alertModal'
                appElement={app}
                >
                     <div className="modal__header">
                     <button className="modal__cross_btn" onClick={this.closeAlertModal}>X</button> 
                    </div>        
                    <div className="modal__body">                           
                        <h4 className='modal__title'>Check your inbox</h4>
                        <span>Click the verification link we just sent</span>
                        <span>Email :{this.state.email}</span> 
                    </div>        
                          
               
                      
                       
                        
                        
                      
                        
                      
            </Modal>
        </div>
        );
        
    }
}
const mapDispatchToProps =(dispatch) =>({
    startLogin :()=>dispatch(startLogin()),
    startFacebookLogin :()=>dispatch(startFacebookLogin()),
  
});
export default connect(undefined,mapDispatchToProps)(LoginModal);