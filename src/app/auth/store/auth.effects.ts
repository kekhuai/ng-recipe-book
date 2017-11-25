import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => action.payload)
    .switchMap((authData: { username: string; password: string }) =>
      fromPromise(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.username, authData.password)
      )
    )
    .switchMap(() => fromPromise(firebase.auth().currentUser.getIdToken()))
    .mergeMap((token: string) => [
      {
        type: AuthActions.SIGNUP
      },
      {
        type: AuthActions.SET_TOKEN,
        payload: token
      }
    ]);

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignin) => action.payload)
    .switchMap((authData: { username: string; password: string }) =>
      fromPromise(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.username, authData.password)
      )
    )
    .switchMap(() => firebase.auth().currentUser.getIdToken())
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect({ dispatch: false })
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => this.router.navigate(['/']));

  constructor(private actions$: Actions, private router: Router) {}
}
