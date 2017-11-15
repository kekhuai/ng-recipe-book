import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeSercice: RecipeService) {
    this.recipes = recipeSercice.getRecipes();
  }

  ngOnInit() {
  }

}
