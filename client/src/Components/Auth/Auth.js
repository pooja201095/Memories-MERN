import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.js";

import {
  Avatar,
  Typography,
  Button,
  Paper,
  Grid,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import Input from "./Input.js";
import { signIn,signUp } from "../../actions/auth.js";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormState = {
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignUp) {
      dispatch(signUp(formData,navigate));
    } else {
      dispatch(signIn(formData,navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const handleShowPassword = () => {
    setShowPass((prevsetPass) => !prevsetPass);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPass(false);
  };

  const googleSuccess=async (res)=>{
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        dispatch({type:'AUTH', payload: {result,token}});
        navigate('/');
      } catch (error) {
        console.log(error);
      }

  }

  const googleFailure=()=>{
      console.log("Google Sign In was unsuccessfull. Please try again later.")
}

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPass ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId='974361816279-vi2pi6mjaeul6sr7cttdu2ncg780tnh2.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='primary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'>
                    Google Sign In
                </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            ></GoogleLogin>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already Signed up? Sign In."
                  : "Don't have a account? Sign Up!"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
