const jwt = require('jsonwebtoken');
import { Request, Response } from "express";

const authMiddleware = (req: Request | any, res: Response, next: () => void) => {
    const token = req.cookie.jwt;

    // Checks if json token exists &and Verified!
    if (token){
        jwt.verify(token, 'node auth app', (err: Error, decodedToken: any) => {
            if (err){
                console.log(err.message);
                res.redirect('/login')
            }

            console.log(decodedToken);
            next();
        })
    };

    res.redirect('/login')
};

module.exports = authMiddleware;