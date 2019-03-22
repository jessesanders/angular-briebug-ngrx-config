import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, mergeMap, map, tap } from "rxjs/operators";

import { AuthService } from "../../core/services/auth.service";
import { User } from "../../core/models/user";
import { AppState } from "../app.interfaces";
import {
  AuthActionType,
  Login,
  LoginFailure,
  LoginSuccess
} from "./auth.actions";

@Injectable()
export class AuthEffects {
  @Effect()
  login = this.actions.pipe(
    ofType(AuthActionType.Login),
    mergeMap(() =>
      this.authService.login().pipe(
        map((claims: any) => new LoginSuccess({ claims: claims })),
        catchError(err => of(new LoginFailure()))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess = this.actions.pipe(
    ofType(AuthActionType.LoginSuccess),
    tap(() => {
      this.router.navigate(["/home"]);
    })
  );

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
