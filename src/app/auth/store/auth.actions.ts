import { Action } from '@ngrx/store';

export const SIGN_IN = 'SIGNIN';
export const SIGN_UP = 'SIGNUP';
export const LOG_OUT = 'LOGOUT';
export const SET_TOKEN = 'SETTOKEN';

export class SignInAction implements Action {
         readonly type = SIGN_IN;
       }

export class SignUpAction implements Action {
         readonly type = SIGN_UP;
       }

export class LogOutAction implements Action {
         readonly type = LOG_OUT;
       }

export class SetTokenAction implements Action {
         readonly type = SET_TOKEN;

         constructor(public payload: string) {}
       }

export type AuthActions =
SetTokenAction |
LogOutAction |
SignUpAction |
SignInAction;
