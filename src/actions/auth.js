import {firebase, googleAuthProvider,facebookAuthProvider} from '../firebase/firebase';

export const login=(uid,userName)=>({
    type:'LOGIN',
    uid,
    userName
});
export const startLogin =() =>{
    return() =>{        
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}
export const startFacebookLogin =()=>{
    return()=>{
        return firebase.auth().signInWithPopup(facebookAuthProvider);
    }
}
export const startEmailLogin =(email,password)=>{    
    return firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        return firebase.auth().currentUser;
    });
}

export const startEmailSignUp =(email,password) =>{   
    return firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
        const user = firebase.auth().currentUser;       
       user.sendEmailVerification();      
       return user.email;
    })
  
}
export const logout =() =>({
    type :'LOGOUT'
})
export const startLogout = () =>{
    return() =>{
        return firebase.auth().signOut();
    }
}