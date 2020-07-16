import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import RecipeSkeleton from '../util/RecipeSkeleton';

import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

class recent extends Component {
    
    componentDidMount() {
        this.props.getRecipes();
    };

    render() {

        const { recipes, loading } = this.props.data;

        let recentRecipesMarkup = !loading ? (
            recipes.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe}/>))
            : (<RecipeSkeleton/>);
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    {recentRecipesMarkup}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <Profile/>
                 </Grid>
            </Grid>
        );
    };
};

recent.propTypes = {
    getRecipes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getRecipes})(recent);
