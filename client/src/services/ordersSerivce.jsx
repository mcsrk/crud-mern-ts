import { createRequest, throwErrors } from './globalService';

export const getOrders = async (userId) => {
    try {
        const response = await createRequest().get(`/users/${userId}/orders`);
        console.log({ response });
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const payOrder = async (orderId) => {
    try {
        const response = await createRequest().post(`/orders/${orderId}/complete`);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};
export const rateOrder = async (orderId, rate) => {
    try {
        const response = await createRequest().patch(`/orders/${orderId}/rate`, { rate });
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const createOrder = async (orderbody) => {
    try {
        const response = await createRequest().post(`/orders`, orderbody);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const deleteOrder = async (orderId) => {
    try {
        const response = await createRequest().delete(`/orders/${orderId}`);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};
