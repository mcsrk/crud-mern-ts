import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Config
import { config } from '../config/config';

// Models
import User from '../models/User';
import Order from '../models/Order';

const createUser = (req: Request, res: Response) => {
    const { username, password } = req.body;

    /** Check if the username already exists*/
    User.findOne({ username })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(409).json({ message: 'Username alredy taken' });
            }
            /** Decode only username to store it in plan text.
             * Then encrypt the alredy encoded password to store it. */

            const decodedUsername = Buffer.from(username, 'base64').toString('utf-8');
            const hash = bcrypt.hashSync(password, config.auth.salt_rounds);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: decodedUsername,
                password: hash
            });

            return user
                .save()
                .then(() => res.status(201).json({ message: 'User created successfully' }))
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

const login = async (req: Request, res: Response) => {
    try {
        /** Get, decoded headers credentials and split them */
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Credentials not found' });
        }

        const credentialsToken = req.headers.authorization.split(' ')[1];
        const [username, password] = Buffer.from(credentialsToken, 'base64').toString().split(':');

        /** Check if the user exists*/
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        /** Encode the password only to compare it with the password stored in db*/

        const encodedPassword = Buffer.from(password).toString('base64');
        const isValidPassword = await bcrypt.compare(encodedPassword, user.password);

        if (!isValidPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        /** Generate a JWT token for the authenticated user */
        const token = jwt.sign({ id: user._id, username: user.username }, config.jwt.secret, {
            expiresIn: '30d'
        });

        if (!token) {
            return res.status(403).send({ message: 'Invalid authentication' });
        } else {
            res.cookie('token', token, {
                httpOnly: true /*,
                secure: true,
                signed: true,
                maxAge: 100000*/
            });
            return res.status(200).send(token);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const readUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return User.find()
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                user.set(req.body);

                return user
                    .save()
                    .then(() => res.status(200).json({ message: 'User updated successfully' }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .then((user) => (user ? res.status(204).json() : res.status(404).json({ message: 'User not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const getOrdersByUser = (req: Request, res: Response) => {
    const userId = req.params.userId;
    console.log({ userId });
    return Order.find({ user: userId })
        .then((orders) => {
            return res.status(200).json({ orders });
        })
        .catch((error) => res.status(500).json({ error }));
};

export default { createUser, readUser, getOrdersByUser, readAll, updateUser, deleteUser, login };
