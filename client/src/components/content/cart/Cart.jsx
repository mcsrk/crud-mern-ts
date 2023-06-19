import { useState, useEffect } from 'react';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Result, Row, Space, Table } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

// Constants
import cart_table_cols from '../../../constants/cart-table';

// Components
import TableTitle from '../../common/TableTitle';

// Redux
import { remove } from '../../../redux/slices/cartSlice';

// Utils
import { openNotification } from '../../../utils/utils';
import { createOrder } from '../../../services/ordersSerivce';
import { getUserData } from '../../../services/userService';

const Cart = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const { cart } = useSelector((state) => state);
    const userData = getUserData();
    const dispatch = useDispatch();
    const [createLoading, setCreateLoading] = useState(false);

    const removeItemFromCart = (id) => {
        dispatch(remove(id));
        openNotification('info', `Productoeliminado de tu carrito!`);
    };

    const handleDeleteAll = (showNotification = false) => {
        cart.forEach((product) => {
            dispatch(remove(product.id));
        });
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

            openNotification('success', `Orden ${res?.order._id} creada!`);
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

    useEffect(() => {
        setTotalAmount(parseFloat(cart.reduce((acc, curr) => acc + curr.total, 0)).toFixed(2));
    }, [cart]);

    return (
        <>
            <TableTitle
                content={{
                    title: 'Tu Carrito',
                    icon: <ShoppingCartOutlined />
                }}
            />
            {cart.length > 0 ? (
                <>
                    <Row gutter={[16, 16]} justify="space-between" className="min-h-[80vh] mt-8 mx-auto">
                        <Col xs={24} md={16}>
                            <Table bordered columns={cart_table_cols} dataSource={cart} pagination={false} />
                        </Col>
                        <Col xs={24} md={8} className="justify-center px-8">
                            <Card className="ml-auto" title="Resumen de tu carrtio">
                                <div className="text-right">
                                    <p>
                                        <span className="text-gray-700 font-semibold">Total Items</span> : {cart.length}
                                    </p>
                                    <p>
                                        <span className="text-gray-700 font-bold">Total Amount : ${totalAmount}</span>
                                    </p>

                                    <Space>
                                        <Button loading={createLoading} type="text" danger onClick={() => handleDeleteAll(true)}>
                                            Borrar carrito
                                        </Button>
                                        <Button loading={createLoading} type="primary" onClick={() => handleCreateOrder(cart, userData)}>
                                            Ordenar
                                        </Button>
                                    </Space>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <Result status="403" title="Carrito vacío!" subTitle="No has añadido productos todavía." />
            )}
        </>
    );
};

export default Cart;
