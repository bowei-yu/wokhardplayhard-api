import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteRecipe from './DeleteRecipe';
import RecipeDialog from './RecipeDialog';
import EditRecipe from './EditRecipe';
import LikeButton from './LikeButton';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// icons
import ChatIcon from '@material-ui/icons/Chat';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

// redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        padding: 25,
        width: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: 100
    },
    content: {
        padding: 20,
        objectFit: 'cover'
    }
};

class Recipe extends Component {

    render() {
        dayjs.extend(relativeTime);
        // same as const classes = this.props.classes
        const { classes, 
                recipe: {difficultyRating, title, body, cookTime, createdAt, userImage, userHandle, recipeId, likeCount, commentCount}, 
                user: { authenticated, credentials: { handle }} 
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteRecipe recipeId={recipeId}/>
        ) : null;

        const editButton = authenticated && userHandle === handle ? (
            <EditRecipe recipe={this.props.recipe} />
        ) : null;

        return (
            <Card className={classes.card}>
                <Grid item sm={2}>
                    <img src={userImage} alt="Profile" className={classes.image}/>
                </Grid>
               < CardContent className ={classes.content}>
                    <Typography variants="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    {deleteButton}
                    {editButton}
                    <Typography variant="body2" color="textSecondary"> 
                    {dayjs(createdAt).fromNow()} </Typography>
                    <Typography variant="body1" style={{whiteSpace: 'pre-line'}}>
                        {title}
                    </Typography>
                    <Typography variant="body2" style={{whiteSpace: 'pre-line'}}>
                        { cookTime === undefined || cookTime === "" ? body.split('\n')[0] : "Estimated cooking time: " + cookTime} 
                    </Typography>
                    <LikeButton recipeId={recipeId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <MyButton tip="Difficulty">
                        <LocalDiningIcon color="primary"/>
                    </MyButton>
                    <span>Difficulty Level: {Math.ceil(difficultyRating)}</span>
                    <RecipeDialog recipeId={recipeId} userHandle={userHandle} openDialog={this.props.openDialog} />
               </CardContent>
            </Card>
        );
    };
};

Recipe.propTypes = {
    user: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Recipe));
