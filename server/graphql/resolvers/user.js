
import { AuthenticationError, UserInputError } from 'apollo-server';
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import User from '../../newModels/user.js';
import Auth from '../../middleware/auth.js';

const secret = 'test';

const validateLoginInput = (email, password) => {
    const errors = {};
    if(email.trim() === ''){
        errors.email = 'Email can not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password can not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const validateRegisterInput = (name, email, password) => {
    const errors = {};
    if(email.trim() === ''){
        errors.email = 'Email can not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password can not be empty';
    }
    if(name.trim() === ''){
        errors.name = 'Name can not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const userQuery = {
    Mutation: {
        async login(_,{ email, password }) {
            console.log("email1",email);
            console.log("password1", password);
            const { errors, valid } = validateLoginInput(email, password);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            const user = await User.findOne({email});
            //console.log("user", user);
            if(!user){
                throw new UserInputError('Not Founds',{
                    errors:{
                        general: 'Can not found User'
                    }
                });
            }
            const match = await bcrypt.compare(password, user.password);
            if(!match){
                throw new UserInputError('Errors',{
                    errors:{
                        general: 'Password not match'
                    }
                });
            }

            const token = jwt.sign( { email: user.email, id: user._id, name: user.name  }, secret, { expiresIn: "1h" } );
            //console.log("token", token);
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                token
            }
        },
        async register(_, {  registerInput : { name, email, password }}) {
            console.log("XXX", name, email, password);
            const { errors, valid } = validateRegisterInput(name, email, password);
            if(!valid) {
                throw new UserInputError('Errors',{errors});
            }
            const user = await User.findOne({email});
            if(user){
                throw new UserInputError('Email is taken',{
                    errors: {
                        name: 'This email is taken'
                    }
                });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                name: name,
                email: email,
                password: hashPassword
            })        
            const res = await newUser.save();
            const token = jwt.sign( { email: res.email, id: res._id, name: res.name  }, secret, { expiresIn: "1h" } );
            return {
                id: res._id,
                name: res.name,
                email: res.email,
                token
            };
        }
    }

};

export default userQuery;