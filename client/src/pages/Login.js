import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.js';
import { useForm } from '../util/hooks.js';
import { gql, useMutation } from '@apollo/client';
import useStyles from './L&Rstyle.js';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../newComponents/textInput.js';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;


function Login(props){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const classes = useStyles();

    const history = useNavigate();
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [ login, { loading } ] = useMutation(LOGIN_USER,{
        update(_, { data: { login: userData }} ){
            console.log("result look structure",userData);
            context.login(userData);
            history('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            email: values.email,
            password: values.password
        }
    });

    function loginUserCallback() {
        console.log("hihi");
        login();
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign In</Typography>
                <form onSubmit={onSubmit} className={classes.form} >
                    <Grid container spacing={2}>
                        <Input name="email"
                            label="Email"
                            type="text"
                            value={values.email}
                            onChange={onChange}
                            autoFocus/>                    
                        <Input name="password"
                            label="Password"
                            type="text"
                            value={values.password}
                            onChange={onChange}/>    
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
    mutation Login($email: String, $password: String){
        login(email:$email, password:$password) {
            id
            name
            email
            token
        }
    }
`

export default Login;
