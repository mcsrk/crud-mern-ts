import { useEffect } from 'react';
import loadable from '@loadable/component';
import { Route, Routes, useNavigate } from 'react-router-dom';

/** Utils */
import { getToken } from '../services/userService';

/** Components */
const Products = loadable(() => import('../components/content/product/Products'));
const Orders = loadable(() => import('./Orders'));
const Cart = loadable(() => import('../components/content/cart/Cart'));
const NotFound = loadable(() => import('./NotFound'));

const Main = () => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        // When open the base url in a new tab, rigth after login, redirects to companies.
        if (token) navigate('/products', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/orders/*" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Main;
