import * as AuthActions from './auth.actions';

export interface AppState {
  credentials: State
}

export interface State {
  // username: string;
  // password: string;
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  // username: '',
  // password: '',
  authenticated: false,
  token: ''
}

export function authReducer(state= initialState, action: AuthActions.AuthActions) {

   switch (action.type) {
    case AuthActions.SIGN_IN:
    case AuthActions.SIGN_UP:
      return {
          ...state,
          authenticated: true
      };
    case AuthActions.LOG_OUT:
      return {
       ...state,
       authenticated: false
      };
    default: return state;
  }

}
