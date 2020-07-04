import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// redux stuff
import { connect } from 'react-redux';
import { submitRating, getRecipe } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    rate: {
        marginRight: 10,
        marginBottom: -10
    }
});

class RateDifficulty extends Component {
    
    state = {
        body: '5',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors});
        };
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: ''});
        };
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitRating(this.props.recipeId, { body: parseInt(this.state.body) });
        this.props.getRecipe(this.props.recipeId); // added to update recipe rating
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;
        const ratingFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                    style={{width: 190}}
                    name="body"
                    type="number"
                    label="Rate difficulty from 1 - 10"
                    inputProps={{ min: 1, max: 10}}
                    error={errors.rating ? true: false}
                    helperText={errors.rating}
                    value={this.state.body}
                    onChange={this.handleChange}
                    className={classes.rate}/>
                    <Button 
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}>
                        Rate
                    </Button>
                </form>
            </Grid>
        ) : null;
        return ratingFormMarkup;
    };
};

RateDifficulty.propTypes = {
    submitRating: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    recipeId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, {submitRating, getRecipe})(withStyles(styles)(RateDifficulty));
