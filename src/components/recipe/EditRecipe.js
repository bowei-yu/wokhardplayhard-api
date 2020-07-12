import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux stuff
import { connect } from 'react-redux';
import { editRecipe, clearErrors, getRecipes } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    editButton: {
        position: 'absolute',
        left: '85%',
        top:'1%'
    }
});

class EditRecipe extends Component {

    state = {
        open: false,
        title: this.props.recipe.title,
        cookTime: this.props.recipe.cookTime,
        ingredients: this.props.recipe.ingredients,
        body: this.props.recipe.body,
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };

        if (! nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: this.props.recipe.body, open: false, errors: {}});
        };
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {}})
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const editedRecipe = this.props.recipe;
        editedRecipe.title = this.state.title;
        editedRecipe.cookTime = this.state.cookTime;
        editedRecipe.ingredients = this.state.ingredients;
        editedRecipe.body = this.state.body;
        this.props.editRecipe(editedRecipe, this.props.recipe.recipeId);
        this.props.getRecipes();
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Edit post" tipClassName= {classes.editButton}>
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Share your recipe, questions or cooking experience here: </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            name="title"
                            type="text"
                            label="Edit Title / Recipe Name"
                            defaultValue={this.props.recipe.title}
                            error={errors.title ? true : false }
                            helperText={errors.title}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <TextField
                            name="body"
                            type="text"
                            label="Edit Description / Directions"
                            multiline
                            rows="15"
                            defaultValue={this.props.recipe.body}
                            error={errors.body ? true : false }
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <TextField
                            name="cookTime"
                            type="text"
                            label="Edit estimated cooking time"
                            defaultValue={this.props.recipe.cookTime}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <TextField
                            name="ingredients"
                            type="text"
                            label="Edit ingredients"
                            multiline
                            rows="15"
                            defaultValue={this.props.recipe.ingredients}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    };
};

EditRecipe.propTypes = {
    editRecipe: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getRecipes: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { editRecipe, clearErrors, getRecipes })(withStyles(styles)(EditRecipe));