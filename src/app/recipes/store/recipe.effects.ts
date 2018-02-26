import { Injectable } from '@angular/core';
import { Recipe } from './../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import * as RecipesAction from './recipe.actions';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
 @Effect()
 recipeFetch = this.actions$
                .ofType(RecipesAction.FETCH_RECIPES)
                .switchMap((action: RecipesAction.FetchRecipesAction) => {
                  return this.httpClient
                  .get<Recipe[]>(
                  'https://ng-recipe-book-76f55.firebaseio.com/recipes.json',
                    {
                      observe: 'body',
                      responseType: 'json'
                    }
                  )
                })
                .map(recipes => {
                  console.log(recipes);
                  for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                      recipe['ingredients'] = [];
                    }
                  }
                  return {
                    type: RecipesAction.SET_RECIPES,
                    payload: recipes
                  }
                });

  @Effect({dispatch: false})
  recipeStore = this.actions$
  .ofType(RecipesAction.STORE_RECIPES)
  .withLatestFrom(this.store.select('recipes'))
  .switchMap(([action, state]) => {
    const req = new HttpRequest(
      'PUT',
      'https://ng-recipe-book-76f55.firebaseio.com//recipes.json',
      state.recipes,
      { reportProgress: true }
    );
    return this.httpClient.request(req);
  });


 constructor(private actions$: Actions,
             private httpClient: HttpClient,
             private store: Store<fromRecipe.FeatureState>) {}
}
