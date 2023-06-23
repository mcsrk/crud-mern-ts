import loadable from '@loadable/component';
import { Route, Routes } from 'react-router-dom';

const OrdersTable = loadable(() => import('../components/content/orders/OrdersTable'));
const OrderDetails = loadable(() => import('../components/content/orders/OrderDetails'));

const Orders = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<OrdersTable />} />
                <Route path=":order_id" element={<OrderDetails />} />
            </Routes>
        </>
    );
};

export default Orders;
