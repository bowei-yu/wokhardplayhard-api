import { SET_RECIPES, LOADING_DATA, LIKE_RECIPE, UNLIKE_RECIPE } from '../types';
import axios from 'axios';

// get all recipes
export const getRecipes = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/recipes')
    .then(res => {
        dispatch({
            type: SET_RECIPES,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: SET_RECIPES,
            payload: []
        });
    });
};

// like a recipe
export const likeRecipe = (recipeId) => dispatch => {
    axios.get(`/recipe/${recipeId}/like`)
    .then(res => {
        dispatch({
            type: LIKE_RECIPE,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
};

// unlike a recipe
export const unlikeRecipe = (recipeId) => dispatch => {
    axios.get(`/recipe/${recipeId}/unlike`)
    .then(res => {
        dispatch({
            type: UNLIKE_RECIPE,
            payload: res.data
        });
    })
    .catch(err => console.log(err));
};
