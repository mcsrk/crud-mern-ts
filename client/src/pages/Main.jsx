import { useEffect } from 'react';
import loadable from '@loadable/component';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
// Utils
import { getToken } from '../services/userService';

// Componets
const Products = loadable(() => import('../components/content/product/Products'));
const OrdersTable = loadable(() => import('../components/content/orders/OrdersTable'));
const Cart = loadable(() => import('../components/content/cart/Cart'));
const NotFound = loadable(() => import('../components/content/notFound/NotFound'));

// Constants
const { Content } = Layout;

const Main = ({ colorBgContainer }) => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        // When open the base url in a new tab, rigth after login, redirects to companies.
        if (token) navigate('/products', { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <Content className="px-6 py-6 sm:px-12 ">
            <div
                className="min-h-screen p-4 sm:p-6 "
                style={{
                    background: colorBgContainer
                }}
            >
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* <Route path="/orders/:company_nit/products" element={<Inventory />} /> */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Content>
    );
};

Main.propTypes = {
    colorBgContainer: PropTypes.string
};

export default Main;
