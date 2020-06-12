import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';


// MUI Stuff
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = {
    card: {
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
}

class Recipe extends Component {
    render() {
        // same as const classes = this.props.classes
        const { classes, recipe: {body, createdAt, userImage, userHandle, recipeId, likeCount, commentCount} } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
               < CardContent class ={classes.content}>
                    <Typography variants="h5" component={Link} to={`/users/${userHandle}`} color="primary"> {userHandle} </Typography>
                    <Typography variant="body" color="textSecondary"> {createdAt} </Typography>
                    <Typography variant="body1">{body} </Typography>
               </CardContent>
            </Card>
        );
    };
};

export default withStyles(styles) (Recipe);
