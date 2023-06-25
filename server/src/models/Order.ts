import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './Product';

export interface IOrder {
    user: string;
    status: 'ACTIVE' | 'COMPLETED';
    rate: number;
    total: number;
    products: IProduct[];
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        status: { type: String, enum: ['ACTIVE', 'COMPLETED'], default: 'ACTIVE', required: true },
        rate: { type: Number, min: 0, max: 5, default: 0, required: true },
        total: { type: Number, required: true },
        products: [
            {
                id: { type: Number, required: true },
                title: { type: String, required: true },
                description: { type: String },
                image: { type: String },
                category: { type: String },
                price: { type: Number, required: true },
                interest: { type: Number, required: true },
                total: { type: Number, required: true }
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default mongoose.model<IOrderModel>('Order', OrderSchema);
