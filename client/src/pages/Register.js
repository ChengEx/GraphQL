import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import Input from '../newComponents/textInput.js';
import useStyles from './L&Rstyle.js';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;


const initialState = { firstName:'',lastName:'',email:'', password:'', confirmPassword:'' };

const Register = () => {
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formData, setFormData ] = useState(initialState);
    const classes = useStyles();

    

    const [ register, { loading, error, data } ] = useMutation(REGISTER_USER,{
        update(_, result){
            console.log(result);
        },
        onError(err) {
            alert(err);
        },
        variables: {
            name: formData.firstName,
            email: formData.email,
            password: formData.password
        }
    });


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("formData", formData);
        register();
    }

    const handleChange = (e)=>{
        setFormData({ ...formData, [e.target.name]:e.target.value });
    }

    const handleShowPassword = ()=>setShowPassword(!showPassword)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">Sign Up</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input name="firstName"
                            label="First Name"
                            handleChange={handleChange}
                            autoFocus
                            half
                            required/>                    
                        <Input name="lastName"
                            label="Last Name"
                            handleChange={handleChange}
                            half
                            required/>
                        <Input name="email" 
                            label="Email Address" 
                            handleChange={handleChange} 
                            type="email" 
                            required/>
                        <Input name="password" 
                            label="Password" 
                            handleChange={handleChange} 
                            type={showPassword?"text":"password"} 
                            handleShowPassword={handleShowPassword}
                            required/>
                        <Input 
                            name="confirmPassword" 
                            label="Repeat Password" 
                            handleChange={handleChange} 
                            type="password"
                            required/>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        Sign Up
                    </Button>
                    
                </form>
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
