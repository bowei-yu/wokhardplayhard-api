import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

// icons
import AddIcon from '@material-ui/icons/Add';
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
import { postRecipe, clearErrors } from '../../redux/actions/dataActions';

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
        top: '3%'
    }
});

class PostRecipe extends Component {

    state = {
        open: false,
        title: '',
        cookTime: '',
        ingredients: '',
        isRecipe: true,
        videoLink: '',
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };

        if (! nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', title: '', ingredients: '', cookTime: '', videoLink: '', open: false, errors: {}});
        };
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {}})
    };

    handleFormType = () => {
        this.setState({ isRecipe: !this.state.isRecipe })
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]:event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postRecipe({ title: this.state.title, cookTime: this.state.cookTime, ingredients: this.state.ingredients, body: this.state.body, videoLink: this.state.videoLink });
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        const formTitle = this.state.isRecipe
            ? (<DialogTitle>Share your recipe here: </DialogTitle>)
            : (<DialogTitle>Share your cooking experiences or questions here: </DialogTitle>);
        const formToReturn = this.state.isRecipe
            ? (<DialogContent>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="title"
                    type="text"
                    label="Name of Recipe"
                    error={errors.title ? true : false }
                    helperText={errors.title}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="videoLink"
                    type="text"
                    label="Valid link to online video (if any)"
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="cookTime"
                    type="text"
                    label="Estimated Cooking Time"
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="ingredients"
                    type="text"
                    label="List of Ingredients with quantity (do state clearly possible add-ons and substitutes)"
                    multiline
                    rows="15"
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="body"
                    type="text"
                    label="Directions for Recipe"
                    multiline
                    rows="15"
                    error={errors.body ? true : false }
                    helperText={errors.body}
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
            </DialogContent>)
            : (<DialogContent>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="title"
                    type="text"
                    label="Title"
                    error={errors.title ? true : false }
                    helperText={errors.title}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="videoLink"
                    type="text"
                    label="Valid link to online video (if any)"
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <TextField
                    name="body"
                    type="text"
                    label="Description"
                    multiline
                    rows="10"
                    error={errors.body ? true : false }
                    helperText={errors.body}
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
            </DialogContent>);
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Create a new post (+50 EXP)">
                    <AddIcon />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    {formTitle}
                    <Button variant="outlined" color="primary" onClick={this.handleFormType}>
                        Change post type
                    </Button>
                        {formToReturn}
                </Dialog>
            </Fragment>
        )
    };
};

PostRecipe.propTypes = {
    postRecipe: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postRecipe, clearErrors })(withStyles(styles)(PostRecipe));