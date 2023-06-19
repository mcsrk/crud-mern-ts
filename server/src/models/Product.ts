import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
    id: number;
    price: number;
    interest: number;
    total: number;
}

export interface IProductModel extends IProduct, Document {
    id: number;
}

const ProductSchema: Schema = new Schema(
    {
        id: { type: Number, required: true, index: true, unique: true },
        price: { type: Number, required: true },
        interest: { type: Number, required: true },
        total: { type: Number, required: true }
    },
    { versionKey: false }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);
