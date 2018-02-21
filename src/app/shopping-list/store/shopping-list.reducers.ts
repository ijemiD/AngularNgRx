import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store'
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients : [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
};

export function shoppingListReducer(state= initialState, action: ShoppingListActions.ShoppingListActions) {
   switch (action.type) {
     case ShoppingListActions.ADD_INGREDIENT :
       return {
         ...state,
         ingredients: [...state.ingredients, action.payload]
       };

     case ShoppingListActions.ADD_INGREDIENTS :
        return {
          ...state,
          ingredients: [...state.ingredients, ...action.payload]
        };

     case ShoppingListActions.UPDATE_INGREDIENTS:
        const ingredient = state.ingredients[action.payload.index];
        const updIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        };
        const ingredients = [...state.ingredients];
        ingredients[action.payload.index] = updIngredient;
        return { ...state, Ingredients: ingredients };

      case ShoppingListActions.DELETE_INGREDIENT:
          const oldIngredients = [...state.ingredients];
          oldIngredients.splice(action.payload, 0);
          return { ...state, Ingredients: oldIngredients };

       default:
         return state;
   }
}
