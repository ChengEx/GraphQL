import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import useStyles from './L&Rstyle.js';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../newComponents/textInput.js';
import { signin } from '../actions/auth.js';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;


const initialState = { email:'', password:''};

const Login = () => {
    const [ formData, setFormData ] = useState(initialState);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useNavigate();

    const [ login, { loading, error, data } ] = useMutation(LOGIN_USER,{
        update(_, result){
            console.log("result",result);
            dispatch(signin(result, history));
        },
        variables: {
            email: formData.email,
            password: formData.password
        }
    });
    if(data) {
        console.log(data);
    } 
    if(error) {
        console.log(error);
        return "error"; // blocks rendering
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        try {
            login();
        }catch(err) {
            console.log("Error", err);
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
                <Typography variant="h5">Sign In</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="email"
                            label="Email"
                            value={formData.email}
                            handleChange={handleChange}
                            autoFocus/>                    
                        <Input name="password"
                            label="Password"
                            value={formData.password}
                            handleChange={handleChange}/>    
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button component={Link} to="/register">
                                Don't have an account? Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email:$email, password:$password) {
            id
            name
            email
            token
        }
    }
`

export default Login;
