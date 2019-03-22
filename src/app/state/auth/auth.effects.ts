import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, mergeMap, map, tap } from 'rxjs/operators';

import { User } from '../../core/models/user';
import { AppState } from '../app.reducer';
import {
  AuthActionType,
  Login,
  LoginFailure,
  LoginSuccess
} from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login = this.actions
    .pipe(
      ofType(AuthActionType.Login),
  mergeMap(() => this.authService.login()
  .pipe(
    map((claims: any) => new Login({ claims: claims })),
    catchError(err => of(new LoginFailure()))
  ))
     
  )
};

  @Effect({
    dispatch: false
  })
  loginSuccess = this.actions.pipe(
    ofType(AuthActionType.LoginSuccess),
    tap(() => {
      this.router.navigate(['/home']);
    })
  );

  @Effect({
    dispatch: false
  })
  logout = this.actions.pipe(
    ofType(AuthActionType.Logout),
    tap(() => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(AUTH);
    })
  );

  @Effect()
  register = this.actions.pipe(
    ofType(AuthActionType.Register),
    map((action: Register) => action.payload),
    exhaustMap(payload => {
      return this.authService
        .register(payload.user)
        .pipe(
          map(
            () => new RegisterSuccess({ user: payload.user }),
            catchError((error: Error) => of(new RegisterFailure({ error })))
          )
        );
    })
  );

  @Effect()
  registerSuccess = this.actions.pipe(
    ofType(AuthActionType.RegisterSuccess),
    map((action: RegisterSuccess) => action.payload),
    map(payload => new Login({ credentials: { phone: payload.user.phone, password: payload.user.password } })),
    catchError(error => of(new LoginFailure({ error })))
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private store: Store<AppState>
  ) {}
}