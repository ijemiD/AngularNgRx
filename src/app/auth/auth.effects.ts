import { Router } from '@angular/router';
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

  @Effect()
  authSignin = this.actions$
                  .ofType(AuthActions.TRY_SIGNIN)
                  .map((action: AuthActions.TrySigninAction) => {
                    return action.payload;
                  })
                  .switchMap((authData: {username: string, password: string}) => {
                    return fromPromise( firebase.auth()
                          .signInWithEmailAndPassword(authData.username, authData.password));
                  })
                  .switchMap(() => {
                    return fromPromise(firebase.auth().currentUser.getIdToken());
                  })
                  .mergeMap((token: string) => {
                    this.router.navigate(['/']);
                     return [{
                       type: AuthActions.SIGN_IN
                     },
                    {
                      type: AuthActions.SET_TOKEN,
                      payload: token
                    }];
                  });

  @Effect({dispatch: false})
  authLogout = this.actions$.ofType(AuthActions.LOG_OUT)
                   .do(() => {
                      this.router.navigate(['/']);
                    });


  constructor(private actions$: Actions, private router: Router) {}
}
