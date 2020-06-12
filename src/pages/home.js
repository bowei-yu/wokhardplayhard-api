import React, { Component } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Recipe from '../components/Recipe';

class home extends Component {
    state = {
        recipes: null
    };
    componentDidMount() {
        axios.get('/recipes')
        .then(res => {
            this.setState({
                recipes: res.data
            });
        })
        .catch(err => console.log(err));
    }
    render() {
        let recentRecipesMarkup = this.state.recipes ? (
            this.state.recipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe}/>)) 
            : (<p> Loading... </p>);
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    {recentRecipesMarkup}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <p> Profile...</p>
                 </Grid>
            </Grid>
        );
    };
};

export default home;
