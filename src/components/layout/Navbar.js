import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostRecipe from '../recipe/PostRecipe';
import Notifications from './Notifications';

// MUI STUFF
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// icons
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import TimerIcon from '@material-ui/icons/Timer';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Navbar extends Component {

    render() {

        const { authenticated } = this.props;

        return (
           <AppBar>
               <Toolbar className="nav-container">
                   {authenticated 
                    ? (<Fragment>
                        <PostRecipe/>
                        <Link to="/recent">
                            <MyButton tip="Recent Posts">
                                <TimerIcon/>
                            </MyButton>
                        </Link>
                        <Link to="/">
                            <MyButton tip="What's Popular?">
                                <HomeIcon/>
                            </MyButton>
                        </Link>
                        <Link to="/favorites">
                            <MyButton tip="Your Favorites">
                                <FavoriteBorderIcon/>
                            </MyButton>
                        </Link>
                        <Notifications/>
                        <Link to="/search">
                            <MyButton tip="Search">
                                <SearchIcon/>
                            </MyButton>
                        </Link>
                    </Fragment>)
                    : (
                    <Fragment>
                        <Button color ="inherit" component={Link} to="/signup"> Signup </Button>
                        <Button color ="inherit" component={Link} to="/"> Home </Button>
                        <Button color = "inherit" component={Link} to="/search"> Search </Button>
                        <Button color ="inherit" component={Link} to="/login"> Login </Button>
                    </Fragment>)
                    }
               </Toolbar>
           </AppBar>
        );
    };
};

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
