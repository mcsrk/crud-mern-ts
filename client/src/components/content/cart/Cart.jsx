import { useState } from 'react';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Col, Result, Row, Table } from 'antd';

// Constants
import cart_table_cols from '../../../constants/cart-table';

// Components
import TableTitle from '../../common/TableTitle';
import OrderSummary from '../../common/OrderSummary';

// Zustand Storage
import { useBoundStore } from '../../../store/useBoundStore';

// Utils
import { openNotification } from '../../../utils/utils';
import { createOrder } from '../../../services/ordersSerivce';
import { getUserData } from '../../../services/userService';

const Cart = () => {
    /** Global state */

    // Methods
    const { removeProductFromCart, cleanCart } = useBoundStore();

    // Variables
    const { cart, cartTotal } = useBoundStore();

    const userData = getUserData();

    const [createLoading, setCreateLoading] = useState(false);

    const removeItemFromCart = (id) => {
        removeProductFromCart(id);
        openNotification('info', `Producto eliminado de tu carrito!`);
    };

    const handleDeleteAll = (showNotification = false) => {
        try {
            cleanCart();
        } catch (error) {
            console.log('error limpiando carrito', error);
        }
        if (showNotification) openNotification('info', `Productos eliminados`);
    };

    const handleCreateOrder = async (_cart, _user) => {
        setCreateLoading(true);
        try {
            // Send the products to db ommiting "rating" and "key" fields
            // eslint-disable-next-line no-unused-vars
            const products = _cart?.map(({ rating, key, ...rest }) => {
                return rest;
            });

            const orderBody = { user: _user.id, products };

            const res = await createOrder(orderBody);

            handleDeleteAll();

            openNotification('success', `Orden creada!`, `Número de orden: ${res?.order._id}`);
        } catch (e) {
            console.log('[Cart] - Error creando orden');
            openNotification('error', 'Error creando orden.', e.response.data.message);
        } finally {
            setCreateLoading(false);
        }
    };

    /** Pushing here the new column because of the handleGetOrder context */
    if (!cart_table_cols.find((col) => col.key === 'action')) {
        cart_table_cols.push({
            title: 'Acción',
            key: 'action',
            width: '5%',
            render: (_, record) => (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItemFromCart(record.id);
                    }}
                    danger
                    type="text"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    size="small"
                />
            )
        });
    }

    return (
        <>
            <TableTitle
                content={{
                    title: 'Tu Carrito',
                    icon: <ShoppingCartOutlined />
                }}
            />

            <Row gutter={[16, 16]} justify="space-between" className="min-h-[80vh] mt-8 mx-auto">
                <Col xs={24} md={16}>
                    {cart.length > 0 ? (
                        <Table bordered columns={cart_table_cols} dataSource={cart} pagination={false} />
                    ) : (
                        <Result className="border-solid border border-gray-200 rounded-lg" status="403" title="Carrito vacío!" subTitle="No has añadido productos todavía." />
                    )}
                </Col>
                <Col xs={24} md={8} className="justify-center px-8">
                    <OrderSummary
                        order={{ products: cart, total: cartTotal }}
                        actions={{
                            loading: createLoading,
                            primary: { name: 'Ordenar', callback: () => handleCreateOrder(cart, userData) },
                            secondary: { name: 'Borrar carrito', callback: handleDeleteAll }
                        }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Cart;
