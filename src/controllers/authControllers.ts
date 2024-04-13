import { Request, Response } from "express";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersModel');


// hnadle errors
const handleErrors = (err: any) => {
    console.log(err.message, err.code);
    let errors: any = { email: '', password: ''};

    // incorrect email
    if (err.message == 'Incorrect Email'){
        errors.email = 'The email is not registered!'
    }

    // incorrect email
    if (err.message == 'Incorrect Password'){
        errors.password = 'The email is wrong!'
    }

    // duplicate error code
    if (err.code === 11000){
        errors.email = "The Email you entered Already in use!";
        return errors;
    }

    // validation errors
    if (err.message.includes('user validaion failed!')){
        Object.values(err.errors).forEach(({properties}: any) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// create jwt Token
const maxAge = 3 *  24 * 60 * 60;
const createToken = (id: string) => {
    return jwt.sign({id}, 'node auth app', {
        expiresIn: maxAge
    })
}


const getSignup = (req: Request, res: Response) => {
    res.send('SignUp');
}

const getLogin = (req: Request, res: Response) => {
    res.send('Login');
}

const postSignup = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt();
        const hashPwd = await bcrypt.hash(password, salt);

        const user = await User.create({ 
            email, password: hashPwd
            });
        
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({user: user._id});
    } catch (err){
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

const postLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare provided password with stored hashed password
        const authPWD = await bcrypt.compare(password, user.password);
        
        // If passwords match, generate JWT and set cookie
        if (authPWD){
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            return res.status(201).json({user: user._id});
        }

        // If passwords don't match, return error
        res.status(400).json({ error: "Wrong credentials" });

    } catch(err){
        console.error("Error occurred during login:", err);
        return res.status(400).json({});
    }
};

const getLogout = async (req: Request, res: Response) => {
    await res.cookie('jwt', '', { maxAge: 1 });
    await res.redirect('/');
};


module.exports = {
    getLogin, getSignup, postLogin, postSignup
}