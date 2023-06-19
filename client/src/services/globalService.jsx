import axios_core from 'axios';

// Config
import { API_ENDPOINT, PRORUCTS_URL } from '../config/config.jsx';

const createHeaders = () => {
    const bearerToken = `Bearer ${localStorage.getItem('token')}`;
    return { Authorization: bearerToken, 'Content-Type': 'application/json' };
};

export const createRequest = () => {
    return axios_core.create({ baseURL: API_ENDPOINT, headers: createHeaders() });
};

export const createProductsRequest = () => {
    return axios_core.create({ baseURL: PRORUCTS_URL });
};

export const throwErrors = (err) => {
    throw err;
};
