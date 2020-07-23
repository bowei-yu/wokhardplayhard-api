import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import RecipeSkeleton from '../util/RecipeSkeleton';

import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class liked extends Component {
    
    componentDidMount() {
        this.props.getRecipes();
    };

    render() {

        const { recipes, loading } = this.props.data;

        let recentRecipesMarkup = !loading ? (
            recipes.filter(recipe => this.props.user.likes.find(like => like.recipeId === recipe.recipeId)).map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe}/>)) 
            : (<RecipeSkeleton/>);
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    {!this.props.user.authenticated ? <span> No liked recipes found. Please login to view recipes, or click on the home page. </span> : recentRecipesMarkup}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <Profile/>
                 </Grid>
            </Grid>
        );
    };
};

liked.propTypes = {
    getRecipes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps, {getRecipes})(liked);
