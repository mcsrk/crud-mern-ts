import { useState } from 'react';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Result, Row, Space, Table } from 'antd';

// Constants
import cart_table_cols from '../../../constants/cart-table';

// Components
import TableTitle from '../../common/TableTitle';

// Zustand Storage
import { useShoppingCartStore } from '../../../store/shoppingCartStore';

// Utils
import { openNotification } from '../../../utils/utils';
import { createOrder } from '../../../services/ordersSerivce';
import { getUserData } from '../../../services/userService';

const Cart = () => {
    /** Global state */

    // Methods
    const { removeProductFromCart, cleanCart } = useShoppingCartStore();

    // Variables
    const { cart, total } = useShoppingCartStore();

    const userData = getUserData();

    const [createLoading, setCreateLoading] = useState(false);

    const removeItemFromCart = (id) => {
        removeProductFromCart(id);
        openNotification('info', `Producto eliminado de tu carrito!`);
    };

    const handleDeleteAll = (showNotification = false) => {
        cleanCart();
        if (showNotification) openNotification('info', `Productos eliminados`);
    };

    const handleCreateOrder = async (_cart, _user) => {
        setCreateLoading(true);
        try {
            const products = _cart?.map(({ id, price, interest, total }) => {
                return {
                    price,
                    interest,
                    id,
                    total
                };
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
                    <Card bordered={false} className="border-solid border border-gray-200 ml-auto shadow-sm" title={<div className="text-lg font-bold"> Resumen de tu orden</div>}>
                        <div className="text-right">
                            <p>
                                <span className="text-gray-700 font-semibold">Productos</span> : {cart.length}
                            </p>
                            <p>
                                <span className="text-gray-700 font-bold">Total : ${total}</span>
                            </p>

                            <Space>
                                <Button disabled={cart.length === 0} loading={createLoading} type="text" danger onClick={() => handleDeleteAll(true)}>
                                    Borrar carrito
                                </Button>
                                <Button disabled={cart.length === 0} loading={createLoading} type="primary" onClick={() => handleCreateOrder(cart, userData)}>
                                    Ordenar
                                </Button>
                            </Space>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Cart;
