import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import DeleteComment from './DeleteComment';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadThis,
    commentImage: {
        width: 100,
        height: 100,
        objectFit: 'cover',
        borderRadius: 50,
        marginLeft: 30
    },
    commentData: {
        marginLeft: 50
    }
});

class Comments extends Component {

    render() {
        const { comments, classes, user: { authenticated, credentials: { handle }} } = this.props;
        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle, recipeId, commentId} = comment;
                    const deleteButton = authenticated && userHandle === handle ? (
                        <DeleteComment recipeId={recipeId} commentId={commentId}/>
                    ) : null;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" 
                                        className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/>
                                            <Typography variant="body1">{body}</Typography>
                                            {deleteButton}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator}/>
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    };
};

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Comments));