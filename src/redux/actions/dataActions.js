import { SET_RECIPES, LOADING_DATA, LIKE_RECIPE, UNLIKE_RECIPE, DELETE_RECIPE, SET_ERRORS, POST_RECIPE , CLEAR_ERRORS, LOADING_UI } from '../types';
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

// post a recipe
export const postRecipe = (newRecipe) => (dispatch) => {
    dispatch({ type: LOADING_UI});
    axios.post('/recipe', newRecipe)
    .then(res => {
        dispatch({
            type: POST_RECIPE,
            payload: res.data
        });
        dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
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

// delete recipe
export const deleteRecipe = (recipeId) => (dispatch) => {
    axios.delete(`/recipe/${recipeId}`)
    .then(() => {
        dispatch({ type: DELETE_RECIPE, payload: recipeId})
    })
    .catch(err => console.log(err));
};
