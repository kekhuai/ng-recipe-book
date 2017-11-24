import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    return this.http.put(
      'https://ng-recipe-book-b67bb.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-recipe-book-b67bb.firebaseio.com/recipes.json')
      .map((recipes: Recipe[]) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
