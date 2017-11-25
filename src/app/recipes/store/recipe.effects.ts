import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(
        'https://ng-recipe-book-b67bb.firebaseio.com/recipes.json'
      );
    })
    .map((recipes: Recipe[]) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    });

  @Effect({ dispatch: false })
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      return this.httpClient.put(
        'https://ng-recipe-book-b67bb.firebaseio.com/recipes.json',
        state.recipes
      );
    });
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>
  ) {}
}
