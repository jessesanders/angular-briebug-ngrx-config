import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { of } from "rxjs";

@Injectable({
  providedIn: CoreModule,
})
export class AuthService {
  login() {
    return of({});
  }
}