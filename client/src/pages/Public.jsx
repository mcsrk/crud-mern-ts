import loadable from '@loadable/component';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

/** Components */
const Products = loadable(() => import('../components/content/product/Products'));
const Login = loadable(() => import('../pages/Login'));
const Signup = loadable(() => import('../pages/Signup'));
const NotFound = loadable(() => import('./NotFound'));

const Public = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // When open the base url in a new tab, rigth after login, redirects to companies.
        navigate('/', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/" element={<Products />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

Public.propTypes = {
    colorBgContainer: PropTypes.string
};

export default Public;
