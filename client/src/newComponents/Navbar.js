import React,{ useContext } from 'react'
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useStyles from './NavbarStyle.js';
import chat from '../images/chat.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../context/auth.js';

const Navbar = () => {
    const classes = useStyles();
    const { user, logout } = useContext(AuthContext);   
    console.log("user2",user);

    const history = useNavigate();
    const location = useLocation();
    return ( 
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={chat} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>   


        {(() => {
          if (user) {
            return (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.name} src={user?.imageUrl}>{user?.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            )
          }else {
            return (
              <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
            )
          }
        })()}
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;
