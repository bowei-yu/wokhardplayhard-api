import { SET_RECIPES, LIKE_RECIPE, UNLIKE_RECIPE, LOADING_DATA } from '../types';

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
        default:
            return state;
    };
};