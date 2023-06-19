import { NextFunction, Request, Response } from 'express';

import jwt, { VerifyErrors } from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthenticatedRequest extends Request {
    decoded?: any;
}

export const validateAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const excludedRoutes = ['/']; // Array of routes that don't require authentication

    if (excludedRoutes.includes(req.path)) {
        return next(); // Skip authentication for excluded routes
    }

    let token = req.headers['authorization']?.split(' ')[1] as string;
    try {
        jwt.verify(token, config.jwt.secret, (err: VerifyErrors | null, decoded: any) => {
            if (err || !token) {
                return res.status(401).send({ message: 'No token provided' });
            }
            req.decoded = decoded;

            next();
        });
    } catch (err) {
        return res.status(401).send({ message: 'Authentication error', err });
    }
};
