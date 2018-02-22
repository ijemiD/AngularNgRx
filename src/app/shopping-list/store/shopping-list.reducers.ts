import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store'
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients : [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
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
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updIngredient = {
          ...ingredient,
          ...action.payload.ingredient
        };
        const ingredients = [...state.ingredients];
        ingredients[state.editedIngredientIndex] = updIngredient;
        return { ...state, Ingredients: ingredients, editedIngredient: null, editedIngredientIndex: -1 };

      case ShoppingListActions.DELETE_INGREDIENT:
          const oldIngredients = [...state.ingredients];
          oldIngredients.splice(state.editedIngredientIndex, 0);
          return { ...state, Ingredients: oldIngredients, editedIngredient: null, editedIngredientIndex: -1  };

      case ShoppingListActions.START_EDIT:
      const editedIngr = {...state.ingredients[action.payload]};
          return {
            ...state,
            editedIngredient: editedIngr,
            editedIngredientIndex: action.payload
          };

      case ShoppingListActions.STOP_EDIT:
              return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
              };

       default:
         return state;
   }
}
