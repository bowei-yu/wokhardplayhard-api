import React, { Component} from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import RecipeSkeleton from '../util/RecipeSkeleton';
import Recipe from '../components/recipe/Recipe';
import Profile from '../components/profile/Profile';

import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions/dataActions';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis,
    input: {
        width: '99%',
        height: '56px',
        textAlign: 'center'
    }
});

class search extends Component {
    
    state = {
        search: ''
    };

    componentDidMount() {
        this.props.getRecipes();
    };

    updateSearch = (event) => {
        this.setState({search: event.target.value});
    };

    render() {

        const { classes } = this.props;
        const { recipes, loading } = this.props.data;

        const filterRecipes = (query, recipes) => {
            
            if (query.charAt(query.length - 1) === ' ') {
                query = query.substring(0, query.length - 1);
            }
            const querywords = query.toLowerCase().split(' ');
            let current = '';
            let currentUser = '';
            let filteredRecipes = [];
            for (let r = 0; r < recipes.length; r++) {
                current = recipes[r].body.toLowerCase();
                currentUser = recipes[r].userHandle.toLowerCase();
                for (let q = 0; q < querywords.length; q++) {
                    if ((current.indexOf(querywords[q]) > -1 || currentUser.indexOf(querywords[q]) > -1)
                    && !filteredRecipes.includes(recipes[r])) {
                        filteredRecipes.push(recipes[r]);
                    }
                }
            }
            return filteredRecipes;
        };

        let filteredRecipes = filterRecipes(this.state.search, recipes);
        let recentRecipesMarkup = !loading ? (
            filteredRecipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe}/>)) 
            : (<RecipeSkeleton/>);

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    <hr/>
                    <input type="text" 
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    className={classes.input}
                    placeholder="Type your search for recipe name, ingredients and users here:"/>
                    <hr/>
                    {recentRecipesMarkup}
                </Grid>
                <Grid item sm={4} xs ={12}>
                    <Profile/>
                 </Grid>
            </Grid>
        );
    };
};

search.propTypes = {
    getRecipes: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getRecipes})(withStyles(styles)(search));
