import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from '../../auth/store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as RecipeActions from '../../recipes/store/recipe.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }
  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
