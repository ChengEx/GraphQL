import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../newComponents/textInput.js';
import useStyles from './L&Rstyle.js';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';;


const initialState = { email:'', password:''};

const Login = () => {
    const [ formData, setFormData ] = useState(initialState);
    const classes = useStyles();

    const handleSubmit = (e)=>{
        e.preventDefault();

       
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
                        <Input name="firstName"
                            label="First Name"
                            handleChange={handleChange}
                            autoFocus/>                    
                        <Input name="lastName"
                            label="Last Name"
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

export default Login;
