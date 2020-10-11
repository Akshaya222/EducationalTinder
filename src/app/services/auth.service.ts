import { Injectable } from '@angular/core';
import {User} from '../shared/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   userData:Observable<User>;  //to save logged in user data
   currentUser:User=null;
  constructor(public angularfireauth:AngularFireAuth,public angularfirestore:AngularFirestore,
    public router:Router) {
       /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.userData=this.angularfireauth.authState;
    this.userData.subscribe(user=>{
      if(user){
        this.currentUser=user
        localStorage.setItem('user',JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('user'));
        console.log(this.currentUser.email);
      }else{
        localStorage.setItem('user','null');
        JSON.parse(localStorage.getItem('user'));
      }
    })
}
getCurrentUser(){
  return this.userData;
}
   // Sign in with email/password
  async SignIn(email:string,password:string){
    await this.angularfireauth.signInWithEmailAndPassword(email,password).then((result)=>{
        console.log('user:',result);
        this.SetUserData(result.user);
        this.router.navigate(['home']);
    }).catch((error)=>{
      window.alert(error.message);
    })
  }
  //sign up with email and password
  async SignUp(email:string,password:string){
    await this.angularfireauth.createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log('user:',result);
       /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
      this.router.navigate(['login']);

    }).catch((error)=>{
      window.alert(error.message);
    })
  }
  Signout(){
    this.angularfireauth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
}
//This function returns the boolean result to true when the user is logged-in. If user is
//not found then it will return false and doesn’t allow users to access the desired pages.
 LoggedIn():boolean{
  const user=JSON.parse(localStorage.getItem('user'));
  if(user!==null && user.emailVerified!==false){
    return true;
  }else{
    return false;
  }
}
// Sign in with Google
GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider());
}
// Auth logic to run auth providers
AuthLogin(provider) {
  return this.angularfireauth.signInWithPopup(provider).then((result)=>{
    this.router.navigate(['home']);
    this.SetUserData(result.user);
  })
  .catch((error) => {
    window.alert(error)
  })
}
 // Send email verfificaiton when new user sign up
 SendVerificationMail() {
   return this.angularfireauth.onAuthStateChanged((user)=>{
    user.sendEmailVerification().then(()=>{
      this.router.navigate(['verify-email']);
    })
     });
}
/* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.angularfirestore.doc(`users/${user.uid}`);
    const currentUser: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(currentUser, {
      merge: true
    })
  }
  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this.angularfireauth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
}



