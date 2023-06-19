import { createProductsRequest, createRequest, throwErrors } from './globalService';

export const getCategories = async () => {
    try {
        const response = await createProductsRequest().get(`/categories`);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const getProducts = async (category) => {
    const categoryQuery = category ? `category/${category}` : '';

    try {
        const response = await createProductsRequest().get(`/${categoryQuery}`, {
            params: {
                sort: 'desc'
            }
        });
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const addProductToOrder = async (orderId, productBody) => {
    try {
        const response = await createRequest().post(`/orders/${orderId}/products`, productBody);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const removeProductFromOrder = async (orderId, productId) => {
    try {
        const response = await createRequest().delete(`/orders/${orderId}/products/${productId}`);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};
