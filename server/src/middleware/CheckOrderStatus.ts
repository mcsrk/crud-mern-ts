import { NextFunction, Request, Response } from 'express';

// Models
import Order from '../models/Order';

export const CheckOrderStatus = (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    Order.findById(orderId)
        .then((order) => {
            if (order && order.status === 'COMPLETED') {
                return res.status(403).json({ message: 'Completed orders are not editable' });
            }
            next();
        })
        .catch((error) => res.status(500).json({ error }));
};
