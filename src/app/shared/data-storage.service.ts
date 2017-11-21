import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-b67bb.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://ng-recipe-book-b67bb.firebaseio.com/recipes.json')
        .map((recipes: Recipe[]) => {
            for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                    console.log(recipe);
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
