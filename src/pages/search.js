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
        height: '56px'
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
        let filteredRecipes = recipes.filter(
            (recipe) => {
                return (recipe.body.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                || (recipe.userHandle.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
            }
        );
        let recentRecipesMarkup = !loading ? (
            filteredRecipes.map((recipe) => <Recipe key={recipe.recipeId} recipe={recipe}/>)) 
            : (<RecipeSkeleton/>);

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs ={12}>
                    <input type="text" 
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    className={classes.input}
                    placeholder="  Search for recipes or users through keywords here"/>
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
