import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from 'jwt-decode';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import {Link} from 'react-router-dom';
import memories from "../../images/memories.png";
import useStyles from "./styles.js";

const Navbar = ()=> {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] =  useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(()=>{
      const token = user?.token;

      // JWT
      if(token) {
        console.log('expire');
        const decodedToken = decode(token);
        if(decodedToken * 1000 < new Date().getTime()) logout();
      }

      setUser(JSON.parse(localStorage.getItem('profile')))

    },[location])

    const logout = () => {
      dispatch({type: 'LOGOUT'});
      navigate('/');
      setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'></img>
          </div>
          <Toolbar className={classes.toolbar}>
              {user ? (
                  <div className={classes.profile}>
                      <Avatar className={classes.purple} alt={user?.result?.givenName || user?.result?.name} src={user?.result?.imageUrl}>{user?.result?.givenName?.charAt(0) || user?.result?.name.charAt(0)}</Avatar>
                      <Typography className={classes.userName} variant="h6">{user?.result?.givenName || user?.result?.name}</Typography>
                      <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                  </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
              )}
          </Toolbar>
      </AppBar>
    )
}

export default Navbar