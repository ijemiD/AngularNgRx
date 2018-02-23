import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as AuthActions from './store/auth.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect() authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignupAction) => {
       return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }).switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
       return [{
         type: AuthActions.SIGN_UP
       },
      {
        type: AuthActions.SET_TOKEN,
        payload: token
      }];
    });

  constructor(private actions$: Actions) {

  }
}
