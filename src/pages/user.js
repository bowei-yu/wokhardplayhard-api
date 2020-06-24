import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Recipe from '../components/recipe/Recipe';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import RecipeSkeleton from '../util/RecipeSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {

    state = {
        profile: null,
        recipeIdParam: null
    };

    componentDidMount() {
        const handle = this.props.match.params.handle;
        const recipeId = this.props.match.params.recipeId;

        if (recipeId) {
            this.setState({ recipeIdParam: recipeId });
        };

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then(res => {
            this.setState({
                profile: res.data.user
            });
        })
        .catch(err => console.log(err));
    };

    render() {
        const { recipes, loading } = this.props.data;
        const { recipeIdParam } = this.state;

        const recipesMarkup = loading ? (
            <RecipeSkeleton/> 
        ) : recipes === null ? (
            <p> No recipes from this user </p>
        ) : !recipeIdParam ? (
            recipes.map(recipe => <Recipe key={recipe.recipeId} recipe={recipe}/>)
        ) : (
            recipes.map(recipe => {
                if (recipe.recipeId !== recipeIdParam) {
                    return <Recipe key={recipe.recipeId} recipe={recipe}/>
                } else {
                    return <Recipe key={recipe.recipeId} recipe={recipe} openDialog />
                }
            })
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    {recipesMarkup}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton/>
                    ) : (
                    <StaticProfile profile={this.state.profile} />
                    )}
                 </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, {getUserData})(user);
