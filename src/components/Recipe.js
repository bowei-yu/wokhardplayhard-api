import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteRecipe from './DeleteRecipe';
import RecipeDialog from './RecipeDialog';
import LikeButton from './LikeButton';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// icons
import ChatIcon from '@material-ui/icons/Chat';

// redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Recipe extends Component {

    render() {
        dayjs.extend(relativeTime);
        // same as const classes = this.props.classes
        const { classes, 
                recipe: {body, createdAt, userImage, userHandle, recipeId, likeCount, commentCount}, 
                user: { authenticated, credentials: { handle }} 
        } = this.props;

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteRecipe recipeId={recipeId}/>
        ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
               < CardContent className ={classes.content}>
                    <Typography variants="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary"> 
                    {dayjs(createdAt).fromNow()} </Typography>
                    <Typography variant="body1">{body} </Typography>
                    <LikeButton recipeId={recipeId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="Comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                    <RecipeDialog recipeId={recipeId} userHandle={userHandle}/>
               </CardContent>
            </Card>
        );
    };
};

Recipe.propTypes = {
    user: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Recipe));
