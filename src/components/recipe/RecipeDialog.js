import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import RateDifficulty from './RateDifficulty';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// redux stuff
import { connect } from 'react-redux';
import { getRecipe, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,

    profileImage: {
        width: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '92%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
});

class RecipeDialog extends Component {

    state= {
        open: false,
        oldPath: '',
        newPath: ''
    };

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        };
    };

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, recipeId } = this.props;
        const newPath = `/users/${userHandle}/recipe/${recipeId}`;

        if (oldPath === newPath) {
            oldPath = `/users/${userHandle}`;
        }
        
        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getRecipe(this.props.recipeId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
        document.location.reload(); // added so as to update number of comments/difficulty rating
    };

    render() {

        const { classes, recipe: {recipeId, title, body, ingredients, cookTime, videoLink, createdAt, likeCount, commentCount, userImage, userHandle, comments, difficultyRating},
        UI: { loading } } = this.props;

        const recipeDirections = !ingredients ? null : <Typography variant="h6"> Directions </Typography>;
        const recipeIngredients = !ingredients ? null : <Typography variant="h6"> Ingredients </Typography>;
        const video = !videoLink || !ReactPlayer.canPlay(videoLink) ? null : <ReactPlayer url={videoLink}/>;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={10}>
                <Grid item xxxs={11}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} 
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                            {video}
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="h5" style={{whiteSpace: 'pre-line'}}>
                            {title}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                            {cookTime}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        {recipeIngredients}
                        <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                            {ingredients}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        {recipeDirections}
                        <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                            {body}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <LikeButton recipeId={recipeId}/>
                        <span>{likeCount <= 1 ? likeCount + ' Like' : likeCount + ' Likes'}</span>
                        <MyButton tip="Comments">
                            <ChatIcon color="primary"/>
                        </MyButton>
                        <span>{commentCount <= 1 ? commentCount + ' Comment' : commentCount + ' Comments'}</span>
                        <MyButton tip="Difficulty">
                            <LocalDiningIcon color="primary"/>
                        </MyButton>
                        <span>Difficulty Level: { difficultyRating === 0 ? " No ratings yet" : Math.ceil(difficultyRating)}</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <RateDifficulty recipeId={recipeId} />
                <hr className={classes.visibleSeparator} />
                <CommentForm recipeId={recipeId}/>
                <hr className={classes.visibleSeparator} />
                <Comments comments={comments}/>
            </Grid>
        );

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName= {classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
            </Fragment>
        );
    };
};

RecipeDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getRecipe: PropTypes.func.isRequired,
    recipeId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    recipe: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    recipe: state.data.recipe,
    UI: state.UI
});

const mapActionsToProps = {
    getRecipe, clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(RecipeDialog));
