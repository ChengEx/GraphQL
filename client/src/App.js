import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Navbar from './newComponents/Navbar.js';

//import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { Container } from 'semantic-ui-react';

const App=()=>{
    
    return (
        <BrowserRouter>
            <Container maxidth="lg">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/login" exact element={<Login/>} />
                    <Route path="/register" exact element={<Register/>} />
                </Routes>
            </Container>
        </BrowserRouter>
        
    )
}

export default App;