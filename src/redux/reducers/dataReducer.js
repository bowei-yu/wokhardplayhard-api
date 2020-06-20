import { SET_RECIPES, LIKE_RECIPE, UNLIKE_RECIPE, LOADING_DATA, DELETE_RECIPE } from '../types';

const initialState = {
    recipes: [],
    recipe: {},
    loading: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            };
        case SET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        case LIKE_RECIPE:
        case UNLIKE_RECIPE:
            let index = state.recipes.findIndex((recipe) => 
                recipe.recipeId === action.payload.recipeId);
            state.recipes[index] = action.payload;
            return {
                ...state
            };
        case DELETE_RECIPE:
            // put index2 here because its a react thing
            let index2 = state.recipes.findIndex(recipe => recipe.recipeId === action.payload);
            state.recipes.splice(index2, 1);
            return {
                ...state
            };
        default:
            return state;
    };
};