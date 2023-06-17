import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IOrder } from '../models/Order';
import { IUser } from '../models/User';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    order: {
        create: Joi.object<IOrder>({
            user: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
            status: Joi.string().valid('ACTIVE', 'COMPLETED'),
            rate: Joi.number().min(0).max(5),
            products: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().required(),
                        price: Joi.number().required()
                    })
                )
                .required()
        }),
        update: Joi.object<IOrder>({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            status: Joi.string().valid('ACTIVE', 'COMPLETED'),
            rate: Joi.number().min(0).max(5),
            products: Joi.array().items(
                Joi.object({
                    id: Joi.number().required(),
                    price: Joi.number().required()
                })
            )
        })
    },
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }),
        update: Joi.object<IUser>({
            username: Joi.string(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
        }).or('username', 'password')
    }
};
