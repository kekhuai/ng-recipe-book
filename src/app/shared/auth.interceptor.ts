import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import {
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../auth/store/auth.reducers';
import * as fromApp from '../store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    return this.store
      .select('auth')
      .take(1)
      .switchMap((authState: fromAuth.State) => {
        const copiedReq = req.clone({
          params: req.params.set('auth', authState.token)
        });
        return next.handle(copiedReq);
      });
  }
}
