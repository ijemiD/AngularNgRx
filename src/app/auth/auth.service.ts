import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as authActions from './store/auth.actions';
import * as fromAuth from './store/auth-reducers';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(
       obj => {
         this.store.dispatch(new authActions.SignUpAction());
         firebase.auth().currentUser.getToken()
         .then(
           (token: string) => {
             this.store.dispatch(new authActions.SetTokenAction(token));
           }
         )
       }
    )
    .catch( error => console.log(error) );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.store.dispatch(new authActions.SignInAction());
          this.router.navigate(['/']);
          firebase.auth().currentUser.getToken()
            .then(
              (token: string) => {
                this.store.dispatch(new authActions.SetTokenAction(token));
              }
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new authActions.LogOutAction());
  }
}
