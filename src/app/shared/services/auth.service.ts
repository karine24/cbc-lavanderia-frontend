import { Injectable,NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  UserData : any;
  constructor(private auth: Auth,private router : Router, public ngZone: NgZone) {
    onAuthStateChanged(this.auth,(user: any)=>{
      if(user){
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  //get User
    //get Authenticated user from firebase
    getAuthFire(){
      return this.auth.currentUser;
    }


    //get Authenticated user from Local Storage
    getAuthLocal(){
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user;
    }


    //Check wither User Is looged in or not
    get isLoggedIn(): boolean {
      const token = localStorage.getItem('user')
      const user = JSON.parse(token as string);
      return user !== null ? true : false;
    }


    //Register Method
    Register(email : string, password : string) {
      return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          this.sendEmailVerification()
          this.router.navigate(['/internal']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }


    //Login Method
    login(email : string, password : string){
      return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/internal']);
        });
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case "auth/invalid-login-credentials":
            window.alert("Credenciais inválidas!");
            break;
          default:
            window.alert("Erro ao realizar login!");
        }
      });
    }


   //Logout
    Logout() {
      signOut(this.auth).then(()=>this.router.navigate(['/sign-in']))


    }


  //login with Email or Facebook
    //Login with Google
    GoogleAuth() {
      return this.loginWithPopup(new GoogleAuthProvider());
    }


    //Pop Up Provider
    loginWithPopup(provider :any) {
      return signInWithPopup(this.auth,provider).then(() => {
        this.router.navigate(['internal']);
      });
    }


    //Send Password Reset Email
    async sendPasswordResetEmails(email : string) {
      sendPasswordResetEmail(this.auth,email)
      .then(() => {
          window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
    }

    //Send Email Verification
    sendEmailVerification(){
      return sendEmailVerification(this.auth.currentUser as User );
    }
}