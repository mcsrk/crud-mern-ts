import jwt_decode from 'jwt-decode';

import { createRequest, throwErrors } from './globalService';

export const createUser = async (newuserBody) => {
    try {
        const response = await createRequest().post(`/register`, newuserBody);
        return response.data;
    } catch (e) {
        return throwErrors(e);
    }
};

export const loginUser = async (username, password, navigate) => {
    try {
        const response = await createRequest().post(
            `/login`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + btoa(username + ':' + password)
                }
            }
        );
        const token = response.data;

        localStorage.setItem('token', token);

        // decode user info such id, username and is_admin from backend generated jwtoken
        const userData = jwt_decode(token);
        console.log(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        navigate('/orders', { replace: true });
        window.location.reload();
    } catch (e) {
        return throwErrors(e);
    }
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('user'));
};

export const logOutUser = (navigate) => {
    navigate('/', { replace: true });
    window.location.reload();
    localStorage.clear();
};
