import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import useStyles from './style';
import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { signin, signup } from '../../actions/auth';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;

const initialState = { firstName:'',lastName:'',email:'', password:'', confirmPassword:''};

const SignUp = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSignup, setIsSignup ] = useState(false);
    const [ formData, setFormData ] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const handleShowPassword = ()=>setShowPassword(!showPassword)

    
    const switchMode = ()=>{
        setFormData(initialState);
        setIsSignup((prevIsSignUp)=> !prevIsSignUp);
        setShowPassword(false);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }

    const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value });
    }

    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>           
                                    <Input name="firstName"
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half/>
                                
                                    <Input name="lastName"
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half/>   
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}              
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup? 'Sign Up':'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup? 'Already hava an account? Sign In':"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default SignUp;
