import React, { useState, useContext } from 'react'

import { AuthContext } from '../context/auth.js';
import { useForm } from '../util/hooks.js';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Input from '../newComponents/textInput.js';
import useStyles from './L&Rstyle.js';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;


function Register(){
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [ showPassword, setShowPassword ] = useState(false);
    const classes = useStyles();
    const history = useNavigate();
    
    const { onChange, onSubmit, values } = useForm(registerUser, {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [ register, { loading } ] = useMutation(REGISTER_USER,{
        update(_, {data: { register: userData }}){
            console.log("registerData structure",userData);
            context.login(userData);
            // props.history.push('/');

            history('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            name: values.firstName+" "+values.lastName,
            email: values.email,
            password: values.password
        }
    });

    function registerUser() {
        register();
    }

    const handleShowPassword = ()=>setShowPassword(!showPassword)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign Up</Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName"
                            label="First Name"
                            onChange={onChange}
                            value={values.firstName}
                            autoFocus
                            half
                            required/>                    
                        <Input name="lastName"
                            label="Last Name"
                            onChange={onChange}
                            value={values.lastName}
                            half
                            required/>
                        <Input name="email" 
                            label="Email Address" 
                            onChange={onChange} 
                            value={values.email}
                            type="email" 
                            required/>
                        <Input name="password" 
                            label="Password" 
                            onChange={onChange} 
                            value={values.password}
                            type={showPassword?"text":"password"} 
                            handleShowPassword={handleShowPassword}
                            required/>
                        <Input 
                            name="confirmPassword" 
                            label="Repeat Password" 
                            onChange={onChange} 
                            value={values.confirmPassword}
                            type="password"
                            required/>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    
                </form>
                {/* {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                        <li key={value}>{value}</li>
                        ))}
                    </ul>
                    </div>
                )} */}
            </Paper>
        </Container>
    )
}

const REGISTER_USER = gql`
    mutation register($name: String, $email: String, $password: String){
        register(registerInput:{
            name:$name,
            email:$email,
            password:$password
        }){
            id
            name
            email
            token
        }
    }
`

export default Register
