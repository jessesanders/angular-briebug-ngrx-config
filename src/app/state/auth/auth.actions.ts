import { Credentials } from '../../core/models/credentials';
import { Action } from '@ngrx/store';

export enum AuthActionType {
  Login = '[Auth] Login',
  LoginFailure = '[Auth] Login Failure',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout'
}

export class Login implements Action {
  readonly type = AuthActionType.Login;

  constructor(public payload: { credentials: Credentials }) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionType.LoginSuccess;

  constructor(public payload: { claims: any }) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionType.LoginFailure;
}

export class Logout implements Action {
  readonly type = AuthActionType.Logout;
}

export type AuthActions = Login | LoginSuccess | LoginFailure | Logout;
