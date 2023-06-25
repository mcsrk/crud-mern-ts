import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';

// Custom modules
import Logging from '../library/Logging';

// Models
import { IUser } from '../models/User';
import { IOrder } from '../models/Order';
import { IProduct } from '../models/Product';

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
            total: Joi.number(),
            products: Joi.array()
                .items(
                    Joi.object({
                        id: Joi.number().required(),
                        title: Joi.string().required(),
                        description: Joi.string(),
                        image: Joi.string(),
                        category: Joi.string(),
                        price: Joi.number().required(),
                        interest: Joi.number().required(),
                        total: Joi.number().required()
                    })
                )
                .required()
        }),
        update: Joi.object<IOrder>({
            user: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
            status: Joi.string().valid('ACTIVE', 'COMPLETED'),
            rate: Joi.number().min(0).max(5),
            total: Joi.number(),
            products: Joi.array().items(
                Joi.object({
                    id: Joi.number().required(),
                    title: Joi.string(),
                    description: Joi.string(),
                    image: Joi.string(),
                    category: Joi.string(),
                    price: Joi.number(),
                    interest: Joi.number(),
                    total: Joi.number()
                })
            )
        }),
        rate: Joi.object<IOrder>({
            rate: Joi.number().min(0).max(5).required()
        })
    },
    user: {
        create: Joi.object<IUser>({
            username: Joi.string().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            username: Joi.string(),
            password: Joi.string()
        }).or('username', 'password')
    },
    product: {
        create: Joi.object<IProduct>({
            id: Joi.number().required(),
            title: Joi.string().required(),
            description: Joi.string(),
            image: Joi.string(),
            category: Joi.string(),
            price: Joi.number().required(),
            interest: Joi.number().required(),
            total: Joi.number().required()
        }),
        update: Joi.object<IProduct>({
            price: Joi.number(),
            title: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            category: Joi.string(),
            interest: Joi.number(),
            total: Joi.number()
        }).or('title', 'description', 'image', 'category', 'price', 'interest', 'total')
    }
};
