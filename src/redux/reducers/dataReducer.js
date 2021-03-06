import { SET_RECIPES, LIKE_RECIPE, UNLIKE_RECIPE, LOADING_DATA, DELETE_RECIPE, POST_RECIPE, SET_RECIPE, SUBMIT_COMMENT, SUBMIT_RATING, DELETE_COMMENT, EDIT_RECIPE} from '../types';

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
        case SET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };
        case LIKE_RECIPE:
        case UNLIKE_RECIPE:
            let index = state.recipes.findIndex((recipe) => 
                recipe.recipeId === action.payload.recipeId);
            state.recipes[index] = action.payload;
            if (state.recipe.recipeId === action.payload.recipeId) {
                state.recipe = action.payload;
            }
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
        case DELETE_COMMENT:
            let index3 = state.recipe.comments.findIndex(comment => comment.commentId === action.payload);
            state.recipe.comments.splice(index3, 1);
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    comments: [...state.recipe.comments]
                }
            };
        case POST_RECIPE:
            return {
                ...state,
                recipes: [
                    action.payload,
                    ...state.recipes
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    comments: [action.payload, ...state.recipe.comments]
                }
            };
        case SUBMIT_RATING:
            return {
                ...state,
                recipe: {
                    ...state.recipe,
                    difficulty: [action.payload, ...state.recipe.difficulty]
                }
            };
        case EDIT_RECIPE:
            let index4 = state.recipes.findIndex(recipe => recipe.recipeId === action.payload.recipeId);
            state.recipes.splice(index4, 1);
            return {
                ...state,
                recipes: [
                    action.payload,
                    ...state.recipes
                ]
            };
        default:
            return state;
    };
};