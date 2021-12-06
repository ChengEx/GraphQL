import React,{ useState, useEffect } from 'react'
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './NavbarStyle.js';
import chat from '../images/chat.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //here's user have two possible : login and register
    console.log("user2",user);
    // const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    //const user = null;

    const logout = () =>{
        // dispatch({ type: actionType.LOGOUT });
        history('/login');
        // setUser(null);
        localStorage.clear();
        setUser(null);
    };

    useEffect(()=>{
        const tokenByLogin = user?.login?.token;
        const tokenByRegister = user?.register?.register;
        if (tokenByLogin && !tokenByRegister) {
          const decodedToken = decode(tokenByLogin);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }else if (! tokenByLogin && tokenByRegister){
          const decodedToken = decode(tokenByRegister);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
     
      
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
          <img className={classes.image} src={chat} alt="icon" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>   


        {(() => {
          if (user?.login && !user?.register) {
            return (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.login.name} src={user?.login.imageUrl}>{user?.login.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.login.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            )
          } else if (!user?.login && user?.register) {
            return (
              <div className={classes.profile}>
                <Avatar className={classes.purple} alt={user?.register.name} src={user?.register.imageUrl}>{user?.register.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.register.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
              </div>
            )
          } else {
            return (
              <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
            )
          }
        })()}       
          {/* {user?.login ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.login.name} src={user?.login.imageUrl}>{user?.login.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.login.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
          )} */}
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;
